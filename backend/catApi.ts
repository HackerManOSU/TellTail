import axios from 'axios';

// Placeholder for API key, add this to .env file 
const CAT_API_KEY = process.env.CAT_API_KEY || 'your-cat-api-key';
const CAT_API_BASE_URL = 'https://api.thecatapi.com/v1';

// Function to get a list of cat breeds
export const getCatBreeds = async () => {
  try {
    const response = await axios.get(`${CAT_API_BASE_URL}/breeds`, {
      headers: {
        'x-api-key': CAT_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cat breeds:', error);
    throw error;
  }
};

// Function to search for a cat breed by name
export const searchCatBreed = async (breedName: string) => {
  try {
    const response = await axios.get(`${CAT_API_BASE_URL}/breeds/search`, {
      headers: {
        'x-api-key': CAT_API_KEY,
      },
      params: { q: breedName },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching for cat breed:', error);
    throw error;
  }
};
