require("dotenv").config({ path: "../.env" });
const mysql = require("mysql2/promise");

console.log(process.env.DB_USER);

const pool = mysql.createPool({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "express1",
  multipleStatements: true, // This is explicitly enabled to make the application vulnerable and execute more than one query at a time.
  // Without the above statement is also vulnerable but the payload must be such that it is a single query.
  // Multiple condition example: ' OR '1'='1' here first check is over and then the next check is beingexcuted maliciously but as it still a single statement it won't need the multipleline: true statement
});

module.exports = pool;
