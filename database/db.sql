Create database tasksdb;

Create Table tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(355) UNIQUE,
    description VARCHAR(455)
);