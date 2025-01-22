## Team info
### Roles and Justification (Updated 1/21/25)

**Zane:** Project management, frontend, hosting/building/production

**Justification:** Zane has extensive experience working on frontend projects, so he is working on that, while also handling all of the setup, build, and deployment processes.

**Raed:** Machine learning model training and optimization

**Justification:** Raed is the most well-versed in machine learning and training models so he is granted this task. The core functionality of TellTail depends on accurate breed and age detection, making ML expertise pivotal.

**Sam:** Frontend-Backend connectivity

**Justification:** Sam has experience with front end in other languages as well as limited experience with back end. This makes tying the two parts together a great role. Limited experience with model training, but open to learning in order to contribute as much as possible.

**Christian:**  General backend development, Machine learning

**Justification:** Christian has interest in learning more about machine learning and AI models, and has the most prior experience working with languages that better suit the backend. Also provides the flexibility to assist with any issues that arise on the backend.

**Troy:** Data collection and model evaluation

**Justification:** Troy has interest in ML and AI. High-quality data is the lifeblood of a successful ML model, and continuous evaluation ensures the model remains accurate over time.

**Stephen:** General backend development

**Justification:** Having someone who can work all over and help whereever necessary on the backend is important as we may need someone helping on different tasks on different days.

**Nathaniel:** Frontend, testing, QA

**Justification:** Nathaniel has more interest working in the frontend than the backend. Testing and assuring good quality code is being written is highly important when working in teams.

### Relevant Artifacts

**Git Repository:** https://github.com/HackerManOSU/TailTell

**Trello Board:** https://trello.com/invite/b/678fef5875a0c1cf4c20d2d3/ATTIa3cef6556fd5a8168ed7e16848f803bcA3BF05A9/cs-362-group-15-project-board

### Communication

**Main Channel:** Texting Groupchat

## Product description 

**Abstract:**
The website TellTail/FurFetcher, created by Sam Neale, Raed Kabir, Christian DeVore, Nathaniel White, Stpehen Tsui, Troy Diaz, and Zane Garvey, is an AI-powered tool designed to assist animal shelters in identifying the breed, approximate age, and potential health conditions of dogs and cats from an uploaded image. The website uses a custom machine learning model, trained on diverse datasets to provide accurate and effective insights. This website has the ability to give both private users and commercial shelters the ability to save time and resources in finding the answers they need.

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
- [] **... and more**

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

**Nathaniel** (Testing/QA) & **Zane** (Frontend/Production):

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
