import PG from "pg";
const db = new PG.Pool({
    max: 10,
    connectionString: process.env.DATABASE_URL
});
export default db;
