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

INSERT INTO authors (name, bio) VALUES
('Fotih Duman', '1987 Turkiyaning Sarkisla tumani Sivas shahrida tug`ilgan.'),
('Fyodor Dostoevsky', 'Fyodor Mikhailovich Dostoevsky was a Russian novelist, short story writer, essayist and journalist.');


INSERT INTO authors (name, bio) VALUES
  ('J.K. Rowling', 'British author, best known for writing the Harry Potter series.'),
  ('George Orwell', 'English novelist and essayist, journalist and critic.'),
  ('J.R.R. Tolkien', 'English writer, best known for The Lord of the Rings and The Hobbit.'),
  ('Agatha Christie', 'English writer of novels, short stories, and plays, best known for her detective novels.'),
  ('Isaac Asimov', 'American writer and professor of biochemistry, best known for his works of science fiction.');

SELECT * FROM authors

INSERT INTO books (title, author_id, published_year) VALUES
('MEN', 1, 2024),
('2022', 1, 2022),
('Joniyat va Jazo', 2, 1866),
('Stepanchikov qishlog`i va uning axolisi', 2, 1859) RETURNING *;