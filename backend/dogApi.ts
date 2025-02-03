import axios from 'axios';

// Placeholder for API key, add this to .env file 
const DOG_API_KEY = process.env.DOG_API_KEY || 'your-dog-api-key';
const DOG_API_BASE_URL = 'https://api.thedogapi.com/v1';

// Function to get a list of dog breeds
export const getDogBreeds = async () => {
  try {
    const response = await axios.get(`${DOG_API_BASE_URL}/breeds`, {
      headers: {
        'x-api-key': DOG_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching dog breeds:', error);
    throw error;
  }
};

// Function to search for a dog breed by name
export const searchDogBreed = async (breedName: string) => {
  try {
    const response = await axios.get(`${DOG_API_BASE_URL}/breeds/search`, {
      headers: {
        'x-api-key': DOG_API_KEY,
      },
      params: { q: breedName },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching for dog breed:', error);
    throw error;
  }
};
