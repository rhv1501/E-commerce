import { Client, Storage, ID } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

const requiredEnvVars = {
  APPWRITE_ENDPOINT: process.env.APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID: process.env.APPWRITE_PROJECT_ID,
  APPWRITE_API_KEY: process.env.APPWRITE_API_KEY,
  APPWRITE_BUCKET_ID: process.env.APPWRITE_BUCKET_ID,
};

// Check for missing environment variables
const missingVars = Object.entries(requiredEnvVars)
  .filter(([key, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error("❌ Missing Appwrite environment variables:", missingVars);
  console.error(
    "Please check your .env file and ensure these variables are set:"
  );
  missingVars.forEach((varName) => console.error(`  - ${varName}`));
  process.exit(1);
}

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const storage = new Storage(client);

console.log("✅ Appwrite client initialized successfully");
console.log(`📁 Bucket ID: ${process.env.APPWRITE_BUCKET_ID}`);

export { storage, client, ID, InputFile };
