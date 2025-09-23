/*
@author :Qinyu Luo
@course: CST8002
@assignment: practical projects 1
@time: 2025/9/21
@description:  reading a csv file and outputing the first few lines
*/

// Required modules for file operations and CSV parsing
const fs = require('fs');
const csv = require('csv-parser');
const RecordObjects = require('./RecordObject.js');

/**
 * Array to store record objects parsed from CSV file
 * @type {RecordObjects[]}
 */
const records = [];
/**
 * Student name constant for display purposes
 * @constant {string}
 */
const STUDENT_NAME = "Qinyu Luo";
console.log(`Student: ${STUDENT_NAME}`);
/**
 * Maximum number of records to read from CSV file
 * @constant {number}
 */
const MAX_RECORDS = 10;

/**
 * Read and parse CSV file using streams
 * Creates RecordObjects from each row and stores in records array
 */
console.log('Loading dataset...');
fs.createReadStream('dataset.csv')
    .pipe(csv())
    /**
 * Event handler for processing each row of CSV data
 * @param {Object} row - Single row of CSV data as key-value pairs
 */
    .on('data', (row) => {
        if (records.length < MAX_RECORDS) {
            // Create new RecordObjects instance from CSV row data
            const record = new RecordObjects(
                row['Site identification'],
                row['Year'],
                row['Transect'],
                row['Quadrat'],
                row['Species Common Name'],
                row['Count']
            );
            records.push(record);
        }
    })
    /**
 * Event handler for when CSV file reading is complete
 * Outputs all loaded records to console
 */
    .on('end', () => {

        console.log('Records loaded:');
        // Loop through records array and display each record's data
        for (let i = 0; i < records.length; i++) {
            console.log(`Record ${i + 1}:`);
            console.log(`  Site: ${records[i].getSiteIdentification()}`);
            console.log(`  Year: ${records[i].getYear()}`);
            console.log(`  Transect: ${records[i].getTransect()}`);
            console.log(`  Species: ${records[i].getSpeciesCommonName()}`);
            console.log(`  Count: ${records[i].getCount()}`);
            console.log('');
        }

        console.log(`Program completed by: ${STUDENT_NAME}`);
    })
    /**
 * Event handler for file reading errors
 * @param {Error} err - Error object containing error details
 */
    .on('error', (err) => {
        console.error('Error reading file:', err.message);
    });