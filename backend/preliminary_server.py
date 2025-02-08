# Author: Raed Kabir 
# Description: This is a preliminary script for server-side computation 

import onnxruntime

import numpy as np
from PIL import Image
from flask import Flask, request, jsonify

app = Flask(__name__)

CLASS_NAMES = [
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
]

# Load ONNX model at startup
session = onnxruntime.InferenceSession("cat_breed_model.onnx")

# Check input/output names (usually 'input' / 'output')
input_name = session.get_inputs()[0].name   # e.g. "input"
output_name = session.get_outputs()[0].name # e.g. "output"

def preprocess_image(img: Image.Image) -> np.ndarray:
    """
    Match the training transforms:
    1) Resize 299x299
    2) Normalize each channel using mean=[0.5,0.5,0.5], std=[0.5,0.5,0.5]
       => value = (pixel/255 - 0.5) / 0.5 = pixel/255*2 - 1
    3) Shape = (1, 3, 299, 299)
    """
    # 1) Resize
    img = img.resize((299, 299))

    # 2) Convert to np array (shape: (299, 299, 3))
    #    If the image is RGBA or grayscale, we should convert to RGB
    img = img.convert("RGB")
    img_array = np.asarray(img, dtype=np.float32)  # [299, 299, 3]

    # 3) Normalize: pixel in [0..255] => [0..1], then => [-1..+1]
    img_array /= 255.0
    img_array = (img_array - 0.5) / 0.5  # same as img_array*2 - 1

    # Transpose to [3, 299, 299]
    img_array = np.transpose(img_array, (2, 0, 1))

    # Add batch dimension -> [1, 3, 299, 299]
    img_array = np.expand_dims(img_array, axis=0)

    return img_array


@app.route("/predict", methods=["POST"])
def predict():
    # Expect the file in form-data "file"
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if not file:
        return jsonify({"error": "Empty file"}), 400

    # Read the image via Pillow
    img = Image.open(file)

    # Preprocess
    input_data = preprocess_image(img)  # shape [1, 3, 299, 299]

    # Run inference
    # onnxruntime expects float32 array
    inputs_feed = {input_name: input_data}
    results = session.run([output_name], inputs_feed)
    # 'results' is typically a list [ (1, num_classes) ]

    logits = results[0].squeeze()  # shape (num_classes,) if batch_size=1

    # Argmax
    predicted_idx = int(np.argmax(logits))
    predicted_breed = CLASS_NAMES[predicted_idx]

    return jsonify({
        "predicted_class": predicted_breed,
        "class_index": predicted_idx,
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7000, debug=True)

