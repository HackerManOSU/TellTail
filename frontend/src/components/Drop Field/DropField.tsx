/* ++++++++++ IMPORTS ++++++++++ */
import React, { useCallback, useState } from "react";

/* ++++++++++ DROPZONE ++++++++++ */
import { useDropzone } from "react-dropzone";

/* ++++++++++ MATERIAL-UI ++++++++++ */
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";

/* ++++++++++ ONNX Runtime ++++++++++ */
import * as ort from "onnxruntime-web";

// Utility for image preprocessing
const preprocessImage = async (image: File): Promise<Float32Array | null> => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const imgBitmap = await createImageBitmap(image);

  // Set canvas size to model input size
  canvas.width = 299;
  canvas.height = 299;
  ctx?.drawImage(imgBitmap, 0, 0, 299, 299);

  // Extract image data and normalize
  const imageData = ctx?.getImageData(0, 0, 299, 299);
  if (!imageData) return null;

  const { data } = imageData; // RGBA pixel data
  const inputTensor = new Float32Array(299 * 299 * 3); // Allocate memory for input tensor
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i] / 255.0; // Normalize R
    const g = data[i + 1] / 255.0; // Normalize G
    const b = data[i + 2] / 255.0; // Normalize B

    inputTensor[(i / 4) * 3] = (r - 0.5) / 0.5; // Subtract mean, divide by std
    inputTensor[(i / 4) * 3 + 1] = (g - 0.5) / 0.5;
    inputTensor[(i / 4) * 3 + 2] = (b - 0.5) / 0.5;
  }
  return inputTensor;
};

const DropField: React.FC = () => {
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
    "Somali", "Sphynx - Hairless Cat", "Tabby", "Tiger", "Tonkinese", "Torbie", "Tortoiseshell",
    "Turkish Angora", "Turkish Van", "Tuxedo", "York Chocolate"
  ];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);

    const previewUrl = URL.createObjectURL(selectedFile);
    setPreview(previewUrl);
    setPrediction(null); // Clear previous prediction
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    multiple: false,
  });

  const handleContinue = async () => {
    if (!file) return;

    setIsLoading(true);
    try {
      console.log("Starting preprocessing...");
      const inputTensor = await preprocessImage(file);
      if (!inputTensor) throw new Error("Failed to preprocess the image.");
      console.log("Preprocessed Tensor:", inputTensor);

      console.log("Loading ONNX model...");
      ort.env.wasm.wasmPaths = "/"; // Specify path to WASM files
      const session = await ort.InferenceSession.create("/cat_breed_model.onnx");
      console.log("ONNX model loaded successfully.");

      const feeds: Record<string, ort.Tensor> = {
        input: new ort.Tensor("float32", inputTensor, [1, 3, 299, 299]),
      };

      console.log("Running inference...");
      const results = await session.run(feeds);
      console.log("Inference Results:", results);

      const output = results[Object.keys(results)[0]];
      const probabilities = output.data as Float32Array;

      const predictedIndex = probabilities.indexOf(Math.max(...probabilities));
      const predictedBreed = classNames[predictedIndex];

      console.log("Predicted Breed:", predictedBreed);
      setPrediction(predictedBreed); // Set prediction
      alert(`Predicted Breed: ${predictedBreed}`);
    } catch (error) {
      console.error("Error during prediction:", error);
      alert("An error occurred during the prediction.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[75%] max-w-[1000px] h-[33%]">
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-solid rounded-lg text-center cursor-pointer h-full
            ${isDragActive || "hover:border-[#66b2b2] hover:bg-[#f0f9f9]"} 
            ${isDragActive ? "border-[#66b2b2] bg-[#f0f9f9]" : "border-gray-300"}`}
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
                ? "bg-[#b2d8d8] cursor-not-allowed"
                : "bg-[#66b2b2] hover:bg-[#539999]"
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

