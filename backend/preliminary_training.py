# Author: Raed Kabir
# Date: January 13th, 2025
# ResNet50 backbone with last layer modified and trained

from torchvision.datasets import ImageFolder
from torch.utils.data import DataLoader
from torchvision import transforms, models
import torch
import torch.nn as nn
import torch.optim as optim
import time

# Data tranformation definition
# An image dimension of 299x299 allows for higher details to be trained on 
data_transforms = transforms.Compose([
    transforms.Resize((299, 299)),       # Resize images to 299x299
    transforms.ToTensor(),               # Convert to tensor
    transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])  # Normalize vector
])

# Data Directory 
data_dir = r"C:\Users\Raed\Desktop\images" 

# Load dataset
dataset = ImageFolder(root=data_dir, transform=data_transforms) 

# DataLoader for batching
data_loader = DataLoader(dataset, batch_size=32, shuffle=True)  

# Print dataset info
print(f"Number of images: {len(dataset)}")
print(f"Classes (Breeds): {dataset.classes}")

# Load pretrained ResNet50 model
model = models.resnet50(weights=models.ResNet50_Weights.DEFAULT)

# Replace the fully connected layer to match the number of breeds
num_ftrs = model.fc.in_features

# Number of cat breeds (classes)
num_classes = len(dataset.classes)

model.fc = nn.Linear(num_ftrs, num_classes)

# Move model to GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)


# Loss function for multi-class classification
criterion = nn.CrossEntropyLoss() 

# Adam optimizer
# Uses pre-built model parameters for optimizer
optimizer = optim.Adam(model.parameters(), lr=0.001)  

# Im using 20 epochs because its a large dataset so each epoch is 
# pretty valuable 
num_epochs = 20

# Timer
start_time = time.time()

# for every epoch
for epoch in range(num_epochs):

    # Lets get into training mode
    model.train() 

    running_loss = 0.0  

    for images, labels in data_loader:

        # Move to GPU if we can
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

# Save it
torch.save(model.state_dict(), "cat_breed_classifier.pth")
print("Training complete. Model saved as cat_breed_classifier.pth")

# Planned feature set:
# No False Positives
# User Feedback 
# Expands upon differnet animals
# Uses a reliable backbone
# Accessible 
# Tensorflow
# No internet conenction? We can still do this

