import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema.js"; // Import the schema you created earlier
import config from "../config.js";

// 1. Initialize the raw SQLite database file.
// If 'sqlite.db' doesn't exist, better-sqlite3 will automatically create it for you.
const sqliteClient = new Database(config.dbUrl);

// 2. Wrap the client with Drizzle and inject your schema
export const db = drizzle(sqliteClient, { schema });

// Senior Tip: Exporting the client instance can be helpful if you ever need to
// run raw, non-Drizzle commands, or safely close the connection on server shutdown.
export { sqliteClient };
