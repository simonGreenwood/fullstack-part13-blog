CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes TEXT DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('simon','localhost:3000', 'localhost');
INSERT INTO blogs (author, url, title) VALUES ('anonymous','localhost:5432', 'how to use postgresql');
SELECT * FROM blogs