// Author: Raed K 
// Description: This vite test script is for checking if the deployed onnx model runs as it should.

import * as ort from "onnxruntime-web";
import * as path from "path";

// I couldn't figure how to make relative paths work so I am using an absolute path :(
import { describe, it, expect, beforeAll } from "vitest";

// Define a test ONNX model path
const MODEL_PATH = path.resolve(__dirname, "../../public/cat_breed_model.onnx");

describe("ONNX Model Inference", () => {
  let session: ort.InferenceSession;

  beforeAll(async () => {
    // Load the ONNX model before running tests
    session = await ort.InferenceSession.create(MODEL_PATH);
  });

  it("should load the ONNX model", async () => {
    expect(session).toBeDefined();
  });

  it("should take a tensor input and return a prediction", async () => {
    // Create a mock input tensor (1x3x299x299)
    const inputTensor = new ort.Tensor(
      "float32",

      // Normalized just like in training
      new Float32Array(3 * 299 * 299).fill(0.5),  
      [1, 3, 299, 299]
    );

    // Prepare input tensor
    const feeds: Record<string, ort.Tensor> = { input: inputTensor };

    // Run inference
    const results = await session.run(feeds);

    // Extract the output tensor
    const output = results[Object.keys(results)[0]];
    expect(output).toBeDefined();
    expect(output.data).toBeInstanceOf(Float32Array);
  });

  it("should return a valid class index", async () => {
    const inputTensor = new ort.Tensor(
      "float32",
      new Float32Array(3 * 299 * 299).fill(0.5),
      [1, 3, 299, 299]
    );

    const feeds: Record<string, ort.Tensor> = { input: inputTensor };
    const results = await session.run(feeds);
    const output = results[Object.keys(results)[0]];
    const probabilities = output.data as Float32Array;

    // Find the predicted class index
    const predictedIndex = probabilities.indexOf(Math.max(...probabilities));

    expect(predictedIndex).toBeGreaterThanOrEqual(0);


    // Given 67 cat breeds
    expect(predictedIndex).toBeLessThan(67); 
  });
});

