// db/connection.js
import knex from "knex";
import config from "../knexfile.js"; // Make sure to include `.js`

const db = knex(config.development);
export default db;
