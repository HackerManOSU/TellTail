/* ++++++++++ IMPORTS ++++++++++ */
import React, { useCallback, useState } from "react";

/* ++++++++++ DROPZONE ++++++++++ */
import { useDropzone } from "react-dropzone";

/* ++++++++++ PROFILES ++++++++++ */
import { useNavigate } from "react-router-dom";

/* ++++++++++ MATERIAL-UI ++++++++++ */
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";

/* ++++++++++ ONNX Runtime ++++++++++ */
import * as ort from "onnxruntime-web";

/* ++++++++++ UTILITIES ++++++++++ */
import { generateProfileId } from "../../utils/profileUtils";

// Utility for image preprocessing (adjusted for dog model)
const preprocessImage = async (image: File): Promise<Float32Array | null> => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const imgBitmap = await createImageBitmap(image);

  // Resize to 224x224 (adjusted for the dog breed model)
  canvas.width = 224;
  canvas.height = 224;

  ctx?.drawImage(imgBitmap, 0, 0, 224, 224);
  const imageData = ctx?.getImageData(0, 0, 224, 224);

  if (!imageData) return null;

  const { data } = imageData;
  const totalPixels = 224 * 224;
  const inputTensor = new Float32Array(totalPixels * 3);

  for (let i = 0; i < data.length; i += 4) {
    const pixelIndex = i / 4;
    inputTensor[pixelIndex] = (data[i] / 255.0 - 0.485) / 0.229;
    inputTensor[pixelIndex + totalPixels] = (data[i + 1] / 255.0 - 0.456) / 0.224;
    inputTensor[pixelIndex + 2 * totalPixels] = (data[i + 2] / 255.0 - 0.406) / 0.225;
  }
  return inputTensor;
};

