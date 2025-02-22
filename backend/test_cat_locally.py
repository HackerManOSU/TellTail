# Author: Raed Kabir
# Description: This is a python script to test a cat pth model 

import torch
import torch.nn as nn
from torchvision import transforms, models
from PIL import Image
import matplotlib.pyplot as plt

# Define image transformations
data_transforms = transforms.Compose([
    transforms.Resize((299, 299)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])
])

# Load the trained model
model = models.resnet50(weights=None)


# Total number of cat breeds
num_classes = 67  

num_ftrs = model.fc.in_features
model.fc = nn.Linear(num_ftrs, num_classes)

# Load trained weights
model.load_state_dict(torch.load("some cat pth model.pth"))  

# Move model to GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)
model.eval()

# Define class names
class_names = [
    'Abyssinian', 'American Bobtail', 'American Curl', 'American Shorthair', 'American Wirehair', 
    'Applehead Siamese', 'Balinese', 'Bengal', 'Birman', 'Bombay', 'British Shorthair', 
    'Burmese', 'Burmilla', 'Calico', 'Canadian Hairless', 'Chartreux', 'Chausie', 'Chinchilla', 
    'Cornish Rex', 'Cymric', 'Devon Rex', 'Dilute Calico', 'Dilute Tortoiseshell', 
    'Domestic Long Hair', 'Domestic Medium Hair', 'Domestic Short Hair', 'Egyptian Mau', 
    'Exotic Shorthair', 'Extra-Toes Cat - Hemingway Polydactyl', 'Havana', 'Himalayan', 
    'Japanese Bobtail', 'Javanese', 'Korat', 'LaPerm', 'Maine Coon', 'Manx', 'Munchkin', 
    'Nebelung', 'Norwegian Forest Cat', 'Ocicat', 'Oriental Long Hair', 'Oriental Short Hair', 
    'Oriental Tabby', 'Persian', 'Pixiebob', 'Ragamuffin', 'Ragdoll', 'Russian Blue', 
    'Scottish Fold', 'Selkirk Rex', 'Siamese', 'Siberian', 'Silver', 'Singapura', 'Snowshoe', 
    'Somali', 'Sphynx - Hairless Cat', 'Tabby', 'Tiger', 'Tonkinese', 'Torbie', 'Tortoiseshell', 
    'Turkish Angora', 'Turkish Van', 'Tuxedo', 'York Chocolate'
]

# Load and preprocess the test image
image_path = r"C:Path to your image here"  # Update path
image = Image.open(image_path).convert("RGB")
input_image = data_transforms(image).unsqueeze(0).to(device)

# Make a prediction
with torch.no_grad():
    output = model(input_image)
    probabilities = torch.softmax(output, dim=1)
    confidence, predicted_idx = torch.max(probabilities, 1)

# Map index to class
predicted_class = class_names[predicted_idx.item()]
confidence_score = confidence.item()

# Display result
print(f"Predicted Class: {predicted_class}")
print(f"Confidence Score: {confidence_score:.2f}")
plt.imshow(image)
plt.title(f"Predicted: {predicted_class} ({confidence_score:.2f})")
plt.axis("off")
plt.show()

