## Team info
### Roles and Justification (Updated 1/21/25)

**Zane:** Project management, frontend, hosting/building/production

**Justification:** Zane has extensive experience working on frontend projects, so he is working on that, while also handling all of the setup, build, and deployment processes.

**Raed:** Machine learning model training and optimization

**Justification:** Raed is the most well-versed in machine learning and training models so he is granted this task. The core functionality of TellTail depends on accurate breed and age detection, making ML expertise pivotal.

**Sam:** Frontend-Backend connectivity

**Justification:** Sam has experience with front end in other languages as well as limited experience with back end. This makes tying the two parts together a great role. Limited experience with model training, but open to learning in order to contribute as much as possible.

**Christian:**  General backend and frontend development, Machine learning

**Justification:** Christian has interest in learning more about machine learning and AI models, and has the most prior experience working with languages that better suit the backend. Provides the flexibility to assist with any issues that arise throughout the project, to gain more experience. Also hopes to gain experience working with React and the front end.

**Troy:** Data collection and model evaluation

**Justification:** Troy has an interest in ML and AI. High-quality data is the lifeblood of a successful ML model, and continuous evaluation ensures the model remains accurate over time.

**Stephen:** General backend development

**Justification:** Having someone who can work all over and help wherever necessary on the backend is important as we may need someone helping on different tasks on different days.

**Nathaniel:** Frontend, testing, QA

**Justification:** Nathaniel has more interest working in the frontend than the backend. Testing and assuring good quality code is being written is highly important when working in teams.

### Relevant Artifacts

**Git Repository:** https://github.com/HackerManOSU/TailTell

**Trello Board:** https://trello.com/invite/b/678fef5875a0c1cf4c20d2d3/ATTIa3cef6556fd5a8168ed7e16848f803bcA3BF05A9/cs-362-group-15-project-board

### Communication

**Main Channel:** Texting Groupchat

## Product description 

**Abstract:**
Many pet shelters struggle with limited resources and labor when classifying a large number of incoming animals, often relying on guesswork or costly veterinary consultations to determine a pet’s breed, age, and potential health conditions. This lack of accurate information can lead to challenges in providing proper care for pets and ensuring successful adoptions. To address this issue, TellTail introduced an AI-powered web and mobile application designed to revolutionize pet classification. The process begins with the user uploading an image of a pet, after which the application determines whether the pet is a dog or a cat. Next, it identifies the pet’s gender as male or female. Leveraging a multi-model AI architecture, including ResNet50 for feature extraction and YOLO for object detection, TellTail is trained on a diverse set of over 120,000 images to provide insights on your pet. The application also supports offline functionality on the app side, ensuring accessibility without the internet. Users can contribute feedback to refine the model and further enhance its accuracy. Additionally, TellTail generates shareable adoption profiles, consolidating the pet’s details for prospective adopters or users who want to share their pet’s results with others. The application will provide information on breed identification, age estimation, and breed-specific health risks. For example, potential adopters can learn whether a particular dog breed sheds heavily in summer or is prone to specific medical conditions. However, it is important to note that this application only provides general health advice based on breed characteristics and is not a substitute for professional veterinary care. If users are concerned about their pet’s health, we strongly recommend consulting a licensed veterinarian for accurate diagnosis and treatment. The breed detection model will also provide confidence intervals for its predictions. For instance, if the model detects a pet as 50% Chihuahua and 50% Terrier, it will yield 100% confidence in both Chihuahua and Terrier, confidently identifying the pet as a Chihuahua-Terrier mix. However, if the uploaded image is too blurry or the model cannot detect the pet with sufficient clarity, and the confidence interval falls below a set threshold, the application will refrain from posting results to avoid providing inaccurate or misleading information.This solution not only enhances operational efficiency for shelters by automating classification processes but also empowers potential adopters to make well-informed decisions. By integrating advanced machine models, TellTail seeks to improve animal care, reduce costs, and increase adoption rates across pet shelters.

**Goal:**
When adopting a new animal it is common for new pet owners to know very little information about the pet. With our website we are trying to paint the whole picture about the user's pet. We can help users better understand how to care for their pets' needs. For example a user might want to know how much this dog is going to shed in the summer, but they don’t know the breed of dog so they can’t anticipate the level of shedding. Using our website we would be able to point this user in the right direction into learning more about their dogs shedding habits by telling them the age and breed of the dog. Another example could be if the user wants to know how much time they have left with their dog, but they don’t know their dog's age. We can give the user a better estimate of how much time they have to enjoy with their pet. 

**Current practice:**
Today, shelters often rely on staff expertise or guesswork to identify the breed and age of incoming animals. In some cases, external vet consultations are required, which can be time-consuming and expensive. These methods are limited by human subjectivity, a lack of resources, and inconsistencies in identification, leading to delays in creating accurate profiles for adoption.
As for individuals, some shelters or private parties don’t provide sufficient, accurate information on the animals they are selling. Vet consultations can be timely and expensive. This website allows them to cut down on cost and get the answers they need in a timely manner. 

**Novelty:**
Our approach leverages advanced AI models trained specifically on large, diverse datasets of dog and cat breeds. People who need information about their pets will care about the features we offer with our website. With our website, pet owners will be able to care for their pets much better. Additionally, its holistic view with the inclusion of complete pet profiles is something that existing tools lack. We will be helping them find out what their pet needs for their health and quality of life. 

**Effects:**
Successful implementation will significantly improve operational efficiency for shelters, allowing them to focus more on animal care and adoption processes. This tool will enhance the accuracy of pet profiles, reduce reliance on external consultations, and potentially increase adoption rates by providing adopters with trustworthy information. The broader impact includes better-informed decisions about animal care and the promotion of shelter pet adoptions.

**Technical approach:**
The system will use a convolutional neural network (CNN) for image classification and feature extraction. Kaggle datasets and other sources will provide training data for breed and health condition identification. A web-based interface, built with React, Vite, Typescript and TailwindCSS, will allow users to upload photos and view results. Backend services in Python with TensorFlow will handle model inference and data processing.

**Risks: (Updated 1/21/25)**
**Incorrect Model Training or Poor Dataset Quality**

*Why a Risk?* If the model is trained on insufficient or biased data, classification accuracy will be low. Users may lose trust in the tool, especially shelters needing reliable info.

*Mitigation:* Continual data collection, rigorous testing on diverse images, and iterative re-training.

**Integration and Performance Bottlenecks**

*Why a Risk?* Even with a well-trained model, slow inference or a poorly designed backend can cause timeouts and user frustration.

*Mitigation:* Optimize model size, use GPU acceleration when possible, and keep the backend endpoints efficient. Conduct load testing by Week 8.

**User Adoption and Feedback Gaps**

*Why a Risk?* If we don’t get external feedback early, we could build features that don’t match real-world needs (like shelter staff workflows).

*Mitigation:* Release a beta (Week 8) for external shelters or pet owners to test. Gather feedback systematically and adapt quickly in Week 9.


