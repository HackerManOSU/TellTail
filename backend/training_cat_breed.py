import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import transforms, models
from torchvision.datasets import ImageFolder
from torch.utils.data import DataLoader
import time

# ---------------------------------
# 1. Data Transformation Definition
# ---------------------------------
# Transforms recommended by the documentation
data_transforms = transforms.Compose([
    transforms.Resize(384),                # Resize to 384x384 as per EfficientNet_V2_S transforms
    transforms.CenterCrop(384),            # Center crop to 384x384
    transforms.ToTensor(),                 # Convert to tensor
    transforms.Normalize(                  # Normalize with ImageNet mean and std
        mean=[0.485, 0.456, 0.406], 
        std=[0.229, 0.224, 0.225]
    )
])

data_dir = r"C:\Users\Raed\Desktop\december_projects\images"

# Load dataset
dataset = ImageFolder(root=data_dir, transform=data_transforms)
data_loader = DataLoader(dataset, batch_size=32, shuffle=True)

# Print dataset info
print(f"Number of images: {len(dataset)}")
print(f"Classes (Breeds): {dataset.classes}")

# ---------------------------------
# 2. Load EfficientNetV2-S with Custom Head
# ---------------------------------
num_classes = len(dataset.classes)

# Load EfficientNetV2-S model with pretrained weights
model = models.efficientnet_v2_s(weights=models.EfficientNet_V2_S_Weights.IMAGENET1K_V1)

# Modify the classifier to match the number of classes
model.classifier[1] = nn.Linear(model.classifier[1].in_features, num_classes)

# Move model to GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)

# ---------------------------------
# 3. Training Setup
# ---------------------------------
# Loss function for multi-class classification
criterion = nn.CrossEntropyLoss()

# Adam optimizer
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Number of epochs
num_epochs = 20

# ---------------------------------
# 4. Training Loop
# ---------------------------------
start_time = time.time()

for epoch in range(num_epochs):
    # Set the model to training mode
    model.train()  

    # Initialize running loss
    running_loss = 0.0  

    for images, labels in data_loader:
        
        # Move data to GPU if available
        images, labels = images.to(device), labels.to(device)  

        # Zero the gradients
        optimizer.zero_grad()

        # Forward pass
        outputs = model(images)

        # Compute loss
        loss = criterion(outputs, labels)

        # Backward pass and optimization
        loss.backward()
        optimizer.step()

        # Accumulate loss
        running_loss += loss.item()

    epoch_loss = running_loss / len(data_loader)
    print(f"Epoch [{epoch+1}/{num_epochs}], Loss: {epoch_loss:.4f}")

end_time = time.time()
print(f"Training completed in {end_time - start_time:.2f} seconds")

# ---------------------------------
# 5. Save the Model
# ---------------------------------
torch.save(model.state_dict(), "efficientnet_v2_s_cat_breed_classifier.pth")
print("Training complete. Model saved as efficientnet_v2_s_cat_breed_classifier.pth")
