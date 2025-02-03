import torch
from torchvision import transforms, models
from PIL import Image

# Define paths and device
MODEL_PATH = "pth_files/dog_breed_model.pth"
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load the model
model = models.resnet50(weights=None)  # Initialize without pre-trained weights
num_classes = 120  # Adjust based on the number of breeds in your dataset
model.fc = torch.nn.Linear(model.fc.in_features, num_classes)
model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
model = model.to(device)
model.eval()

# Preprocessing for input image
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

def predict_breed(img_path):
    image = Image.open(img_path).convert("RGB")
    image = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        outputs = model(image)
        _, predicted_idx = torch.max(outputs, 1)
    
    return predicted_idx.item()

# # Example usage
# if __name__ == "__main__":
#     img_path = "path/to/your/image.jpg"
#     breed_idx = predict_breed(img_path)
#     print(f"Predicted breed index: {breed_idx}")
