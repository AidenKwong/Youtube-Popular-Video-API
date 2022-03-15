const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DATABASE,
  password: process.env.PSQL_PASSWORD,
  port: process.env.PSQL_PORT,
});

const insertData = async () => {
  const response = await pool.query(
    `INSERT INTO Persons (FirstName,LastName)  VALUES ('test','${new Date()}')`
  );
  const data = await pool.query("SELECT * FROM Persons");
  console.log(data);
};

insertData();
