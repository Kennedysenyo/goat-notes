import { drizzle } from "drizzle-orm/postgres-js";
import dotenv from "dotenv";
import postgres from "postgres";

dotenv.config({ path: ".env.local" });

const client = postgres(process.env.DATABASE_URL!);

export const db = drizzle(client);
