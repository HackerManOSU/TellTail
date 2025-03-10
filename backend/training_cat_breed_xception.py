import os
import time
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, random_split
from torchvision import transforms, datasets
from torch.cuda.amp import autocast, GradScaler

# Because its Xception
import timm  

def main():
    ##########################################
    # 1. Configuration & Hyperparameters
    ##########################################
    data_dir = r"C:\Users\Raed\Desktop\december_projects\images"  # Path to your dataset root
    train_split_ratio = 0.8     # 80% training, 20% validation
    batch_size = 32
    num_epochs = 80
    initial_lr = 1e-4
    image_size = 299            # Xception was originally 299×299
    num_workers = 16             # You gotta adjust this based on your cpu cores

    # Check device
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")

    # Optional: set a random seed for reproducibility
    # torch.manual_seed(42)

    ##########################################
    # 2. Data Transforms
    ##########################################
    # Training transforms (with augmentation)
    train_transforms = transforms.Compose([
        transforms.Resize((image_size, image_size)),
        transforms.RandomHorizontalFlip(p=0.5),
        transforms.RandomRotation(degrees=10),
        transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406], 
            std=[0.229, 0.224, 0.225]
        )
    ])

    # Validation transforms (no random augmentation)
    val_transforms = transforms.Compose([
        transforms.Resize((image_size, image_size)),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406], 
            std=[0.229, 0.224, 0.225]
        )
    ])

    ##########################################
    # 3. Create Dataset and Dataloaders
    ##########################################
    full_dataset = datasets.ImageFolder(data_dir, transform=train_transforms)
    num_classes = len(full_dataset.classes)
    print(f"Found {len(full_dataset)} images belonging to {num_classes} classes.")
    print("Classes:", full_dataset.classes)

    # Split into train/val
    train_size = int(train_split_ratio * len(full_dataset))
    val_size = len(full_dataset) - train_size
    train_dataset, val_dataset = random_split(full_dataset, [train_size, val_size])

    # Apply validation transforms to val_dataset
    val_dataset.dataset.transform = val_transforms

    # Create DataLoaders
    train_loader = DataLoader(
        train_dataset, batch_size=batch_size, shuffle=True, 
        num_workers=num_workers, pin_memory=True
    )
    val_loader = DataLoader(
        val_dataset, batch_size=batch_size, shuffle=False,
        num_workers=num_workers, pin_memory=True
    )

    ##########################################
    # 4. Create Model (Xception)
    ##########################################
    # timm.create_model allows num_classes override
    # If you'd like to manually replace the classifier layer, you'd do:
    #   model = timm.create_model("xception", pretrained=True)
    #   in_features = model.fc.in_features
    #   model.fc = nn.Linear(in_features, num_classes)
    # But timm can do it directly:
    model = timm.create_model("xception", pretrained=True, num_classes=num_classes)
    model.to(device)

    ##########################################
    # 5. Define Loss, Optimizer & Scheduler
    ##########################################
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=initial_lr)
    # CosineAnnealingLR: Gradually decreases the LR over num_epochs
    scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=num_epochs)

    ##########################################
    # 6. Training Loop (with Mixed Precision)
    ##########################################
    scaler = GradScaler()  # for AMP
    best_val_acc = 0.0
    best_model_path = "xception_cat_breed_best.pth"

    print("Starting training...")
    start_time = time.time()

    for epoch in range(num_epochs):
        # -----------------------------
        # TRAINING
        # -----------------------------
        model.train()
        running_loss = 0.0
        running_corrects = 0

        for images, labels in train_loader:
            images, labels = images.to(device), labels.to(device)

            optimizer.zero_grad()
            # Forward pass with autocast for mixed precision
            with autocast():
                outputs = model(images)
                loss = criterion(outputs, labels)

            # Backprop
            scaler.scale(loss).backward()
            scaler.step(optimizer)
            scaler.update()

            # Metrics
            _, preds = torch.max(outputs, 1)
            running_loss += loss.item() * images.size(0)
            running_corrects += torch.sum(preds == labels.data).item()

        # Average metrics for training
        epoch_train_loss = running_loss / len(train_dataset)
        epoch_train_acc = running_corrects / len(train_dataset)

        # -----------------------------
        # VALIDATION
        # -----------------------------
        model.eval()
        val_loss = 0.0
        val_corrects = 0

        with torch.no_grad():
            for images, labels in val_loader:
                images, labels = images.to(device), labels.to(device)
                with autocast():
                    outputs = model(images)
                    loss = criterion(outputs, labels)
                _, preds = torch.max(outputs, 1)
                val_loss += loss.item() * images.size(0)
                val_corrects += torch.sum(preds == labels.data).item()

        epoch_val_loss = val_loss / len(val_dataset)
        epoch_val_acc = val_corrects / len(val_dataset)

        # Step the scheduler
        scheduler.step()

        # Print metrics
        print(f"Epoch [{epoch+1:02d}/{num_epochs}] "
              f"Train Loss: {epoch_train_loss:.4f}, Train Acc: {epoch_train_acc:.4f}, "
              f"Val Loss: {epoch_val_loss:.4f}, Val Acc: {epoch_val_acc:.4f}")

        # Save best model
        if epoch_val_acc > best_val_acc:
            best_val_acc = epoch_val_acc
            torch.save(model.state_dict(), best_model_path)
            print(f"  --> New best model saved at epoch {epoch+1} with val acc {best_val_acc:.4f}")

    total_time = time.time() - start_time
    print(f"Training complete in {total_time/60:.2f} minutes. Best val acc: {best_val_acc:.4f}")


    # Save the final one too
    torch.save(model.state_dict(), "xception_cat_breed_final.pth")
    print("Final model saved as xception_cat_breed_final.pth")


if __name__ == "__main__":
    main()

