import torch
from torchvision import transforms, models
from PIL import Image

# ---------------------------------
# 1. Define Transforms (Preprocessing)
# ---------------------------------
transform = transforms.Compose([
    transforms.Resize(384),  # Resize to 384x384
    transforms.CenterCrop(384),  # Center crop to 384x384
    transforms.ToTensor(),  # Convert to tensor
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]) 
])

# ---------------------------------
# 2. Load the Trained Model
# ---------------------------------
# Load the EfficientNetV2-S model
model = models.efficientnet_v2_s(weights=models.EfficientNet_V2_S_Weights.IMAGENET1K_V1)

# Modify the classifier to match the number of classes in your dataset
num_classes = 67  # Replace with the actual number of classes in your dataset
model.classifier[1] = torch.nn.Linear(model.classifier[1].in_features, num_classes)

# Load trained weights
model.load_state_dict(torch.load("efficientnet_v2_s_cat_breed_classifier.pth"))
model.eval()  # Set the model to evaluation mode

# Move model to GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)

# ---------------------------------
# 3. Define Class Names
# ---------------------------------
class_names = [
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

# ---------------------------------
# 4. Test the Model on a New Image
# ---------------------------------
def test_image(image_path: str):
    # Load and preprocess the image
    image = Image.open(image_path).convert("RGB")
    input_tensor = transform(image).unsqueeze(0).to(device)  # Add batch dimension and move to GPU

    # Perform inference
    with torch.no_grad():
        output = model(input_tensor)
        probabilities = torch.softmax(output, dim=1)  # Convert to probabilities
        confidence, predicted_idx = torch.max(probabilities, 1)

    # Get predicted class name and confidence score
    predicted_class = class_names[predicted_idx.item()]
    confidence_score = confidence.item()

    # Display results
    print(f"Predicted Class: {predicted_class}")
    print(f"Confidence Score: {confidence_score:.2f}")
    return predicted_class, confidence_score

if __name__ == "__main__":
    # Path to the test image
    test_image_path = r"C:\"

    # Test the model
    predicted_class, confidence_score = test_image(test_image_path)

    # Output
    print(f"Test Image: {test_image_path}")
    print(f"Predicted Breed: {predicted_class}, Confidence: {confidence_score:.2f}")

