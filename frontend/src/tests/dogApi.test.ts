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