The most serious challenge is ensuring the accuracy of the AI model when handling diverse and mixed-breed animals, particularly under suboptimal conditions such as poor-quality photos or unusual angles. To mitigate this, we will try to include training data with diverse scenarios and edge cases.


## Major features and goals

**4+ major features we will implement:**
- [ ] Telling the user whether or not the image is of a dog or a cat as well as the pets breed
- [ ] Telling the user the age of the given pet
- [ ] Preventing the model from giving false positives
- [ ] Automatically creates a sharable adoption profile with the pet's breed, age, potential health conditions, and compatibility tips

**2+ stretch goals we hope to implement:**
- [ ] Making our website available on mobile devices
- [ ] Syncing with national databases or adoption platforms (e.g., Petfinder) to streamline uploading identified information and updates about available pets

## UPDATE 2 - 03/03/25
## Updated Use Cases

### ✅ **Identifying Breeds (CORE USE CASE - Fully Functional)**

**Actors:**
- User (Pet owner or shelter staff)
- System (TellTail web application)

**Triggers:**
- The user uploads an image of a pet.

**Preconditions:**
- The user has access to the application.
- The uploaded image is clear and contains a single dog or cat.

**Postconditions:**
- The system correctly identifies the pet's breed and age.
- The system provides breed-specific information such as health risks and characteristics.

**List of Steps:**
1. The user uploads an image of a pet.
2. The ONNX model processes the image entirely on the frontend.
3. The system classifies the pet’s breed and age.
4. The system displays:
   - Basic information (origin, age group, health risks, life expectancy, weight, height).
   - Characteristics (shedding, barking, energy levels, trainability, etc.).
5. The user views the classification results.

**Testing Details:**
- A **golden retriever image** is used to validate the correct output:
  - Origin: Scotland
  - Age Group: Adult
  - Common Health Issues: Hip dysplasia, cancer, skin allergies
  - Life Expectancy: 10 - 12 years
  - Characteristics: shedding (4/5), trainability (5/5), etc.

**Notes:**
- **No backend is used.** The classification is handled entirely on the frontend using ONNX runtime.

---

### ❌ **Multiple-Pet Detection (Not Functional)**

**Actors:**
- User (Pet owner or shelter staff)
- System (TellTail web application)

**Triggers:**
- The user uploads an image containing more than one pet.

**Preconditions:**
- The user has access to the application.

**Postconditions:**
- **Currently, this feature does not work.**

**Notes:**
- Multiple pets in one image are **not detected separately**.
- If this feature is attempted, the system may only classify one pet or return incorrect results.

---

### ✅ **Sharable Adoption Profile Generation (Fully Functional)**

**Actors:**
- Shelter Staff / Pet Owner
- System (TellTail web application)

**Triggers:**
- The user wants to create an adoption profile after classification.

**Preconditions:**
- The pet’s breed and age have been identified.

**Postconditions:**
- A **sharable adoption profile** is generated.

**List of Steps:**
1. The user uploads an image and receives classification results.
2. The user clicks **“Generate Adoption Profile”**.
3. The system formats the pet’s details (breed, age, health conditions, characteristics).
4. The system provides a **sharable link or downloadable file**.
5. The user can share the profile via social media, email, or other channels.

**Notes:**
- This feature is **working as expected**.

---

### ⚠️ **Handling Non-Animal or Low-Quality Images (Not Functional)**

**Actors:**
- User (Anyone uploading an image)
- System (TellTail web application)

**Triggers:**
- The user uploads an image that is **not a real cat or dog** (e.g., cartoon, stuffed animal, blurry image).

**Preconditions:**
- The system should ideally detect and reject invalid images.

**Postconditions:**
- **Currently, this feature does not work reliably.**

**List of Steps:**
1. The user uploads an image.
2. The system attempts classification.
3. If the image is **not a real pet**, the system may still return a classification instead of rejecting it.

**Notes:**
- **False positives are possible.** The system may incorrectly classify inanimate objects as pets.
- Users should manually verify classification accuracy if results seem incorrect.

# UPDATE 1 - 1/21/25
## Use Cases

### Identifying Breeds
**Actors**

A pet owner or animal shelter

**Triggers**

The pet owner or animal shelter wants to identify what breed and age of dog they have

**Preconditions**

The pet owner or animal shelter does not have any (or minimal) existing information on their dog

**Postconditions**

The program generates a sharable adoption profile containing breed, age, and important information about 
the dog 

**List of steps**

Minimizing false positives

**Extensions/variations**

Cross-platform accessibility, web app/android

**Exceptions**

Offline functionality

--------------------
### Multiple-Pet Detection in a Single Image
**Actors**
User (Pet owner or shelter staff)

System (TellTail application)

**Triggers**

The user uploads an image containing more than one dog or cat.

**Preconditions**

The user has access to the application (web or mobile).

The application is online or in a mode that allows processing images.

The user has a single image with multiple pets (dogs/cats) that they want to classify.

**Postconditions**

The system identifies each pet in the image, classifies them by breed and approximate age, and returns the results to the user.

**List of steps**

The user opens the TellTail application.

The user selects or drags-and-drops the image with multiple pets.

The user clicks the “Analyze” or “Upload” button.

The system processes the image, detects multiple animals, and runs classification on each pet.

The system displays a structured result, showing each pet’s breed, approximate age, and any additional relevant details.

**Extensions/variations**

If there are more than two or three pets, the system will still attempt to identify each one individually.

The user can click on each pet’s result to view a more detailed profile.

**Exceptions**

**E1:** The system fails to detect more than one pet if the animals overlap or the image is blurry. (System might return an error or a single classification.)

**E2:** The image contains animals outside of cats/dogs, leading to a “cannot classify” response for those.

--------------------
### User Feedback for Incorrect Breed Classification
**Actors**

User (Pet owner, shelter staff)

System (TellTail application)

**Triggers**

The user notices the classification (breed or age) is incorrect and wants to correct the system.

**Preconditions**

The user has already uploaded an image and received classification results.

The user can identify the correct breed or has a strong reason to believe the provided classification is wrong.

**Postconditions**

The system receives correct feedback from the user and stores it for future model retraining or fine-tuning.

**List of steps**

The user opens the result page where the model’s classification is displayed.

The user clicks the “Report incorrect classification” or “Provide Correct Breed” button.

The user inputs the correct breed or correct approximate age.

The system saves the provided feedback and acknowledges the user’s correction.

The system updates the database of user feedback, which can be used to retrain or fine-tune the model later.

**Extensions/variations**

The user can provide additional comments or upload extra images for clarity.

The system may display how commonly the classification is reported as incorrect for future improvements.

**Exceptions**

**E1:** The user provides incomplete or nonsensical feedback (e.g., leaves the breed field blank). The system will prompt for valid feedback.

**E2:** The system is offline and cannot record feedback immediately, storing it locally for a future sync.

--------------------
### Sharable Adoption Profile Generation
**Actors**

Shelter Staff / Pet Owner

System (TellTail application)

**Triggers**

