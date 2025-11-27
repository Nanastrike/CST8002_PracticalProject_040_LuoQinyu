/**
 * FileHandler class for reading and writing CSV files.
 * Course: CST8002
 * Due Date: 2025/10/12
 * Author: Qinyu Luo
 */

import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { v4 as uuidv4 } from 'uuid';
import Record from '../model/Record.js';

class FileHandler {
    /**
     * Read records from CSV file
     * @param {string} filePath - Path to the CSV file
     * @param {number} maxRecords - Maximum number of records to read (default: 5)
     * @returns {Array<Record>} Array of Record objects
     * @throws {Error} If file cannot be read
     */
    readRecordsFromFile(filePath, maxRecords = 100) {
        try {
            console.log(`Reading from file: ${filePath}`);
            
            // Read file content
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            
            // Parse CSV with headers
            const records = parse(fileContent, {
                columns: true,  // Use first row as column names
                skip_empty_lines: true,
                trim: true,
                cast: true  // Automatically convert types
            });

            // Limit to maxRecords
            const limitedRecords = records.slice(0, maxRecords);

            // Convert to Record objects
            const recordObjects = limitedRecords.map(row => {
                return new Record(
                    row.identification || row.Identification,
                    parseInt(row.year || row.Year),
                    parseInt(row.transect || row.Transect),
                    parseInt(row.quadrat || row.Quadrat),
                    row.name || row.Name,
                    parseInt(row.count || row.Count)
                );
            });

            console.log(`Loaded ${recordObjects.length} records successfully`);
            return recordObjects;

        } catch (error) {
            if (error.code === 'ENOENT') {
                throw new Error(`File not found: ${filePath}`);
            }
            throw new Error(`Error reading file: ${error.message}`);
        }
    }

    /**
     * Save records to a new CSV file with UUID filename
     * @param {Array<Record>} records - Array of records to save
     * @param {string} outputDir - Directory to save the file (default: 'data')
     * @returns {string} Generated filename with full path
     * @throws {Error} If file cannot be written
     */
    saveRecordsToFile(records, outputDir = 'data') {
        try {
            // Generate UUID filename
            const filename = `${uuidv4()}.csv`;
            const filePath = `${outputDir}/${filename}`;

            // Create CSV content with headers
            let csvContent = 'identification,year,transect,quadrat,name,count\n';
            
            records.forEach(record => {
                csvContent += record.toCSV() + '\n';
            });

            // Write to file
            fs.writeFileSync(filePath, csvContent, 'utf-8');
            
            console.log(`Saved ${records.length} records to: ${filePath}`);
            return filePath;

        } catch (error) {
            throw new Error(`Error saving file: ${error.message}`);
        }
    }
}

export default FileHandler;