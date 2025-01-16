const mobilenet = require('@tensorflow-models/mobilenet');
const tf = require('@tensorflow/tfjs-node');

// Load data
const fs = require('fs');
const path = require('path');

async function loadImages() {
  const catImages = fs.readdirSync('./cats').map((file) => ({
    label: 'cat',
    tensor: tf.node.decodeImage(fs.readFileSync(path.join('./cats', file)))
  }));

  const dogImages = fs.readdirSync('./dogs').map((file) => ({
    label: 'dog',
    tensor: tf.node.decodeImage(fs.readFileSync(path.join('./dogs', file)))
  }));

  return [...catImages, ...dogImages];
}

// Train a custom model
async function trainModel() {
  const data = await loadImages();
  const baseModel = await mobilenet.load({ version: 2, alpha: 1.0 });

  // Extract features
  const features = data.map(({ tensor }) => ({
    tensor: baseModel.infer(tensor, true),
    label: tensor.label
  }));

  // Create a new model
  const model = tf.sequential();
  model.add(tf.layers.flatten({ inputShape: features[0].tensor.shape.slice(1) }));
  model.add(tf.layers.dense({ units: 2, activation: 'softmax' }));

  model.compile({
    optimizer: 'adam',
    loss: 'sparseCategoricalCrossentropy',
    metrics: ['accuracy']
  });

  // Prepare data for training
  const tensors = tf.stack(features.map((f) => f.tensor));
  const labels = tf.tensor1d(features.map((f) => f.label === 'cat' ? 0 : 1), 'int32');

  // Train the model
  await model.fit(tensors, labels, { epochs: 10 });

  // Save the model
  await model.save('file://./cat-vs-dog-model');
}

trainModel();