The user has just classified a pet and wants to generate a shareable adoption profile.

**Preconditions**

The system has successfully identified the breed and approximate age of the pet.

The user has permission to share the pet’s information publicly or with potential adopters.

**Postconditions**

A shareable adoption profile link or file is generated containing the pet’s breed, age, potential health conditions, and additional info.

**List of steps**

The user views the classification results in the application.

The user clicks “Generate Adoption Profile.”

The system compiles relevant details (breed, age, potential health risks, personality traits if available).

The system creates a formatted profile (web link or PDF) that can be easily shared.

The user can copy the link or download the file to distribute via email or social media.

**Extensions/variations**

The user can customize the profile by adding specific notes about the pet’s behavior or adoption requirements.

The user can attach additional images to the adoption profile.

**Exceptions**

**E1:** The system encounters an error generating the profile (e.g., server issues). It displays an error and suggests the user try again later.

**E2:** The user lacks permission or internet access to share the profile, prompting the user to save it locally first.

--------------------
### Handling Non-Animal or Low-Quality Images (False Positive Prevention)
**Actors**

User (Anyone uploading an image)

System (TellTail application)

**Triggers**

A user uploads an image that may not contain a real, clearly visible cat or dog (e.g., a cartoon, a blurry image, or a photo of a stuffed animal).

**Preconditions**

The system is trained to detect if the image is not a real cat or dog.

The user has access to the app and can upload any type of image.

**Postconditions**

The system detects that the image is not suitable for classification and informs the user that no classification is available or that the content is invalid.

**List of steps**

The user uploads an image that may not contain a real dog or cat.

The system analyzes the image and detects that the subject does not match the criteria for a real pet (i.e., the model confidence is too low or it recognizes it’s not an actual dog/cat).

The system returns a warning or message: “We cannot identify a real cat or dog in this image.”

The user can choose to upload a different image or proceed with no classification result.

**Extensions/variations**

The system might provide a link to guidelines on how to take or select better images.

If the user insists, the system might still attempt classification but tag the results as “low confidence.”

**Exceptions**

**E1:** The system incorrectly classifies an inanimate object as a dog or cat (false positive). This would be mitigated by user feedback or further system checks.

**E2:** The system times out or crashes when processing images of extremely large size or unusual file types, prompting the user to try again with a valid file type.

--------------------
### Health monitoring for dogs/cats
**Actors**

User (can be anyone uploading the image, including but not limited to animal shelters, vet clinics, concerned pet owners, etc.)

**Triggers**

The user uploads an image that contains a real cat or dog that, unbeknownst to the user, has underlying health conditions or may have conditions that could result in future health complications.

**Preconditions**

The provided image shows enough of the animal to the AI model that it can reasonably determine any important health information.
  - For example, if the animal has a condition on its tail that is hidden in the photo, the AI won't be able to see and determine information from this.

**Postconditions**

The health results of the analysis from the AI model are displayed to the user. If there are any potential health conditions, the system will alert the user that their dog or cat may have a condition. If there are no deducible health conditions, then no message/alert will be provided to the user.

**List of steps**

A user wants to check if their dog or cat has any conditions currently.

The user uploads an image of a real dog or cat.

The system (AI models) analyze the image and determine that the dog or cat may have underlying or potential health conditions.

The system completes its analysis of the user's image.

The system returns its analysis and informes the user that their cat may currently have a health condition and also provides important information about any health conditions the dog or cat may be prone to.

**Extensions/variations**

The system can be given additional details should they choose to generate a shareable "adoption profile" for their dog or cat.

**Exceptions**

**E1:** The image contains animals outside of cats/dogs, leading to a “cannot classify” response for those animals.

**E2:** The system encounters an error while trying to determine any potential health conditions. The user is informed after the analysis is complete that there was an error, and the system cannot determine if there are any conditions with the photo provided.

--------------------

### Making well-informed decisions during the adoption process

**Actors**
A potential cat adopter


**Triggers**
An adopter wants to adopt a specific cat but is aware that the cat's breed may be a common breed for deaf cats. They are interested in adopting the cat only if it is not deaf.


**Preconditions**
The potential adopter is somewhat aware of the type of cat they are looking to adopt but would like confirmation from a reliable external resource.


**Postconditions**
The program detects the cat's breed as being prone to deafness. However, the program specifies that not all cats under the breed may be deaf. Given that there is no 100% the cat may be deaf, the potential owner asks the shelter for a vet confirmation of deafness.  


**List of steps**

A potential cat adopter is interested in adopting a cat that could be deaf.

The user uploads a picture of the cat and learns that the breed commonly includes deaf cats, however, not all of them are deaf.

The user is able to make an informed request to a vet to confirm if the cat is deaf. 

**Extensions/variations**
A shelter staff worker could better 

A shelter staff worker could use the application to inform themselves about the cat's attributes and inform others on basic information such as the cat is not 100% likely to be deaf without going past their area of expertise. 


**Exceptions**

**E1:** A vet staff might be given the wrong information through a false positive. This may snowball into feeding potential adopters false information. 

**E2:** 
Given a 98% accuracy goal, there is still a 2% chance the guess could be wrong. There is no clear failure condition as this would be a rare situation where a guess could be wrong.

## Non-functional Requirements

**Usability:** The application interface (both web and mobile) must be intuitive, with clear navigation and user-friendly design. Accessibility features (e.g., alt-text for images, high-contrast color options, and keyboard navigation) should be included to accommodate users with varying abilities.

**Reliability:** The app should accurately provide the correct information on the animal’s breed and age correctly 98% of the time.

**Scalability:** The system must be capable of handling high volumes of image uploads and classification requests without significant degradation in performance. Specifically, it should support at least 20 concurrent uploads and respond to classification requests within 5 seconds on average during peak usage.

## External Requirements

**Error Handling:** 

TellTail must gracefully handle invalid image uploads (e.g., corrupt files, unsupported formats), missing input fields, and unreliable connectivity (e.g., lost internet connection during an upload). For instance, if the user attempts to upload a non-image file, the system should display a meaningful error message and guide the user back to the upload process without crashing.

**Installability/Accessibility:** 

