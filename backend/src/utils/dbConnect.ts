import { Pool } from "pg";

require("dotenv").config();

const PORT = process.env.PORT || 5000;

export let pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT),
});
