/* ++++++++++ IMPORTS ++++++++++ */
import React, { useCallback, useState } from "react";

/* ++++++++++ DROPZONE ++++++++++ */
import { useDropzone } from "react-dropzone";

/* ++++++++++ PROFILES ++++++++++ */
import { useNavigate } from "react-router-dom";

/* ++++++++++ AXIOS ++++++++++ */
import axios from "axios";

/* ++++++++++ ONNX Runtime ++++++++++ */
import * as ort from "onnxruntime-web";

/* ++++++++++ UTILITIES ++++++++++ */
import { generateProfileId } from "../../utils/profileUtils";

// Utility for image preprocessing
const preprocessImage = async (image: File): Promise<Float32Array | null> => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const imgBitmap = await createImageBitmap(image);

  // Resize to 299x299 due to training with this resolution
  canvas.width = 299;
  canvas.height = 299;

  // Convert to bitmap to get true data around image
  ctx?.drawImage(imgBitmap, 0, 0, 299, 299);

  // Get ImageData and process
  const imageData = ctx?.getImageData(0, 0, 299, 299);
  if (!imageData) return null;

  const { data } = imageData;
  const totalPixels = 299 * 299;
  const inputTensor = new Float32Array(totalPixels * 3);

  for (let i = 0; i < data.length; i += 4) {
    const pixelIndex = i / 4;
    inputTensor[pixelIndex] = (data[i] / 255.0 - 0.5) / 0.5;
    inputTensor[pixelIndex + totalPixels] = (data[i + 1] / 255.0 - 0.5) / 0.5;
    inputTensor[pixelIndex + 2 * totalPixels] = (data[i + 2] / 255.0 - 0.5) / 0.5;
  }

  return inputTensor;
};

const CatDropField: React.FC = () => {
  const navigate = useNavigate();

  // ++++++++++ STATE MANAGEMENT ++++++++++
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false); // Used in JSX
  const [prediction, setPrediction] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null); // Stores confidence score

  // ++++++++++ CAT BREED CLASSES ++++++++++
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

  // ++++++++++ HANDLE FILE DROP ++++++++++
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));

    // Clear previous prediction and confidence
    setPrediction(null);
    setConfidence(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    multiple: false,
  });

  // ++++++++++ RUN ONNX INFERENCE ++++++++++

  const handleContinue = async () => {
    if (!file) return;
    setIsLoading(true); // ✅ Use loading state

    try {
      const inputTensor = await preprocessImage(file);
      if (!inputTensor) throw new Error("Failed to preprocess the image.");

      ort.env.wasm.wasmPaths = "/";
      const session = await ort.InferenceSession.create("/cat_breed_model.onnx");

      const feeds: Record<string, ort.Tensor> = {
        input: new ort.Tensor("float32", inputTensor, [1, 3, 299, 299]),
      };

      const results = await session.run(feeds);
      const output = results[Object.keys(results)[0]];

      // Extract probabilities
      const probabilities = output.data as Float32Array;
      const maxConfidence = Math.max(...probabilities);
      const predictedIndex = probabilities.indexOf(maxConfidence);
      const predictedBreed = classNames[predictedIndex];

      setPrediction(predictedBreed);
      setConfidence(maxConfidence);

      // Fetch additional breed info if confidence is high
      if (maxConfidence > 0.4) {
        try {
          const response = await axios.get(`https://api.api-ninjas.com/v1/cats?name=${predictedBreed}`, {
            headers: { "X-Api-Key": import.meta.env.VITE_API_NINJAS_KEY }
          });

          if (response.data && response.data.length > 0) {
            const uniqueId = generateProfileId();
            const breedInfo = {
              ...response.data[0],
              name: predictedBreed,
              imageUrl: preview,
              id: uniqueId,
              timestamp: Date.now()
            };

            sessionStorage.setItem(`cat-profile-${uniqueId}`, JSON.stringify(breedInfo));
            navigate(`/cat-profile/${uniqueId}`, { state: { breedInfo, fromUpload: true } });
          } else {
            // If no breed info is found, let the user know
            alert(`Predicted Breed: ${predictedBreed}\n\nNo additional breed information available.`);
          }
        } catch (apiError) {
          console.warn("API Error: Unable to fetch breed info.", apiError);
          alert(`Predicted Breed: ${predictedBreed}\n\nNo additional breed information available.`);
        }
      }
    } catch (error) {
      console.error("Error during prediction:", error);
      alert("An error occurred during the prediction.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[75%] max-w-[1000px] h-[33%]">
      <div {...getRootProps()} className={`p-8 border-2 border-solid rounded-lg text-center cursor-pointer h-full 
          ${isDragActive ? "border-primary bg-primary-light" : "border-gray-300"}`}>
        <input {...getInputProps()} />
        {preview ? (
          <div className="space-y-4">
            <img src={preview} alt="Preview" className="max-h-48 mx-auto" />
            <p className="text-sm text-gray-500">Click or drag to change image</p>
          </div>
        ) : (
          <p className="text-lg">Drag and drop your pet image here</p>
        )}
      </div>

      {file && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          {prediction && (
            <div className="mt-4 text-center">
              <p className="text-lg font-bold">Prediction: {prediction}</p>
              <p className={`text-lg ${confidence! <= 0.4 ? "text-red-500" : "text-green-600"}`}>
                Confidence: {(confidence! * 100).toFixed(2)}%
              </p>
              {confidence! <= 0.4 && <p className="text-red-500 text-sm">This prediction may not be accurate.</p>}
            </div>
          )}

          <button onClick={handleContinue} disabled={isLoading} className="w-full py-2 px-4 rounded-md text-white bg-primary hover:bg-primary-light">
            {isLoading ? "Processing..." : "Continue"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CatDropField;
