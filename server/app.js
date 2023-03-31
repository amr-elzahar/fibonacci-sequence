const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
});

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));

function calculateFibonacci(index) {
  if (index <= 1) {
    return 1;
  } else {
    return calculateFibonacci(index - 1) + calculateFibonacci(index - 2);
  }
}

app.post("/fibonacci/:index", async (req, res) => {
  // Extracting the requested fibonacci sequence index
  const index = parseInt(req.params.index);

  // check if the current index value exists in the fibonacci table already
  const result = await pool.query(
    "SELECT value FROM fibonacci WHERE index = $1",
    [index]
  );

  // If it exists, return its corresponding value
  if (result.rows.length > 0) {
    const { value } = result.rows[0];
    return res.status(200).send({ index, value });
  }
  // If it does not exist, calculate its value using a helper function and insert both the index and value into the table
  else {
    const value = calculateFibonacci(index);
    await pool.query("INSERT INTO fibonacci (index, value) VALUES ($1, $2)", [
      index,
      value,
    ]);

    return res.status(200).send({ index, value });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App running on port ${port}`));