Because TellTail is primarily a web-based application, it must be deployed to a publicly accessible URL ([(e.g., www.tail-tell.vercel.app)](https://tail-tell.vercel.app/)) so that shelter staff and private users can access its functionality. For offline or standalone versions, a clear setup process must be provided to ensure that non-technical users can install the application locally (e.g., an installer or a one-click deploy script).

**Buildability and Documentation:**

All source code (frontend in React/TypeScript, backend in Python with TensorFlow, and the ML models) must be hosted on the team’s GitHub repository with detailed documentation. 

**This includes:**
Build and Run Instructions: Step-by-step instructions explaining how to clone the repository, install necessary dependencies, configure environment variables, and launch both the frontend and backend.

Deployment Guide: Instructions for setting up a new server instance (e.g., Vercel), including how to load and serve the ML model.

Developer Documentation: Clear descriptions of each code module, how they interact, and guidelines for extending features (e.g., integrating additional pet breeds or updating the UI).

TellTail’s core functionality (dog/cat breed identification, approximate age detection, and adoption profile generation) must be developed within the capacity of the existing seven-member team. Each member’s role (frontend, backend, ML model training, project management, etc.) is clearly defined to ensure that the project scope is feasible and can be completed within the given timeframe.

## Team Process Description

### Automated Testing and Continuous Integration (UPDATE 2/21/25)

#### Test-Automation Infrastructure

**Chosen Framework:**
- **Frontend:** Vitest for testing React and TypeScript components.
- **Backend:** PyTorch script-based testing for cat breed classification.

**Justification:**
- **Vitest** is preferred over Jest due to its faster performance and built-in TypeScript support.
- **React Testing Library** complements Vitest by enabling user-centric component testing.
- **Backend testing** uses PyTorch scripts to verify model inference correctness.

**Backend Testing Approach:**
- A PyTorch-based script used to validate the cat breed classification model.
- The script:
  - Loads a trained ResNet50-based model.
  - Applies image preprocessing and transformations.
  - Runs inference on a test image.
  - Maps predictions to cat breed classes.
  - Outputs the predicted breed and confidence score.
  - Displays the image with prediction results.

**Frontend Testing Approach:**
- **Vitest and React Testing Library** are used to test the React components in the frontend, specifically focusing on user interaction, component behavior, and integration with the backend.

- **Testing Components:**
  - **DogDropField**: Tests ensure the `DogDropField` component functions as expected by validating file uploads, ONNX model inference, and UI components such as buttons and loading spinners.
  - **Test Suite**:
    - **Unit Tests**: Ensure individual React components render correctly and handle user interactions (e.g., file uploads, button clicks).
    - **Integration Tests**: Validate that the components work together. For instance, testing that file drops lead to a model prediction and that results are displayed.

- **Test Coverage**:
  - The tests simulate user interactions such as dragging and dropping files, clicking the "Continue" button, and ensuring that results are processed and displayed correctly.
  - **Example Tests**:
    - Verifying if the dropzone correctly handles a file drop and triggers the right state changes.
    - Checking if the "Continue" button appears after a file is uploaded and ensuring it triggers the ONNX model prediction.
    - Testing if the loading spinner shows while the ONNX model is running inference.

- **Mocking Dependencies**:
  - **ONNX Model**: Since the ONNX model is not run directly during testing, we mock the `InferenceSession.create` method and the `run` function to simulate model behavior.
  - **Image Processing**: We mock `createImageBitmap` to avoid the need for actual image processing in tests.

**Adding a New Test:**
- Place test files next to components with the `.test.tsx` suffix for frontend tests.
- Extend backend model testing by adding new validation images and checking classification accuracy.

**Example frontend test:**
```tsx
// src/components/UploadForm.test.tsx
import { render, screen } from '@testing-library/react';
import UploadForm from './UploadForm';

test('renders the upload button', () => {
  render(<UploadForm />);
  expect(screen.getByText(/Upload/i)).toBeInTheDocument();
});
```

### Toolset

**Frontend:**

- [x] **Vite**
- [x] **React**
- [x] **TypeScript**
- [x] **TailwindCSS**
- [ ] **SWC (Speedy Web Compiler)**

Vite is used for ease of development processes. It allows for hot module replacement and quick build times over something like webpack.

React is used for its expansive libraries, reusable componenets, efficient updates to the DOM, and familiarity within our group.

Typescript is used for safer, more predictable code.

Tailwind is used to greatly reduce styling times and increase consistency throughout the application with pre-defined classes.

SWC is used to make build times even quicker for deployment.

**Backend:**

- [x] **Python**
- [x] **Currently based on PyTorch**
- [ ] A tensorflow implementation is in consideration
- [ ] **... and more**

Python is used for its familiarity within our group, its easy-to-understand syntax for collaboration, and its ability to implement our ML Models using PyTorch and/or Tensorflow

Pytorch is used for its intuitive Pythonic syntax and strong debugging.

**Tools and Libraries:**
- [x] **ESLint**
- [x] **MaterialUI**
- [x] **Axios**:
- [x] **dotenv**

ESLint is used to catch errors before build time

Material UI is used for reusable, pre-built, highly customizeable react componenents.

Axios is used to make requests from the frontend to the backend.

dotenv is used for environment variable management.

## External Feedback

**1. After Core Functionality is Demo-Ready (Week 4–5)**

We’ll have a minimal workable solution (image uploads + preliminary classification).

Shelters can provide immediate reactions on whether the workflow makes sense, if they want additional data fields, or if the UI is confusing.

**2. Beta Release (Week 8)**

By this time, we’ll have integrated multiple-pet detection, error handling, and shareable adoption profiles.

Real users can test it with authentic images and offer feedback on accuracy, performance, and usability.

**3. Final Pre-Release (Week 9–10)**

We’ll focus on bug fixes and refining the final product. External feedback ensures no critical oversight remains, especially concerning accessibility or major model failures.

**How we'll get the feedback:**

We'll provide a quick feedback form or short online survey plus an in-app “Report Issue” button for direct user comments on classification accuracy or UI.

We’ll share a secure, public staging link with our possible testers (animal shelters, classmates, friends, family, etc.).

## Schedule

### Week 1: Project Setup and Requirements Finalization

**All Team Members:**

• Clone the repository and confirm local development environment is running.

• Finalize user stories and requirements (no code merges until requirements are confirmed).

• **Milestone:**

*Frontend:* Hello-world React + Vite app compiles without errors.

*Backend:* Python environment with PyTorch or TensorFlow installed and verified.

### Week 2: UI/UX Wireframes & Basic Model Baseline

**Christian** (Backend) & **Zane** (Frontend) & **Nathaniel (Frontend/QA)**:

Get general React website outline committed. This should include the dropdown field and welcome page. 

Create initial deployment to Vercel.

**Raed** (ML) & **Troy** (Data Collection/Evaluation):

Gather initial dataset (e.g., from Kaggle or other sources) and set up data preprocessing pipeline.

Implement a simple baseline model (even if accuracy is low).

• **Milestone:**

A training script that can run end-to-end on a small dataset with at least one classification metric (e.g., 50% accuracy on a test subset).

### Week 3: Frontend-Backend Connectivity & Early Model Testing

**Sam** (Frontend-Backend Connectivity) & **Stephen** (Backend) & **Zane** (Deployment):

Create a minimal API route in Python (Flask or FastAPI) that can accept an image and return a dummy JSON response.

Connect the React frontend to the backend (use Axios to call the dummy endpoint).

• **Milestone:**

React app can upload an image to the backend, and the backend returns a placeholder result (“success” or static classification).

**Raed** & **Troy** & **Christian**:

Start refining the model with initial hyperparameter tuning, gather more data if necessary.

• **Milestone:**

Documented initial training run with updated accuracy or loss metrics.

### Week 4: Basic Classification Integration

**Raed** (ML) & **Stephen** (Backend):

Replace the dummy classification endpoint with a real inference endpoint that uses the CNN model.

• **Milestone:**

The backend returns actual classification results (breed/age) for at least one known dog/cat image with success logs.

**Nathaniel** (ing/QA) & **Zane** (Frontend/Production):

Write initial test scripts (frontend component tests, simple backend tests).

• **Milestone:**

A staging URL where we can upload an image and see actual classification results (even if not accurate yet).

### Week 5: UI/UX Refinement & Accessibility

**Nathaniel** (QA, Frontend) & **Zane** (Frontend):

Incorporate feedback on UI design, ensuring it meets accessibility guidelines (keyboard navigation, color contrasts, alt-text).

• **Milestone:**

Accessible, polished UI with at least one wave of user feedback from the team integrated.

**Raed** (ML) & **Troy** (Data Collection/Evaluation):

Expand dataset to include multiple breeds, ages, and images in different lighting/angles.

Begin implementing mechanisms to detect non-dog/cat images.

• **Milestone:**

Model can correctly handle at least one “not a dog/cat” image and report it as such.

### Week 6: Advanced Features (Multiple-Pet Detection & False Positive Prevention)

**Sam** (Frontend-Backend Connectivity) & **Stephen** (Backend):

Add logic for multiple-pet detection in the backend and a new UI workflow for displaying multiple results.

• **Milestone:**

Uploading an image with 2+ pets returns distinct classifications for each, or a fallback message if detection fails.

**Raed** (ML) & **Troy** (Evaluation) & **Nathaniel** & **Christian** (Backend) (QA):

Evaluate the false-positive prevention approach; gather additional user feedback or test images.

• **Milestone:**

Documented test results with multiple image scenarios, and at least 2–3 test images showing improved detection accuracy.

### Week 7: Sharable Adoption Profiles & Feedback Loop

**Zane** (Frontend) & **Sam** (API) & **Stephen** (Backend):

Implement the feature to generate a shareable adoption profile (link or PDF) from classification data.

• **Milestone:**

A “Generate Profile” button that produces a live link or downloadable file summarizing breed, age, etc.

**Nathaniel** (QA):

Add a “Report Incorrect Classification” workflow and store corrected data (e.g., breed/age) for model retraining.

• **Milestone:**

Users can submit corrections, and these corrections are visible in the backend logs or database.

### Week 8: Performance Optimization & Beta Release

**Raed** (ML) & **Stephen** (Backend) & **Troy** (Evaluation):

Optimize the model for quicker inference and/or higher accuracy, possibly add hardware acceleration.

Evaluate current accuracy with a holdout test set.

• **Milestone:**

Documented accuracy on a standardized dataset (e.g., 80% or above for breed detection).

**Zane** (Production) & **Nathaniel** (QA):

Finalize the first “beta” release on a staging URL or subdomain, collect feedback from external testers (e.g., local shelter staff).

• **Milestone:**

Beta link is available for external users to test, with a simple feedback survey.

### Week 9: Testing & Bug Fixing

**All Team Members:**

Address issues reported during the beta test—UI bugs, classification errors, performance concerns.

• **Milestone:**

A comprehensive bug list is addressed or assigned.

Model is retrained if enough user feedback data justifies it.

### Week 10: Final Release and Documentation

**Zane** (Deployment) & **Sam** (API) & **Christian** (Backend) & **Nathaniel** (QA):

Finalize production deployment to the official URL.

Freeze feature development and polish final UI.

• **Milestone:**

Production site up and running, user documentation (how to upload, interpret results, share profiles) published.

**Raed** (ML) & **Stephen** (Backend) & **Troy** (Evaluation):

Final model evaluations, confirm reliability > 98% on known test data.

Ensure logs and feedback mechanism are stable.

• **Milestone:**

Final documented accuracy metrics.

# Update 2 - 2/4/25
## Software Architecture
**Identify and describe the major software components and their functionality at a conceptual level.**

Our software will follow an "Event Driven"-esque architecture. The major components are as follows:
- An input where the user will initially need to provide some input in the form of an image
- The Pet Detection AI model which analyses the image to determine the dog/cat breed
- Dog/Cat API request (if the user has internet) that gets more information on the pet, including pet background details and health insights
- Output to the user that informs them of the results from the Pet Detector AI

**Specify the interfaces between components.**

1. User Input to Preprocessing: When the user provides an image through the interface, the system invokes a preprocessing module to resize, normalize, and format the image before sending it to the AI model.
* Interface Mechanism: Direct method call within the local system or event-driven messaging to signal completion.
* Data Format: The image is converted into a tensor or another suitable format required by the AI model. 

2. Preprocessing to AI Model: After preprocessing, the image is fed into the Pet Detection AI model for analysis.
* Interface Mechanism: Method invocation or message passing with asynchronous handling.
* Data Format: The AI model expects the preprocessed image as an input tensor.

3. AI Model to API Request: The model identifies whether the image contains a dog or cat and triggers the appropriate API request (if an internet connection is available).
* Interface Mechanism: Internal message bus or direct API call.
* Data Exchange: The model provides a JSON object containing the detected breed.

4. API Response to Output Component: The API fetches additional data, including breed background details and returns it to the system.
* Interface Mechanism: RESTful API with JSON responses.
* Data Handling: The response is parsed and is ready for final output generation.

5. Output to User: The system generates a user-friendly output that includes the detected breed and supplementary details.
* Interface Mechanism: Rendering engine within the application UI.
* Data Format: Displayed as formatted text, images, or interactive elements.

**Describe in detail what data your system stores, and how. If it uses a database, give the high-level database schema. If not, describe how you are storing the data and its organization:**

Our system will store a dataset of 100,000+ images locally/natively within the AI model itself. This dataset is used both for training and for making inferences. The system does not rely on a traditional database for the image data but instead uses a file-based structure that organizes images by category and metadata for efficient access.

**If there are particular assumptions underpinning your chosen architecture, identify and describe them:**

The app works on the basis that the AI model correctly and efficiently communicates back and forth with the front end (user interface). If the user is somehow unable to provide a photo to be examined by the AI model, then there is the app won't be able to work, since the "event" of the image being scanned by the AI cannot be triggered. Additionally, if communication breaks down in any manner (i.e. either the frontend or AI model stops working, communication is slow, etc.), then the core functionality of the program (determining animal breed with the AI model) will break down.

In summary:
- The AI model can efficiently and accurately communicate back and forth with the frotnend.
- The user will always provide valid input (i.e., an image that can be processed).
- An internet connection is assumed to be available when fetching supplementary pet data via the API.
- System performances assumes that communication between components is minimal

**For each of two decisions pertaining to your software architecture, identify and briefly describe an alternative. For each of the two alternatives, discuss its pros and cons compared to your choice.**

1) Layered Architecture
- In this architecture, our project would have layers such as a presentation layer (handling user input/output), a  logic layer (managing interactions with the AI model), and a data layer (interfacing with any local or API-based data storage).
- Pros: Makes it easier to maintain and test individual layers, such as updating the API component without affecting the core AI model.
- Cons: Potential performance overhead due to communication between layers, which could slow down the processing of images and result generation.

2) Microservices Architecture
- This architecture would break down the project into independent services, such as a dedicated image processing service, a pet breed/age detection service, and a separate API fetching service.
- Pros: Greater scalability and flexibility, with independent services that could be updated or scaled without affecting the entire system. For example, the API fetch service could be scaled separately if external data requests increased.
- Cons: Higher complexity in deployment and communication management, as each service would require communication protocols, and monitoring.

