import os
import time
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, random_split
from torchvision import transforms, models
from torchvision.datasets import ImageFolder

data_dir = r"C:\Users\troyk\TellTail\backend\dataset\dogbreed\images\Images"

# Data Transforms
data_transforms = transforms.Compose([
    transforms.Resize((224, 224)),       # Resize images to 299x299
    transforms.ToTensor(),               # Convert to tensor
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                     std=[0.229, 0.224, 0.225])
  
])

# Load dataset using ImageFolder
dataset = ImageFolder(root=data_dir, transform=data_transforms)
print(f"Number of images: {len(dataset)}")
print(f"Classes (Breeds): {dataset.classes}")

# Split dataset into training (80%) and validation (20%)
train_size = int(0.8 * len(dataset))
val_size = len(dataset) - train_size
train_dataset, val_dataset = random_split(dataset, [train_size, val_size])

# Create DataLoaders
train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=64, shuffle=False)

# Load pretrained ResNet50 model
model = models.resnet50(weights=models.ResNet50_Weights.DEFAULT)

# Replace the fully connected layer to match the number of breeds
num_ftrs = model.fc.in_features
num_classes = len(dataset.classes)  # Number of breeds 
model.fc = nn.Linear(num_ftrs, num_classes)

if os.path.isfile("dog_breed_classifier.pth"):
    model.load_state_dict(torch.load("dog_breed_classifier.pth"))
    print("Loaded saved model weights from 'dog_breed_classifier.pth'")

# Move model to device (GPU if available)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)

# Loss function for multi-class classification
criterion = nn.CrossEntropyLoss()

# Adam optimizer
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Number of epochs
num_epochs = 50

# Running on GPU or CPU
if torch.cuda.is_available():
    print(f"Running on GPU: {torch.cuda.get_device_name(0)}")
else:
    print("Running on CPU")


start_time = time.time()

# Early Stopping parameters
patience = 5                  # Number of epochs to wait without improvement
best_val_loss = float('inf')  # Initialize best validation loss as "infinity"
epochs_no_improve = 0         # Counter for how many epochs with no improvement

for epoch in range(num_epochs):
    # Training phase
    model.train()
    running_loss = 0.0
    for images, labels in train_loader:
        # Move images and labels to the same device as the model
        images, labels = images.to(device), labels.to(device)

        optimizer.zero_grad()  # Zero the gradients
        outputs = model(images)  # Forward pass
        loss = criterion(outputs, labels)  # Compute loss
        loss.backward()  # Backward pass
        optimizer.step()  # Update weights

        running_loss += loss.item()


    epoch_loss = running_loss / len(train_loader)

    # Validation phase
    model.eval()
    val_loss = 0.0
    val_correct = 0
    val_total = 0
    with torch.no_grad():
        for images, labels in val_loader:
            images, labels = images.to(device), labels.to(device)  # Move to the same device
            outputs = model(images)
            loss = criterion(outputs, labels)
            val_loss += loss.item()
            _, preds = torch.max(outputs, 1)
            val_correct += (preds == labels).sum().item()
            val_total += labels.size(0)

    val_accuracy = 100.0 * val_correct / val_total

    print(f"Epoch [{epoch+1}/{num_epochs}] Train Loss: {epoch_loss:.4f}, Val Loss: {val_loss/len(val_loader):.4f}, Val Acc: {val_accuracy:.2f}%")
    if val_loss < best_val_loss:
        # We found a better model (lower val loss)
        best_val_loss = val_loss
        epochs_no_improve = 0

        # Save the best model so far
        torch.save(model.state_dict(), "best_model.pth")
        print(f"Validation loss improved. Saving best model at epoch {epoch+1}...")
    else:
        # No improvement
        epochs_no_improve += 1
        print(f"No improvement in val loss for {epochs_no_improve} epochs.")

        # Check if we should stop
        if epochs_no_improve >= patience:
            print("Early stopping triggered!")
            break

end_time = time.time()
print(f"Training completed in {end_time - start_time:.2f} seconds")

# Save the trained model
torch.save(model.state_dict(), "dog_breed_classifier.pth")
print("Training complete. Model saved as dog_breed_classifier.pth")
