CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    bio VARCHAR
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    author_id INT REFERENCES authors(id) NOT NULL,
    published_year INT NOT NULL
);