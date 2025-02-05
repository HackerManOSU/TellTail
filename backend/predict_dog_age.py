import torch
from torchvision import transforms, models
from PIL import Image

# Define paths and device
MODEL_PATH = "pth_files/dog_age_model.pth"
MAX_AGE = 192  # The maximum age in months (16 years)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load the model
model = models.resnet50(weights=None)  # Initialize without pre-trained weights
model.fc = torch.nn.Sequential(
    torch.nn.Linear(model.fc.in_features, 1),
    torch.nn.Sigmoid()  # For normalized age prediction
)
model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
model = model.to(device)
model.eval()

# Preprocessing for input image
transform = transforms.Compose([
    transforms.Resize((128, 128)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

def predict_age(img_path):
    image = Image.open(img_path).convert("RGB")
    image = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        normalized_age = model(image).item()
    
    age_in_months = normalized_age * MAX_AGE  # Denormalize the age
    return age_in_months

# # Example usage
# if __name__ == "__main__":
#     img_path = "path/to/your/image.jpg"
#     age = predict_age(img_path)
#     print(f"Predicted age: {age:.2f} months")
