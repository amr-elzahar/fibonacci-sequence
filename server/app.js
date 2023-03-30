const express = require("express");
const redis = require("redis");
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

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.on("error", () => {
  console.log("An error occured");
});

redisClient.on("connect", () => {
  console.log("SUCCESSFULLY CONNECTED");
});

redisClient.connect();

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

  // check if the current index value exists in redis chach already
  const keyExists = await redisClient.get(index.toString());

  // If it exists, return its corresponding value from redis
  if (keyExists) {
    const value = await redisClient.get(index.toString());
    return res.status(200).send({ index: value });
  }
  // If it does not exist, calculate its value using a helper function and insert both the index and value into the table and redis chach
  else {
    const value = calculateFibonacci(index);
    await pool.query("INSERT INTO fibonacci (index, value) VALUES ($1, $2)", [
      index,
      value,
    ]);

    await redisClient.set(index.toString(), value);

    return res.status(200).send({ index, value });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App running on port ${port}`));
