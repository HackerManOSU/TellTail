# TellTail
Upload an image of your cat or dog and we will tell you its breed and more

Link: https://tail-tell.vercel.app/

# Trello
https://trello.com/b/bruFHEAQ/cs-362-group-15-project-board

## Tech Stack

### Frontend
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)  ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)  ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)  ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Backend
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)  ![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)  ![Cats API](https://img.shields.io/badge/Cats%20API-FFD700?style=for-the-badge&logo=cat&logoColor=black)  ![Dogs API](https://img.shields.io/badge/Dogs%20API-8B4513?style=for-the-badge&logo=dog&logoColor=white) 


### Model Backbones
![ResNet50](https://img.shields.io/badge/ResNet50-0096FF?style=for-the-badge&logo=deep-learning&logoColor=white)  ![EfficientNetV2](https://img.shields.io/badge/EfficientNetV2-00C853?style=for-the-badge&logo=deep-learning&logoColor=white) 


### Tools and Libraries
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)  ![MaterialUI](https://img.shields.io/badge/Material%20UI-0081CB?style=for-the-badge&logo=mui&logoColor=white)  ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)  ![dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=.env&logoColor=black)  ![ONNX Runtime](https://img.shields.io/badge/ONNX%20Runtime-005CED?style=for-the-badge&logo=onnx&logoColor=white)


### Diagram of TellTail
https://drive.google.com/file/d/1aQUYL65NAHzgO3qLxj3eLWHvnx3il3UL/view?usp=sharing

### Group Google Doc 
https://docs.google.com/document/d/1I5ed4LH9b9D_w5H8N8RbtgJrdjqqeIZ3JoOhrqkK7HI/edit?usp=sharing 

### UI Wireframe
https://www.figma.com/proto/9pO4CqLVWCrOygnr24prP4/Untitled?node-id=0-1&t=yrwT2gFLRzfkS8Ax-1

## Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/hackermanosu/tailtell.git
   ```
2. Install dependencies:
   ```bash
   cd TellTail/frontend
   npm install
   ```

## Running The App
**Option 1 - Run natively:**
1. Run the app (in the "tailtell/frontend/" folder):
   ```bash
   npm run dev
   ```
2. Follow the instructions provided by Vite

   - Usually this involves navigating to _localhost:5173_ in your web browser of choice.


**Option 2 - Use the web:**

Navigate to https://tail-tell.vercel.app/ to use the app on the web.

## Testing
1. Make sure that the app is already installed locally (see "Installation")
2. Run tests using Vitest test system:
    ```bash
   cd TellTail/frontend
   npm run dev
   ```

## Project Structure
<details>

```
$PROJECT_ROOT
├── backend
│   ├── pth_files
│   ├── README.md
│   ├── api.env
│   ├── catApi.ts
│   ├── convert to tensorflow.py
│   ├── dogApi.ts
│   ├── predict_cat_breed.py
│   ├── predict_dog_age.py
│   ├── predict_dog_breed.py
│   ├── predict_dog_lifestage.py
│   ├── preliminary_server.py
│   └── training_cat_breed.py
│
├── frontend
│   ├── public
│   │   ├── cat_breed_model.onnx
│   │   ├── dog_age_model.onnx
│   │   ├── dog_breed_model.onnx
│   │   ├── dog_lifestage_model.onnx
│   │   ├── ort-wasm-simd-threaded.jsep.wasm
│   │   └── ort-wasm-simd-threaded.wasm
│   │
│   ├── src
│   │   ├── components
│   │   │   ├── About Us
│   │   │   ├── Drop Field
│   │   │   │   ├── CatDropField.tsx
│   │   │   │   └── DogDropField.tsx
│   │   │   ├── Drop Page
│   │   │   ├── Header
│   │   │   ├── Home
│   │   │   ├── Instructions
│   │   │   └── Profiles
│   │   │       ├── CatProfiles.tsx
│   │   │       └── DogProfile.tsx
│   │   │
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   │
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├──tailwind.config.js
```
</details>

