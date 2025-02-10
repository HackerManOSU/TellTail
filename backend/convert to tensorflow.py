import onnx
from onnx_tf.backend import prepare
import tensorflow as tf
import os

# Load the ONNX model
onnx_model_path = "cat_breed_model.onnx"  # Path to your ONNX model
onnx_model = onnx.load(onnx_model_path)

# Convert ONNX model to TensorFlow SavedModel format
tf_model_dir = "cat_breed_tf_model"  # Output directory for TensorFlow model
os.makedirs(tf_model_dir, exist_ok=True)

# Prepare TensorFlow model
print("Converting ONNX to TensorFlow...")
tf_rep = prepare(onnx_model)

# Export to SavedModel
tf_rep.export_graph(tf_model_dir)
print(f"Model saved in TensorFlow SavedModel format at {tf_model_dir}")

