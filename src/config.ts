import { configDotenv } from "dotenv";

configDotenv();

type Config = {
  dbUrl: string;
};

const config: Config = {
  dbUrl: envOrThrow("DB_FILE_NAME"),
};

function envOrThrow(key: string): string {
  if (!process.env[key]) {
    throw new Error(`Fatal Error. Environment variable ${key} is missing`);
  }
  return process.env[key];
}

export default config;
