import torch
import torchvision.models as models
import os

pth_file = r"C:\Users\troyk\TellTail\backend\pth_files\best_model.pth"
onnx_file = "dog_breed_model.onnx"

# Load the trained ResNet50 model
num_classes = 120  
model = models.resnet50(weights=None)
model.fc = torch.nn.Linear(model.fc.in_features, num_classes)

# Load model weights
if os.path.isfile(pth_file):
    model.load_state_dict(torch.load(pth_file))
    print(f"Model weights loaded from {pth_file}")
else:
    print(f"Error: {pth_file} not found.")
    exit()

# Set the model to evaluation mode
model.eval()

# Dummy input for ONNX export (Batch size = 1, 3 channels, 224x224 image)
dummy_input = torch.randn(1, 3, 224, 224)

# Export the model to ONNX
torch.onnx.export(
    model,
    dummy_input,
    onnx_file,
    export_params=True,
    opset_version=11,
    input_names=["input"],
    output_names=["output"],
    dynamic_axes={"input": {0: "batch_size"}, "output": {0: "batch_size"}}
)

print(f"Model successfully converted to {onnx_file}")