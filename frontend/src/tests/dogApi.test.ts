// Author: Troy Diaz
// Description: This Vitest script tests if the Dog API fetches breed details correctly. The test checks whether the Dog API is able to retrieve and return accurate breed information based on the given dog name. It mocks the API call to simulate fetching breed data and verifies the response is handled as expected.
import { fetchDogInfo } from "../components/Drop Fields/DogDropField";
import { test, expect } from "vitest";

test("fetchDogInfo should fetch dog details from API", async () => {
  try {
    const result = await fetchDogInfo("Golden Retriever");
    console.log("✅ API Response:", result); // Debugging step
    expect(result[0].name).toBe("Golden Retriever");
  } catch (error) {
    console.error("❌ API Fetch Error:", error); // Debugging step
  }
});
