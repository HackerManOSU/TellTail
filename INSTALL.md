# INSTALL.md - TellTail Web Application

## Project Overview
TellTail is a web-based application designed to help pet owners and animal shelters accurately identify the breed, age, and health characteristics of pets using AI-powered image classification. The application provides a user-friendly interface for uploading pet images and generating shareable adoption profiles.

---

## 1. Accessing the Live Version
The easiest way to use TellTail is to visit the live web application at:

🔗 **[TellTail Web App](https://tail-tell.vercel.app/)**

---

## 2. System Requirements
Before installing and running TellTail locally, ensure you have the following prerequisites installed:

### **Frontend Requirements**
- **Node.js** (version 18+)
- **NPM** (Node Package Manager, included with Node.js)

### **Backend Requirements**
- **Python** (version 3.8+)
- **PIP** (Python Package Installer)
- **ONNX Runtime** (for frontend model inference)
- **PyTorch** (for backend model validation)

### **Other Tools**
- **Git** (for cloning the repository)
- **A Modern Web Browser** (Chrome, Firefox, or Edge)

---

## 3. Local Installation Instructions

### **Step 1: Clone the Repository**
1. Open your terminal or command prompt.
2. Run the following commands:
```sh
git clone https://github.com/HackerManOSU/TailTell.git
cd TailTell
```

### **Step 2: Install Frontend Dependencies**
1. Navigate to the frontend directory:
```sh
cd frontend
```
2. Install the required packages using NPM:
```sh
npm install
```

### **Step 3: Install Backend Dependencies**
1. Go back to the main directory:
```sh
cd ../backend
```
2. Install the required Python packages:
```sh
pip install -r requirements.txt
```

---

## 4. Running the Application Locally

### **Frontend (React Application)**
1. Ensure you are in the `frontend` directory:
```sh
cd frontend
```
2. Start the development server:
```sh
npm run dev
```
3. Open your browser and navigate to:
```sh
http://localhost:5173/
```

### **Backend (Optional: For Model Validation)**
1. In the `backend` directory, run the tests:
```sh
pytest tests/
```

---

## 5. Using the Application

### **Uploading Images**
1. Go to the live site or your local server.
2. Click on the dog or cat icon, depending on the pet type.
3. Select and upload an image.

### **Viewing Classification Results**
- The app will analyze the uploaded image and display the pet’s breed, age, and health information.

### **Generating Adoption Profiles**
- Click the **"Generate Adoption Profile"** button to create a sharable profile with the pet's information.

---

## 6. Running Tests

### **Frontend Testing**
```sh
npm test
```

### **Backend Testing**
```sh
pytest tests/
```

---

## 7. Common Issues & Troubleshooting

| Issue                              | Solution                                                    |
|----------------------------------|--------------------------------------------------------------|
| **Build Fails in Vercel**         | Ensure `npm run test` passes locally before pushing.         |
| **ONNX Runtime Errors**           | Refresh and re-upload the image.                             |
| **Prediction Stability Issues**   | Try using a different browser (Chrome recommended).          |
| **Mobile Navbar Clipping**        | Resize the screen or switch to desktop view.                 |
| **Dependency Installation Fails** | Check that `Node.js`, `Python`, and `pip` are installed and up to date. |

---

## 8. Getting Support & Reporting Issues

1. Visit the **GitHub Issues** page:
```sh
https://github.com/HackerManOSU/TailTell/issues
```
2. Create a **New Issue** and include:
   - Steps to reproduce the bug
   - Expected vs. actual results
   - Screenshots (if applicable)
   - Browser and device information

---

## 9. Additional Notes

- **Deployment:** The app is automatically deployed via **Vercel** using **GitHub Actions**.
- **Versioning:** Releases are tracked using **Semantic Versioning** (`v1.0.0`, `v1.1.0`, ...).

---

## 10. Contact Information
For additional help, reach out to the development team via the **GitHub repository** or contact us directly through the project’s support channels.

---

Thank you for using TellTail! We hope this tool helps you and your pets thrive.
