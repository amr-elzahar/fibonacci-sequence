CREATE DATABASE fibonacci;

\c fibonacci

CREATE TABLE fibonacci (
  id SERIAL PRIMARY KEY,
  index INTEGER UNIQUE,
  value BIGINT
);