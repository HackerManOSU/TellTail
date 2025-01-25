import tensorflow as tf

# List all physical devices
gpus = tf.config.list_physical_devices('GPU')

if gpus:
    print(f"GPU is available: {gpus}")
else:
    print("No GPU detected.")