Preferably, we would like to go with the layered architecture approach. This allows asynchronous data flow between components, which is critical when handling tasks like image processing and API requests concurrently without delay.

## Software Design

**Component #1: Input**

This component itself consists of many other smaller components, most notably, the drop field component/package that allows the user to enter their image. This component also incorporates a preprocessing unit/module that will be necessary to get more information on the image and prepare it to be sent to the AI model. A portion of this component also boils down to the implementation, which we are planning on working out later down the road (and won't be covered here because it is beyond the scope of the general software architecture).

* Drop Field Interface: Implemented using react-dropzone for handling file uploads with drag-and-drop functionality
* Image Preprocessing Module:
  * Resizes images to 299x299 pixels for model compatibility
  * Normalizes pixel values to the range [-1, 1]
  * Converts images to tensor format
  * Performs basic validation (file type, size, etc.)
* Upload State Management: Uses React state hooks to track upload progress and status

**Component #2: Pet Detection AI**

Our AI model will be built based on the PyTorch library (in Python), which will be used for developing and training our AI. The PyTorch library provides a plethora of tools and built-in modules within itself that will be extremely useful for creating accurate models.

Additionally, our AI is built as a multi-model architecture, meaning that the AI itself is broken down into a series of models.

1. YOLO Model (pre-existing object detection AI model that narrows the image down to the specific animal, reducing noise
2. Dog/Cat Identifier Model (Binary classification AI model that determines whether the animal is a dog or cat)
3. Breed Identifier Models (AI models that determine what breed the animal is, based on what animal was provided)

These models act as a "pipeline" that the image is passed through, progressively classifying the image and passing down the image with the new information to the next model in order to ensure maximize accuracy. Each animal also has their own decicated AI model for the breed identifier. For example, if the AI determines that it is seeing a dog, then the image will be passed into the Dog Breed AI only (not the Cat Breed AI), and vice versa.

**Component #3: API**

The API component handles both the retrieval and passing on of information from the API. For our API component, we will be using the Axios library/framework. Axios helps simplify down fetch requests to APIs to streamline the process of retrieving information, which streamlines the development process for our app and allows the app to run more efficiently. Based on whatever information it is passed from the AI (whether it is a dog/cat), it will call the correct corresponding API ("The Dogs API" or "The Cats API", both from APINinjas) to retrieve information using Axios.

* Request Handling:
  * Configures endpoints for both cat and dog APIs
  * Manages API keys securely using environment variables
  * Implements rate limiting and error handling

* Data Processing:
  * Formats API responses into a consistent structure
  * Merges breed info with model predictions

**Component #4: Output**

The output follows the same logic as the input component, consisting of many smaller components/packages. As mentioned above, the output effectively acts as the gatherer of information from the AI and API components.

* Data Aggregation:
  * Combines AI model predictions with API breed information
  * Formats health insights and breed characteristics
  * Generates confidence metrics for display

* UI Components:
  * Profile generation module
  * Results display with breed details
  * Shareable link generation
  * PDF export functionality

## Coding Guidelines

**React (JSX/TSX)**: Rules of React (https://react.dev/reference/rules)
- We are choosing to use this guideline for React because it is the official rules from React itself that mandate certain conventions. React specifies that components and "hooks" (a special type of reusable UI logic in React) must be "pure" (consistent and predictable in what they return, and immutable outside of their original context). React specifies that components and hooks should be called only within the JSX context, not calling their functions directly. React hooks should also only be called from React functions (not regular JS functions) and used at the top level of any React function. These guidelines should _always be implemented while developing in React_, but we will still to examine our code weekly in order to check these guidelines are being followed in React and fix any violations of these guidelines as needed. We will do weekly code reviews to ensure that it follows the guidelines.

**TypeScript**: TypeScript Documentation (https://www.typescriptlang.org/docs/handbook/intro.html)
- We are choosing to use these guidelines because they come from the official website of TypeScript which was created by Microsoft (the original developers of TypeScript). Guidelines include: strict adherence to TypeScript’s static typing system, avoiding the any type where possible, and proper use of type guards and type inference. We plan to use the same enforcement of guidelines policy as we are React, where we should be expected to be refering back to these standards as we are implementing and developing in TypeScript, as well as examining our code weekly in order to ensure it meets the guidelines.

**PyTorch (Python)**: PEP8 (https://peps.python.org/pep-0008/)
- We are choosing to use PEP8 as our guidelines for development in PyTorch. PyTorch already utilizes a software called Flake8, which enforces the PEP8 coding style when programming in PyTorch anyways. PEP8 is already the official style guide for Python, and given the fact that PyTorch already enforces this through Flake8, it follows that we will use the PEP8 style. All of the code created for this project pass through and first be checked by Flake8, ensuring that it adheres to PEP8's standards and conventions.

## (Updated) Process Description

### i. Risk Assessment
| **Risk**                          | **Likelihood** | **Impact** | **Evidence**                                                                 | **Mitigation Steps**                                                                                               | **Detection Plan**                                                                                                  | **Mitigation Plan**                                                                                                 |
|-----------------------------------|----------------|------------|--------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| **API Rate Limits**               | Medium         | High       | The APIs we use have documented rate limits, which may be triggered during heavy usage.          | Implement request throttling and cache responses to minimize excessive API calls.                                 | Monitor API response codes (e.g., HTTP 429 Too Many Requests) using logs and automated alerts.                      | Switch to backup APIs or locally cache breed-related data for commonly requested breeds if the API fails.            |
| **Model Inaccuracy**              | Medium         | High       | Preliminary tests show model accuracy varies based on image quality and breed diversity.          | Continuously retrain and validate the model on diverse datasets, improve preprocessing (e.g., image augmentation). | Monitor prediction confidence metrics during inference and flag low-confidence predictions.                         | Allow fallback prompts for user confirmation of ambiguous results or request additional user-provided images.       |
| **Insufficient Test Coverage**    | Medium         | Medium     | There have been instances in previous projects where testing was not comprehensive enough, leading to missed bugs and integration issues during later stages of development.           | Enforce unit test development alongside code implementation, aim for at least 85% code coverage.                   | Use automated test coverage tools (e.g., Pytest coverage) and conduct regular code reviews focused on test cases.   | Address uncovered code areas before moving to integration testing or deployment.                                    |
| **File Upload/Processing Errors** | Low            | Medium     | User-uploaded files may be of unsupported types or fail during preprocessing.                     | Validate files (type, size, resolution) before processing and provide clear error messages to users.                | Track upload events and errors using frontend logging and server-side monitoring.                                   | Provide retry mechanisms for failed uploads and suggest corrections to the user.                                    |
| **Team Availability Issues**      | Low            | High       | Conflicts in team member availability have delayed previous projects during critical phases.      | Schedule regular progress meetings and assign backup members for critical tasks.                                   | Maintain an updated schedule in project management tools (e.g., Trello) and monitor task progress weekly.           | Reallocate tasks or adjust deadlines based on team availability or workload.                                        |

### ii. Project Schedule

| Milestone | Tasks (1-person-week each) | Dependencies |
|-----------|---------------------------|--------------|
| Requirements Phase | - Finalize feature list<br>- Finalize use cases<br>- Confirm tech stack | None |
| Design Phase | - Define data flows <br> - Wireframes for UI<br>-  Define architecture and software components<br>- Create baseline code for next phase | Requirements Phase completed |
| Development | **Frontend**<br>- Basic layout, routing, navigation, and user input forms<br>- UI validations and error checks<br>- Implement image upload and preprocessing<br>**Backend**<br>- Data modeling and API endpoints<br>- Implement API fetch logic with Axios<br>**AI/ML**<br>- Model selection<br>- Model training<br>- Model integration<br>- Implement multi-model pipeline | Design Phase completed |
| Integration and Testing | - Integrate all components (frontend, backend, AI)<br>- Build automated test suites (unit, integration)<br>- Test interaction between all components\n- Resolve all available bugs (cross module, etc.) | All core development tasks must be complete |
| Usability Testing and Refinement | - Conduct user tests and surveys<br>- Triage and implement UI/UX improvements<br>- Improve training data based on feedback | Integration Testing completed |
| Final Release | - Deploy production version<br>- Monitor system performance<br>- Publish final documentation | Usability Testing completed |

## Timeline Overview
- Requirements Phase: 1 week
- Design Phase: 2 weeks
- Development Phase: ~5 weeks (concurrent development possible)
- Integration and Testing: 2 weeks
- Usability Testing: 1 week
- Final Release: 1 week

### iii. Team Structure
| **Team Member**      | **Role**                | **Responsibilities**                                                                 |
|---------------------|-------------------------|--------------------------------------------------------------------------------------|
| Project Manager     | Oversees project        | Scheduling tasks, monitoring progress, and resolving roadblocks.                     |
| Frontend Developer  | Implements UI           | Handles image uploads, user interface design, and output display.                    |
| Backend Developer   | Implements logic        | Implements AI models, API integration, and data processing logic.                    |
| Tester              | Ensures test coverage   | Develops and runs unit tests, system tests, and tracks issues in GitHub.             |
| Documentation Lead  | Manages documentation   | Prepares user manuals, developer guides, and internal documentation.                 |

### iv. Test Plan & Bugs
**Aspects to Test:**
- **Input Validation:** Test image upload, preprocessing, and validation mechanisms (e.g., supported file types, resolution checks).
- **AI Model Accuracy:** Test model predictions across a diverse set of breeds.
- **API Response Handling:** Test API request/response consistency and error-handling mechanisms.

**Strategies:**
- **Unit Testing:** Verify individual components using Python unit tests and React component tests.
- **System (Integration) Testing:** Ensure that all components work together as expected by testing end-to-end use cases.
- **Usability Testing:** Gather feedback from users on system ease of use and interface design.

**Bug Tracking:**  
We will use **GitHub Issues** to document, prioritize, and address any bugs discovered during development and testing.

### v. Documentation Plan
**Planned Documentation:**
- **User Guide:** Describes how users can upload images, understand results, and troubleshoot common issues.
- **FAQs:** An FAQ page to help answer common pain points for users
- **Developer Guide:** Explains system architecture, key components, and setup instructions.
- **API Documentation:** Provides details on API endpoints, request/response formats, and rate limits.
- **Test Reports:** Documents test results and coverage.
- **Wiki:** Collaborative internal resource for team updates and technical discussions.

# Update - 2/18/25
## Project Implementation and Documentation

## 1. Project Progress ✅
- Contribution to GitHub repository ✅ - Team Process Description outlines GitHub usage, testing and CI best practices.
- Version control and CI usage ✅ - Covered in Risk Assessment. 
- Code testing, comments, and reviews

## 2. User Documentation ✅
### High-Level Description ✅ - Covered in Abstract and Goal. They both provide a high-level overview of the system and why users would use it.
- Overview of system functionality 
- Why users would use it

### Installation Instructions ✅
- **Prerequisites and dependencies:**
  - Node.js (v18+)
  - Python (v3.8+)
  - ONNX Runtime
  - Git
  - PyTorch
  - A modern web browser (Chrome, Firefox, Edge)

- **Step-by-step installation guide:**
  1. Clone the repository:
     ```sh
     git clone https://github.com/HackerManOSU/TailTell.git
     cd TailTell
     ```
  2. Install frontend dependencies:
     ```sh
     cd frontend
     npm install
     ```
  3. Install backend dependencies:
     ```sh
     cd ../backend
     pip install -r requirements.txt
     ```

### Running the Software 🎯
- Navigate to our site's webpage https://tail-tell.vercel.app/
- Click on either the dog or cat depending on which you plan to upload
- Click upload and then select which image you want to upload

### Using the Software ✅ - Covered in Use Cases where the section describes workflows for uploading images, viewing results, and generating adoption profiles.
- Uploading images
- Viewing classification results
- Generating adoption profiles

### Reporting Bugs and Feature Suggestions ✅
- **How to submit issues or suggestions:**
  - Go to [GitHub Issues](https://github.com/HackerManOSU/TailTell/issues).
  - Click **New Issue**.

- **If reporting a bug, be sure to include:**
  - Steps to reproduce the bug
  - Expected vs. Actual results
  - Screenshots (if applicable)
  - Browser and device info 

- **If suggesting a feature, be sure to:**
  - Mark your issue as an **enhancement**
  - Justify why this feature would be helpful

    
### Most Known Bugs & Work in Progress are ✅ - Covered in Risk Assessment, on-functional Requirements, and Work-in-Progress Features sections. They list current limitations and ongoing developments.
- List of current limitations 
- Features still under development 

### Bugs not covered in Risk Assessment 
- Sometimes onnxruntime-web can break randomly, causing the user to reupload their image. 
- Some issues with prediction stability may be due to browser type. We are currently trying to 
  replicate this issue with different browsers. 
- Currently, the website's mobile navbar can be clip with other website elements

## 3. Developer Documentation 
### Obtaining the Source Code ✅ - Covered in Git Repository Link and project Setup sections. They explain how to clone and access the code.
- Repository and submodules setup

### Directory Structure ✅ - The Software Architecture section describes major folders and their purposes. This information is also found in the README with a full project tree.
- Explanation of folders and files

### Building the Software 🎯
- Build system and setup instructions

- **For locally building the app :**
  - In tailtell/frontend: `npm run dev` (runs Vite)
  - Navigate to `localhost:5173/` on your browser.

- **For building the app to be pushed to deployment:**
  - First insure that your build works locally!

  - Build and push the app to the GitHub:
    - Fetch and merge all updates from other developers: `git pull origin main`
    - Stage all updated files:  `git add <filename>`
    - Commit all files with a descriptive message: `git commit -m <message>`
    - Push these changes to the GitHub repo: `git push`

  - After pushing, GitHub actions should **automatically** build the app for you, assuming the code is functional. Again, make sure your build works locally before deploying!

### Testing the Software ✅
- **Running test cases:**
  - Frontend: `npm test`
  - Backend: `pytest tests/`
- **Accessing data sources:**
  - Ensure correct environment variables are set in `api.env` for API keys and endpoints. 

### Adding New Tests 🎯

**Naming Conventions Tests**

Functional Tests: should be expected behavior followed by context

Example: 
The test should check that the application can identify a dog breed when a valid image is uploaded

Performance Tests: should be performance goal followed by context 

Example : 
The test should ensure that the app responds in under five seconds when an image is uploaded

User Experience Tests: should be user action followed by the expected result

Example: 
The test should verify that an error message is displayed when an invalid file type is uploaded

**Test Harness**

Test Runner: Frontend and backend tests and reports on performance
What we will use: npm test (frontend), pytest (backend)

End to End Testing: Test the application from a user perspective, showing that all of the components work together.
What we will use: Cypress

Continuous Integration: Implement CI to run tests automatically on code updates.

By establishing naming conventions and an extensive test harness, TellTail can be reliable and at the quality we are looking to provide. These tests give us the confidence to best help shelters and pet owners alike. 

### Building a Release ✅
- All tasks with regards to building (and deploying) are already automated using Vercel and GitHub actions.
- As of right now, we are not employing the version number system until we have a full usable beta release (v1.0.0 in GitHub). Our version numbers for releases will be incremented according to the rules of "Semantic Versioning" (see the following article from GeeksForGeeks: https://www.geeksforgeeks.org/introduction-semantic-versioning/), so this should be refered back to on a case-by-case basis when updating the version number for releases.
- **Sanity checks after building a release:**
  - Scan and click through all links in the app/website to ensure everything is functioning as intended.
  - Check the Cat AI model with any test image(s) to ensure it is working without issues.
  - Check the Dog AI model with any test image(s) to ensure it is working without issues. 
  - Check for any warnings and ensure they are avoidable before deploying. 

# Update - 2/21/25
## Our Test Automation and CI Plan
As part of our test plan, we will be using the following test-automation infrastructure:

**Frontend Testing:**
- Vitest (and @testing-library/react and @testing-library/user-event to run the tests)
- Justification: This allows for easy integration into our Vite development server, it has ESM support, 
- New tests can be added to the code base by creating a component in the same directory as the code you want to test and append it with .test.tsx.

  _Example:_ We want to test Component.tsx, so in the same folder, we make a file called Component.test.tsx

### **Backend Testing:**
- **Jest** (with `supertest` for API endpoint testing)
- **Justification:** Jest provides a fast, feature-rich testing framework that integrates well with Node.js. `supertest` allows us to test API endpoints efficiently.
- **Adding New Tests:** New tests can be added by creating a `.test.ts` file inside the `tests/` directory, structured similarly to the backend route handlers.

### **Our CI Service and Repository Integration:**
**Our CI service and how the repository is linked:** For our CI service, we opted to move forward with Vercel and GitHub Actions. Vercel integrates with GitHub Actions to automatically recompile the app when any changes are made to the GitHub repo. The primary reason that we chose to use Vercel is that it automatically and seamlessly handles both Continuous Integration (on top of the tests we've already developed) and Continuous Deployment when used with GitHub actions, providing us a full CI/CD pipeline. This means that whenever we push to the TailTell repo, we can almost instantly view the changes in the real app, not just our local version.

  As a part of the CI/CD pipeline, when npm run build is ran by Vercel (on pushes), npm run test is run as a part of it, which is the command for running vitest. This means if the tests fail, so will the build, and it will not push to production. The failue will be logged in the Vercel logs to help resolve the issue.

**Why we chose Vercel:** We chose Vercel because it integrates seemlessly and easily with Github and we have experience using it in the past.

### **3 Other CI Services We Considered:**
#### **1. GitHub Actions (Standalone CI/CD Without Vercel)**
- **Pros:** Native to GitHub, highly configurable, integrates well with Docker.
- **Cons:** Requires additional setup for deployment, compared to Vercel’s built-in pipeline.

#### **2. Travis CI**
- **Pros:** Well-established, easy configuration with `.travis.yml`, supports multiple languages.
- **Cons:** Slower build times compared to GitHub Actions, limited free tier for private repos.

#### **3. CircleCI**
- **Pros:** Highly customizable, supports parallel builds, integrates with various deployment platforms.
- **Cons:** More complex configuration, steeper learning curve.

### **Tests Executed in a CI Build:**
- **Unit tests** (Frontend via Vitest, Backend via Jest)
- **Integration tests** (API tests via `supertest`)
- **End-to-end tests** (Planned for future using Cypress)

### **Development Actions That Trigger a CI Build:**
- Any push to the repository triggers a CI build.
- Pull requests to main branches also trigger tests.
- Changes in a branch can be tested via GitHub Actions before merging.
  
**The tests that will be executed in a CI build are:**  
- Unit tests  
- Integration tests  
- API tests  
- End-to-end tests (planned for future implementation)  

**Which development actions trigger a CI build:**  
Any pushes to the repository (regardless of their nature) will trigger the CI system (GitHub Actions + Vercel). Each push initiates a build process, and as part of `npm run build`, the `npm run test` command (Vitest) is executed. If tests fail, the build is halted, preventing deployment to production.

## **Reflections**

### **Zane**
1.
2.
3.

### **Nathaniel**
1.
2.
3.

### **Sam**
1.
2.
3.

### **Raed**
1.
2.
3.

### **Christian**
1. Project planning and requirements eclitation was one of the most important guiding factors for designing our product. It was super helpful looking back to have a clear vision for what we wanted to accomplish and the "use cases" that our product would be used for.
2. Gained a better understanding of basic React concepts and scripting, as well as how to integrate TailwindCSS into frontend developement.
3. Doing a little bit of research before deciding topics is important. Not just whether you know the high level idea, but how confident you would feel with actually implementing and programing the idea.
4. Communication works best when there is a good mix of in-person meetings and group chat messages. I thought that we did a pretty good job at balancing the two, which helped everyone have a good idea for the sections that people were working on (especially in the early stages of the project).

### **Stephen**
1.
2.
3.

### **Troy**
1. Learned how ResNet50 and ONNX Runtime optimize deep learning model inference for efficient image classification.  
2. Gained experience with TailwindCSS for utility-first styling and TypeScript for type-safe frontend development.  
3. Developed a strong understanding of classification in machine learning, including feature extraction and model evaluation.  

