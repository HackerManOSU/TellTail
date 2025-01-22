from torchvision.models import mobilenet_v3_large, MobileNet_V3_Large_Weights
from torchvision.transforms import Compose
from PIL import Image
import torch.nn as nn
import torch.optim as optim

weights = MobileNet_V3_Large_Weights.DEFAULT
model = mobilenet_v3_large(weights=weights)

# Switch between .train and .evaluate 
model.train()

# Evaluate model
# model.eval()
# with torch.no_grad():
#     for inputs, labels in val_dataloader:
#         outputs = model(inputs)

preprocess = weights.transforms()

# Open path to images
# image = Image.open("")
# input_tensor = preprocess(image).unqueeze(0)

# Replace classifier with specified task
# num_classes = 10
# model.classifier[3] = nn.Linear(model.classifier[3].in_features, num_classes)

# Define loss and optimizer
# criterion = nn.CrossEntropyLoss()
# optimzer = optim.Adam(model.parameters(), lr=0.001)

# Training loop
# for epoch in range(num_epochs):
#     for inputs, labels in dataloader:
#         optimizer.zero_grad()
#         outputs = model(inputs)
#         loss = criterion(outputs, labels)
#         loss.backward()
#         optimizer.step()

# Save model
torch.save(model.state_dict(), "mobilenet_age_classifier.pth")

# Load model for use
model.load_state_dict(torch.load("mobilenet_age_classifier.pth"))
model.eval()
