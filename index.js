/*
  @author :Qinyu Luo
  @course: CST8002
  @assignment: practical projects 1
  @time: 2025/9/21
  @description:  reading a csv file and outputing the first few lines
*/

const fs = require('fs');
const csv = require('csv-parser');
const RecordObjects = require('./RecordObject.js');

const records = [];
const STUDENT_NAME = "Qinyu Luo";
console.log(`Student: ${STUDENT_NAME}`);
const MAX_RECORDS = 5;


fs.createReadStream('dataset.csv')
    .pipe(csv())
    .on('data', (row) => {
        if (records.length < MAX_RECORDS) {
            const record = new RecordObjects(
                row["Site identification"],
                row["Year"],
                row["Transect"],
                row["Quadrat"],
                row["Species Common Name"],
                row["Count"]
            );
            records.push(record);
        }
    })
    .on('end', () => {
        console.log('CSV parsing complete. Records:', records);
    })
    .on('error', (err) => {
        console.error('Error reading file:', err.message);
    });