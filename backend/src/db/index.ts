import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from './schema';
import { ENV } from "src/config/env";

if (!ENV.DATABASE_URL) {
    throw new Error('Database url is not set in env var');
}

// initialize PostgreSQL connection pool
const pool = new Pool({ connectionString: ENV.DATABASE_URL });

// log when first connection is made
pool.on("connect", () => {
    console.log("Database connected successfully ✅");
});

pool.on('error', (err) => {
    console.error("💥 Database connection error:", err);
});

export const db = drizzle({ client: pool, schema });

// what is Connection pool
// a connection pool is a cache of database connections that are kept open and reused,

// why use if 
// Opening/Closing connections is slow. Instead of creating a new connection for each request we reuse existing one
// Databases limit concurrent connections, A Pool manages a fixed number of connections and shares them across requests.
