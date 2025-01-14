## Team info
### Roles
**Zane:** Project management, frontend, hosting/building/production

**Raed:** Machine learning model training and optimization

**Sam:** Frontend-Backend connectivity

**Christian:** UI/UX design, accesibility 

**Troy:** Data collection and model evaluation

**Stephen:** General backend development

**Nathaniel:** Frontend, testing, QA

### Relevant Artifacts

**Git Repository:** https://github.com/HackerManOSU/TailTell

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

**Risks:**
The biggest risk of our project is incorrectly training the model. If we go about training the model incorrectly then we end up with a website that doesn't do its job correctly. More importantly the website might hurt the user by leading them to believe something that doesn't match reality. Training the model correctly is the most important part of our project and if we don’t give it enough information or incorrect information then we risk ruining the whole project. We plan on avoiding this by testing our model repeatedly until we are fully confident in its abilities. 

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