const DogDropField: React.FC = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);

  // Display prediction if available
  React.useEffect(() => {
    if (prediction) {
      console.log(Predicted breed: ${prediction});
    }
  }, [prediction]);

  /* ++++++++++ DOG BREEDS LIST ++++++++++ */
  const dogBreeds = [
    "Chihuahua", "Japanese Spaniel", "Maltese Dog", "Pekinese", "Shih-Tzu", "Blenheim Spaniel", "Papillon",
    "Toy Terrier", "Rhodesian Ridgeback", "Afghan Hound", "Basset", "Beagle", "Bloodhound", "Bluetick",
    "Black-and-Tan Coonhound", "Walker Hound", "English Foxhound", "Redbone", "Borzoi", "Irish Wolfhound",
    "Italian Greyhound", "Whippet", "Ibizan Hound", "Norwegian Elkhound", "Otterhound", "Saluki",
    "Scottish Deerhound", "Weimaraner", "Staffordshire Bullterrier", "American Staffordshire Terrier",
    "Bedlington Terrier", "Border Terrier", "Kerry Blue Terrier", "Irish Terrier", "Norfolk Terrier",
    "Norwich Terrier", "Yorkshire Terrier", "Wire-haired Fox Terrier", "Lakeland Terrier",
    "Sealyham Terrier", "Airedale", "Cairn", "Australian Terrier", "Dandie Dinmont", "Boston Bull",
    "Miniature Schnauzer", "Giant Schnauzer", "Standard Schnauzer", "Scotch Terrier", "Tibetan Terrier",
    "Silky Terrier", "Soft-coated Wheaten Terrier", "West Highland White Terrier", "Lhasa",
    "Flat-coated Retriever", "Curly-coated Retriever", "Golden Retriever", "Labrador Retriever",
    "Chesapeake Bay Retriever", "German Short-haired Pointer", "Vizsla", "English Setter", "Irish Setter",
    "Gordon Setter", "Brittany Spaniel", "Clumber", "English Springer", "Welsh Springer Spaniel",
    "Cocker Spaniel", "Sussex Spaniel", "Irish Water Spaniel", "Kuvasz", "Schipperke", "Groenendael",
    "Malinois", "Briard", "Kelpie", "Komondor", "Old English Sheepdog", "Shetland Sheepdog",
    "Collie", "Border Collie", "Bouvier des Flandres", "Rottweiler", "German Shepherd", "Doberman",
    "Miniature Pinscher", "Greater Swiss Mountain Dog", "Bernese Mountain Dog", "Appenzeller",
    "EntleBucher", "Boxer", "Bull Mastiff", "Tibetan Mastiff", "French Bulldog", "Great Dane",
    "Saint Bernard", "Eskimo Dog", "Malamute", "Siberian Husky", "Affenpinscher", "Basenji",
    "Pug", "Leonberg", "Newfoundland", "Great Pyrenees", "Samoyed", "Pomeranian", "Chow", "Keeshond",
    "Brabancon Griffon", "Pembroke", "Cardigan", "Toy Poodle", "Miniature Poodle", "Standard Poodle",
    "Mexican Hairless", "Dingo", "Dhole", "African Hunting Dog"
  ];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setPrediction(null);
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
      const inputTensor = await preprocessImage(file);
      if (!inputTensor) throw new Error("Failed to preprocess the image.");
  
      ort.env.wasm.wasmPaths = "/";
  
      // Load Dog Breed Model
      const breedSession = await ort.InferenceSession.create("/dog_breed_model.onnx");
      const breedFeeds = { input: new ort.Tensor("float32", inputTensor, [1, 3, 224, 224]) };
      const breedResults = await breedSession.run(breedFeeds);
      const breedProbabilities = breedResults[Object.keys(breedResults)[0]].data as Float32Array;
      const predictedBreedIndex = breedProbabilities.indexOf(Math.max(...breedProbabilities));
      const predictedBreed = dogBreeds[predictedBreedIndex];
  
      // Load Dog Lifestage Model
      const lifestageSession = await ort.InferenceSession.create("/dog_lifestage_model.onnx");
      const lifestageResults = await lifestageSession.run(breedFeeds);
      const lifestageProbabilities = lifestageResults[Object.keys(lifestageResults)[0]].data as Float32Array;
      const lifestageIndex = lifestageProbabilities.indexOf(Math.max(...lifestageProbabilities));
      const lifestageLabels = ["Young", "Adult", "Senior"];
      const predictedLifestage = lifestageLabels[lifestageIndex];
  
      setPrediction(${predictedBreed} (${predictedLifestage}));
  
      // Fetch breed details
      const apiKey = import.meta.env.VITE_API_NINJAS_KEY;
      const response = await fetch(https://api.api-ninjas.com/v1/dogs?name=${predictedBreed}, {
        headers: { 'X-Api-Key': apiKey }
      });
  
      if (response.ok) {
        const breedData = await response.json();
        const uniqueId = generateProfileId();
  
        const breedInfo = {
          ...breedData[0],
          name: predictedBreed,
          lifestage: predictedLifestage,
          imageUrl: preview,
          id: uniqueId,
          timestamp: Date.now()
        };
  
        sessionStorage.setItem(dog-profile-${uniqueId}, JSON.stringify(breedInfo));
  
        navigate(/dog-profile/${uniqueId}, {
          state: { breedInfo, fromUpload: true }
        });
      }
    } catch (error) {
      console.error("Error during prediction:", error);
      alert("An error occurred during the prediction.");
    } finally {
      setIsLoading(false);
    }
  };
  


  return (
    <div className="w-[75%] max-w-[1000px] h-[33%] lg:h-[50%]">
      <div
        {...getRootProps()}
        className={pb-8 border-2 border-solid rounded-lg text-center cursor-pointer h-full
            ${isDragActive || "hover:border-primary hover:bg-primary-light"} 
            ${isDragActive ? "border-primary bg-primary-light" : "border-gray-300"}}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="space-y-2 h-full">
            <img src={preview} alt="Preview" className="max-h-48 mx-auto h-full" />
            <p className="text-sm text-gray-500">Click or drag to change image</p>
          </div>
        ) : (
          <div className="space-y-2 h-full flex flex-col items-center text-center justify-center ">
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
            className={w-full py-2 px-4 rounded-md text-white
              ${isLoading
                ? "bg-primary cursor-not-allowed"
                : "bg-primary hover:bg-primary-light"
              } transition-colors}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </div>
            ) : (
              "Continue"
            )}
          </button>
        </div>
      )}
      
      <h3 className='text-2xl text-primary'>*AI can make mistakes, always check important information*</h3>

    </div>

  );
};

export default DogDropField;
