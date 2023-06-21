import { Pool } from "pg";
import "dotenv";

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
//{ connectionString: process.env.POSTGRES_URL }

export default pool;