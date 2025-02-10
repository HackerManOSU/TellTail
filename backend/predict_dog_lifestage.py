import torch
from torchvision import transforms, models
from PIL import Image

# Define paths and device
MODEL_PATH = "pth_files/dog_lifestage_model.pth"  
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load the model
model = models.resnet50(weights=None)  # Initialize without pre-trained weights
model.fc = torch.nn.Linear(model.fc.in_features, 3)  # 3 classes: Young, Adult, Senior
model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
model = model.to(device)
model.eval()

# Preprocessing for input image
transform = transforms.Compose([
    transforms.Resize((224, 224)),  # Resize to match model input
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# Map predicted indices to lifestages
lifestage_mapping = {0: "Young", 1: "Adult", 2: "Senior"}

def predict_lifestage(img_path):
    image = Image.open(img_path).convert("RGB")
    image = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        outputs = model(image)
        _, predicted_class = torch.max(outputs, 1)  # Get the predicted class index
    
    lifestage = lifestage_mapping[predicted_class.item()]
    return lifestage

# # Example usage
# if __name__ == "__main__":
#     img_path = "path/to/your/image.jpg"  # Replace with the actual image path
#     lifestage = predict_lifestage(img_path)
#     print(f"Predicted lifestage: {lifestage}")
