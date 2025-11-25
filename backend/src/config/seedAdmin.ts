import { seedAllData } from "./seedData";

export const seedAdmin = async () => {
  try {
    // await seedAllData();
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  }
};
