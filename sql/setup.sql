-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP table if exists authors;

CREATE table authors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  dob DATE,
  pob VARCHAR
);

INSERT INTO authors (name, dob, pob) VALUES 
('Alexander Humplebump', '1947-06-16', 'Alexandria, VA, USA'),
('Neil Gaiman', '1960-11-10', 'Portchester, Hampshire, England'),
('Jane Austen', '1775-12-16', 'Steventon Rectory, Hampshire, England'),
('Margaret Atwood', '1939-11-18', 'Ottawa, Ontario, Canada'),
('J. R. R. Tolkien', '1892-01-03', 'Bloemfontein, Orange Free State'),
('Brandon Sanderson', '1975-12-19', 'Lincoln, Nebraska, U.S.'),
('Terry Pratchett', '1948-04-28', 'Beaconsfield, Buckinghamshire, England'),
('David Halliday', '1916-03-03', 'Maple Falls, Washington'),
('Robert Resnick', '1923-01-11', 'Pittsburgh, Pennsylvania');

DROP table if exists books;

CREATE table books (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR NOT NULL,
  released INTEGER
);

INSERT INTO books (title, released) VALUES 
('Good Omens', 1990),
('The Handmaid''s Tail', 1985),
('Pride and Prejudice', 1813),
('The Hobbit', 1937),
('The Fellowship of the Ring', 1954),
('The Two Towers', 1954),
('The Return of the King', 1955),
('Elantris', 2005),
('American Gods', 2001),
('The Way of Kings', 2010),
('Words of Radiance', 2014),
('Oathbringer', 2017),
('Rhythm of War', 2020),
('The Handmaid''s Prejudice', 2022),
('The Hobbit''s Toe', 2016),
('Skyward', 2018),
('Starsight', 2019),
('Cytonic', 2021),
('Fundamentals of Physics', 1960);

DROP table if exists books_authors;

CREATE table books_authors (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  book_id BIGINT,
  author_id BIGINT,
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (author_id) REFERENCES authors(id)
);

INSERT INTO books_authors (book_id, author_id) VALUES
(1, 2),
(1, 7),
(2, 4),
(3, 3),
(4, 5),
(5, 5),
(6, 5),
(7, 5),
(8, 6),
(9, 2),
(10, 6),
(11, 6),
(12, 6),
(13, 6),
(14, 1),
(14, 4),
(14, 3),
(15, 1),
(15, 5),
(16, 6),
(17, 6),
(18, 6),
(19, 8),
(19, 9);
