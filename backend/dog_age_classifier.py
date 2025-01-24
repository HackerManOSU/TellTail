from torchvision.models import resnet50, ResNet50_Weights
from torchvision.transforms import Compose, Resize, ToTensor
from torchvision.datasets import ImageFolder
from torch.utils.data import DataLoader
from PIL import Image
import torch.nn as nn
import torch.optim as optim
import torch

# Load and preprocess dataset
dataset_path = "backend/datasets/DogAgeEstimation"

# Define preprocessing steps
preprocess = Compose([
    Resize((224, 224)),  # ResNet50 input size
    ToTensor(),          # Convert to PyTorch Tensor
])

# Load dataset
dataset = ImageFolder(root=dataset_path, transform=preprocess)

# Split dataset into training and validation sets
train_size = int(0.8 * len(dataset))
val_size = len(dataset) - train_size
train_dataset, val_dataset = torch.utils.data.random_split(dataset, [train_size, val_size])

# Define DataLoaders
batch_size = 32
train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False)

# Print dataset info
print(f"Classes: {dataset.classes}")
print(f"Training samples: {len(train_dataset)}")
print(f"Validation samples: {len(val_dataset)}")

# Use ResNet50 model with pretrained weights
weights = ResNet50_Weights.DEFAULT
model = resnet50(weights=weights)

# Replace classifier for specific task
num_classes = len(dataset.classes)  # Automatically set to the number of classes in the dataset
model.fc = nn.Linear(model.fc.in_features, num_classes)

# Switch between .train and .eval modes
model.train()

# Define loss and optimizer
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Training loop
num_epochs = 10  # Adjust as needed
for epoch in range(num_epochs):
    model.train()
    total_loss = 0
    for inputs, labels in train_loader:
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        total_loss += loss.item()
    print(f"Epoch {epoch+1}, Training Loss: {total_loss / len(train_loader)}")

    # Validation loop
    model.eval()
    with torch.no_grad():
        val_loss = 0
        for inputs, labels in val_loader:
            outputs = model(inputs)
            val_loss += criterion(outputs, labels).item()
        print(f"Epoch {epoch+1}, Validation Loss: {val_loss / len(val_loader)}")

# Save model
torch.save(model.state_dict(), "resnet50_age_classifier.pth")

# Load model for use
model.load_state_dict(torch.load("resnet50_age_classifier.pth"))
model.eval()
