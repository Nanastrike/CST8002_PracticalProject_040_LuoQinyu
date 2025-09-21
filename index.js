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
const MAX_RECORDS = 3;


fs.createReadStream('dataset.csv')
    .pipe(csv())
    .on('data', (row) => {
        if (records.length < MAX_RECORDS) {
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
    .on('end', () => {

        console.log('Records loaded:');
        for (let i = 0; i < records.length; i++) {
            console.log(`Record ${i + 1}:`);
            console.log(`  Site: ${records[i].getSiteIdentification()}`);
            console.log(`  Year: ${records[i].getYear()}`);
            console.log(`  Transect: ${records[i].getTransect()}`);
            console.log(`  Species: ${records[i].getSpeciesCommonName()}`);
            console.log(`  Count: ${records[i].getCount()}`);
            console.log('');
        }

        console.log(`\nProgram completed by: ${STUDENT_NAME}`);
    })
    .on('error', (err) => {
        console.error('Error reading file:', err.message);
    });