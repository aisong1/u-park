DROP DATABASE IF EXISTS parking;

CREATE DATABASE parking;

\c parking;

DROP TABLE IF EXISTS status;
DROP TABLE IF EXISTS meter_count;
DROP TABLE IF EXISTS least_likely;
DROP TABLE IF EXISTS status_groups;

CREATE EXTENSION pgcrypto;

CREATE TABLE status (
    _id SERIAL PRIMARY KEY,
    txn_id VARCHAR(40),
    meter_code VARCHAR(40),
    txndatetime TIMESTAMP,
    payment_mean VARCHAR(40),
    amount_paid VARCHAR(40),
    duration_min VARCHAR(40),
    blockface_name VARCHAR(255),
    side_of_street VARCHAR(2),
    element_key VARCHAR(40),
    parking_space_number VARCHAR(40),
    latitude VARCHAR(40),
    longitude VARCHAR(40)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

COPY status (txn_id, meter_code, txndatetime, payment_mean, amount_paid, duration_min, blockface_name, side_of_street, element_key, parking_space_number, latitude, longitude) 
FROM PROGRAM 'curl -L -X GET ''https://data.seattle.gov/resource/gg89-k5p6.csv?$limit=200000'''
WITH (FORMAT csv, DELIMITER ',', HEADER);

-- Create table that represents the total number of transactions at each meter in the dataset. 
CREATE TABLE meter_count AS (SELECT meter_code, COUNT(*) FROM status GROUP BY meter_code);

-- Create table that represents the bottom 25% of parking meters used based on number of transactions. 
-- least_likely meaning the least likely to be taken, i.e. the most likely to be available.
CREATE TABLE least_likely AS
WITH bottom_50 AS (
    SELECT * 
    FROM meter_count 
    WHERE count <= (SELECT AVG(count)::NUMERIC(10, 2) FROM meter_count)
),
bottom_25 AS (
    SELECT * 
    FROM bottom_50 
    WHERE count <= (SELECT AVG(count)::NUMERIC(10, 2) FROM bottom_50)
)
SELECT DISTINCT(status.meter_code), status.blockface_name, status.side_of_street, status.latitude, status.longitude 
FROM bottom_25, status 
WHERE bottom_25.meter_code = status.meter_code;

-- Create table based on groups of relevant data; ordered by the meter identification code, hour, date and minute
-- Query selects meter_code, transaction timestamp data, hour, and minute, duration of transaction in minutes, blockface name, and what side of the street the meter is on.
-- sideofstreet API docs: "Options are: E, S, N, W, NE, SW, SE, NW. The two digits are because many Seattle streets are at an angle. Avenues run north-south, Streets run east-west. 1st Ave on the SW side is the west side of the street"
CREATE TABLE status_groups AS (SELECT meter_code, txndatetime::date, EXTRACT(HOUR FROM txndatetime) AS hour, EXTRACT(MINUTE FROM txndatetime) AS minute, duration_min, blockface_name, side_of_street, txn_id FROM status      
GROUP BY meter_code, txndatetime, hour, minute, blockface_name, side_of_street, duration_min, txn_id
ORDER BY meter_code, hour ASC, txndatetime::date ASC, minute ASC);
