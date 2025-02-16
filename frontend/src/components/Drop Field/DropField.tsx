/* ++++++++++ IMPORTS ++++++++++ */
import React, { useCallback, useState } from "react";

/* ++++++++++ DROPZONE ++++++++++ */
import { useDropzone } from "react-dropzone";

/* ++++++++++ PROFILES ++++++++++ */
import { useNavigate } from 'react-router-dom';

/* ++++++++++ AXIOS ++++++++++ */
import axios from 'axios';

/* ++++++++++ MATERIAL-UI ++++++++++ */
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";

/* ++++++++++ ONNX Runtime ++++++++++ */
import * as ort from "onnxruntime-web";

/* ++++++++++ UTILITIES ++++++++++ */
import { generateProfileId } from '../../utils/profileUtils';


const preprocessImage = async (image: File): Promise<Float32Array | null> => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const imgBitmap = await createImageBitmap(image);

  canvas.width = 384;  // Changed from 299
  canvas.height = 384; // Changed from 299

  // Draw image with aspect-ratio preserved
  ctx?.drawImage(imgBitmap, 0, 0, 384, 384);

  // Get pixel data
  const imageData = ctx?.getImageData(0, 0, 384, 384);
  if (!imageData) return null;

  const { data } = imageData; // RGBA array (384x384x4)
  const totalPixels = 384 * 384;
  const inputTensor = new Float32Array(3 * totalPixels); // Channels-first

  // USE CORRECT NORMALIZATION (ImageNet stats)
  for (let i = 0; i < data.length; i += 4) {
    const pixelIndex = i / 4;

    // Normalize with ImageNet mean/std  
    //
    // Normalization needs to match what you used during training
    const r = (data[i] / 255.0 - 0.485) / 0.229;
    const g = (data[i + 1] / 255.0 - 0.456) / 0.224;
    const b = (data[i + 2] / 255.0 - 0.406) / 0.225;

    // CHANNELS-FIRST ORDER (matches EfficientNetV2)
    inputTensor[pixelIndex] = r;                // Red channel
    inputTensor[pixelIndex + totalPixels] = g;  // Green channel
    inputTensor[pixelIndex + 2 * totalPixels] = b; // Blue channel
  }

  return inputTensor;
};


