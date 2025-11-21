import mysql from "mysql2/promise";

let pool;

if (!global.pool) {
  global.pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,  // <-- Port add kiya
  });
}

const db = global.pool;
export default db;
