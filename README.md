# TellTail
Upload an image of your cat or dog and we will tell you its breed and more

Link: https://tail-tell.vercel.app/

# Trello
https://trello.com/b/bruFHEAQ/cs-362-group-15-project-board

## Tech Stack

### Front end
- [x] **Vite**
- [x] **React**
- [x] **TypeScript**
- [x] **TailwindCSS**

### Backend
- [x] **Python**
- [x] PyTorch
- [x] Cats API

### Model Backbones
- [x] **ResNet50** 
- [x] **EfficientNetV2** 

- We are currently using two different backbones; however, we are trying to transition torwards EfficientNetV2

### Tools and Libraries
- [x] **ESLint**
- [x] **MaterialUI**
- [x] **Axios**:
- [x] **dotenv**
- [x] ONNX Runtime

### Diagram of TellTail
https://drive.google.com/file/d/1aQUYL65NAHzgO3qLxj3eLWHvnx3il3UL/view?usp=sharing

### Group Google Doc 
https://docs.google.com/document/d/1I5ed4LH9b9D_w5H8N8RbtgJrdjqqeIZ3JoOhrqkK7HI/edit?usp=sharing 


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
3. Run the app (in the "/frontend/" folder):
   ```bash
   npm run dev

## Project Structure

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
│   └── tailwind.config.js