const DropField: React.FC = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);

  const classNames = [
    "Abyssinian", "American Bobtail", "American Curl", "American Shorthair", "American Wirehair",
    "Applehead Siamese", "Balinese", "Bengal", "Birman", "Bombay", "British Shorthair",
    "Burmese", "Burmilla", "Calico", "Canadian Hairless", "Chartreux", "Chausie", "Chinchilla",
    "Cornish Rex", "Cymric", "Devon Rex", "Dilute Calico", "Dilute Tortoiseshell",
    "Domestic Long Hair", "Domestic Medium Hair", "Domestic Short Hair", "Egyptian Mau",
    "Exotic Shorthair", "Extra-Toes Cat - Hemingway Polydactyl", "Havana", "Himalayan",
    "Japanese Bobtail", "Javanese", "Korat", "LaPerm", "Maine Coon", "Manx", "Munchkin",
    "Nebelung", "Norwegian Forest Cat", "Ocicat", "Oriental Long Hair", "Oriental Short Hair",
    "Oriental Tabby", "Persian", "Pixiebob", "Ragamuffin", "Ragdoll", "Russian Blue",
    "Scottish Fold", "Selkirk Rex", "Siamese", "Siberian", "Silver", "Singapura", "Snowshoe",
    "Somali", "Sphynx", "Tabby", "Tiger", "Tonkinese", "Torbie", "Tortoiseshell",
    "Turkish Angora", "Turkish Van", "Tuxedo", "York Chocolate"
  ];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);

    const previewUrl = URL.createObjectURL(selectedFile);
    setPreview(previewUrl);

    // Clear previous prediction
    setPrediction(null);

  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    multiple: false,
  });

  const handleContinue = async () => {

    // If our file is NULL
    if (!file)
      return;

    setIsLoading(true);

    // Try deploying the model
    try {
      console.log("Starting preprocessing...");
      const inputTensor = await preprocessImage(file);

      if (!inputTensor)
        throw new Error("Failed to preprocess the image.");

      console.log("Preprocessed Tensor:", inputTensor);
      console.log("Loading ONNX model...");

      // Path to WASM files in the public/ directory
      ort.env.wasm.wasmPaths = "/";

      // Actually load the model with onnxruntime-web 
      const session = await ort.InferenceSession.create("/cat_breed_model.onnx");
      console.log("ONNX model loaded successfully.");

      // Input Tensor we will feed
      const feeds: Record<string, ort.Tensor> = {
        input: new ort.Tensor("float32", inputTensor, [1, 3, 384, 384]), // [batch, channels, height, width]
      };

      console.log("Running inference...");

      // Run our model with the defined tensor
      const results = await session.run(feeds);

      console.log("Inference Results:", results);

      const output = results[Object.keys(results)[0]];

      // Get our probabilities as a float32Array
      const probabilities = output.data as Float32Array;

      // Get the strongest confidence prediction by using Math.max
      const predictedIndex = probabilities.indexOf(Math.max(...probabilities));

      // Use the index to get the predicted breed
      const predictedBreed = classNames[predictedIndex];

      console.log("Predicted Breed:", predictedBreed);

      // Set prediction
      setPrediction(predictedBreed);

      // Fetch breed information
      const response = await axios.get(`https://api.api-ninjas.com/v1/cats?name=${predictedBreed}`, {
        headers: {
          'X-Api-Key': import.meta.env.VITE_API_NINJAS_KEY
        }
      });

      if (response.data && response.data.length > 0) {
        // Generate a unique ID
        const uniqueId = generateProfileId();

        const breedInfo = {
          ...response.data[0],
          name: predictedBreed,
          imageUrl: preview,
          id: uniqueId,
          timestamp: Date.now()
        };

        // Store in session storage with unique key
        const storageKey = `cat-profile-${uniqueId}`;
        sessionStorage.setItem(storageKey, JSON.stringify(breedInfo));

        // Navigate with the unique ID
        navigate(`/cat-profile/${uniqueId}`, {
          state: {
            breedInfo,
            fromUpload: true
          }
        });
      }
    }

    // Catch any errors and report an error if there is an error
    catch (error) {
      console.error("Error during prediction:", error);
      alert("An error occurred during the prediction.");
    }

    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[75%] max-w-[1000px] h-[33%]">
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-solid rounded-lg text-center cursor-pointer h-full
            ${isDragActive || "hover:border-primary hover:bg-primary-light"} 
            ${isDragActive ? "border-primary bg-primary-light" : "border-gray-300"}`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="space-y-4">
            <img src={preview} alt="Preview" className="max-h-48 mx-auto" />
            <p className="text-sm text-gray-500">Click or drag to change image</p>
          </div>
        ) : (
          <div className="space-y-2 h-full flex flex-col items-center text-center justify-center">
            <p className="text-lg">Drag and drop your pet image here</p>
            <p className="text-sm text-gray-500">or click to select a file</p>
          </div>
        )}
      </div>

      {file && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <TableContainer component={Paper} elevation={0}>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell component="th" sx={{ fontWeight: "bold", width: "30%" }}>
                    File Name
                  </TableCell>
                  <TableCell>{file.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" sx={{ fontWeight: "bold" }}>
                    Size
                  </TableCell>
                  <TableCell>{(file.size / 1024).toFixed(2)} KB</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" sx={{ fontWeight: "bold" }}>
                    Type
                  </TableCell>
                  <TableCell>{file.type}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <button
            onClick={handleContinue}
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md text-white
              ${isLoading
                ? "bg-primary cursor-not-allowed"
                : "bg-primary hover:bg-primary-light"
              } transition-colors`}
          >
            {isLoading ? "Processing..." : "Continue"}
          </button>

          {prediction && (
            <div className="mt-4 text-lg text-center">
              <p>Prediction: <strong>{prediction}</strong></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropField;

