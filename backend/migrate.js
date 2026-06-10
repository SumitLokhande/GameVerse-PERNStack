// Migration script for initializing the database schema
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pkg from "pg";

const { Pool } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

// connect to the database and read the schema.sql file and
// execute the SQL commands to create the tables in neon database
async function runMigrations() {
  const client = await pool.connect();

  try {
    console.log("Running database migrations...");

    // Read the SQL schema file
    const schemaPath = path.join(__dirname, "config", "schema.sql"); // SQL file Path
    const schemaSql = fs.readFileSync(schemaPath, "utf-8");

    // Execute the SQL commands
    await client.query(schemaSql);

    console.log("Database migrations completed successfully.");
    console.log("tables created:");
    console.log("- users");
  } catch (err) {
    console.error("X Migration Failed:", err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigrations();
