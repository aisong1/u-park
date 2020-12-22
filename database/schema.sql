DROP DATABASE IF EXISTS parking;

CREATE DATABASE parking;

\c parking;

DROP TABLE IF EXISTS spots;

CREATE TABLE spots (
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

COPY spots (txn_id, meter_code, txndatetime, payment_mean, amount_paid, duration_min, blockface_name, side_of_street, element_key, parking_space_number, latitude, longitude) 
FROM PROGRAM 'curl -L -X GET ''https://data.seattle.gov/resource/gg89-k5p6.csv?$limit=124000'''
WITH (FORMAT csv, DELIMITER ',', HEADER);
