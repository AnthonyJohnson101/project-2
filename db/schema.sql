CREATE DATABASE recipe_db;

USE recipe_db;

CREATE TABLE users (
    userid INT NOT NULL AUTO_INCREMENT,
    lastname VARCHAR(45) NOT NULL,
    firstname VARCHAR(45) NOT NULL,
    email VARCHAR(60) NOT NULL,
    pass VARCHAR(60) NOT NULL,
    PRIMARY KEY (id)
    );

CREATE TABLE recipes (
    recipeid INT NOT NULL AUTO_INCREMENT,
    recipename VARCHAR(45) NOT NULL,
    category VARCHAR(45) NOT NULL,
    ingredients TEXT NOT NULL,
    preptime VARCHAR(100) NOT NULL,
    cooktime VARCHAR(100) NOT NULL,
    instructions TEXT NOT NULL,
    submitteduser INT NOT NULL,
    timesubmitstamp INT NOT NULL,
    upvotes INT NOT NULL,
    downvotes INT NOT NULL,
    vegan BOOLEAN NOT NULL,
    glutenfree BOOLEAN NOT NULL,
    vegetarian BOOLEAN NOT NULL,
    pescatarian BOOLEAN NOT NULL,
    spicy INT NOT NULL,
    lowcarb BOOLEAN NOT NULL,
    nuts BOOLEAN NOT NULL,
    dairy BOOLEAN NOT NULL,
    seafood BOOLEAN NOT NULL,
    alcohol BOOLEAN NOT NULL,
    upvotes INT NOT NULL,
    downvotes INT NOT NULL
);