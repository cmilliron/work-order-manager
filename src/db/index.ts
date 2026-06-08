import config from "src/config";
import { drizzle } from "drizzle-orm/libsql";

export const db = drizzle(config.dbUrl);
