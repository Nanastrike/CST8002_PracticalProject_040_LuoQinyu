/**
 * DataManager class for managing record operations (CRUD).
 * Course: CST8002
 * Due Date: 2025/10/11
 * Author: Qinyu Luo
 */

import FileHandler from '../persistence/FileHandler.js';
import Record from '../model/Record.js';

class DataManager {
    /**
     * Initialize DataManager with empty records array
     */
    constructor() {
        /** @type {Array<Record>} */
        this.records = [];
        this.fileHandler = new FileHandler();
        this.datasetPath = 'data/dataset.csv';
    }

    /**
     * Load data from the dataset file on startup
     * @returns {boolean} Success status
     */
    loadData() {
        try {
            console.log('Loading initial data from dataset...');
            this.records = this.fileHandler.readRecordsFromFile(this.datasetPath, 5);
            return true;
        } catch (error) {
            console.error(`Error loading data: ${error.message}`);
            return false;
        }
    }

    /**
     * Reload data from dataset, replacing in-memory data
     * @returns {boolean} Success status
     */
    reloadData() {
        console.log('\n--- Reloading data from dataset ---');
        const result = this.loadData();
        if (result) {
            console.log('Data reloaded successfully!');
        } else {
            console.log('Failed to reload data');
        }
        return result;
    }

    /**
     * Save current records to a new file with UUID filename
     * @returns {string|null} Generated filename or null if failed
     */
    saveData() {
        try {
            console.log('\n--- Saving data to new file ---');
            const filePath = this.fileHandler.saveRecordsToFile(this.records);
            console.log(`Successfully saved to: ${filePath}`);
            return filePath;
        } catch (error) {
            console.error(`Error saving data: ${error.message}`);
            return null;
        }
    }

    /**
     * Get all records
     * @returns {Array<Record>} All records
     */
    getAllRecords() {
        return this.records;
    }

    /**
     * Get a single record by index
     * @param {number} index - Index of the record
     * @returns {Record|null} Record object or null if not found
     */
    getRecord(index) {
        if (index >= 0 && index < this.records.length) {
            return this.records[index];
        }
        console.log(`Record at index ${index} not found`);
        return null;
    }

    /**
     * Create and add a new record to the data structure
     * @param {Object} data - Record data object
     * @returns {boolean} Success status
     */
    createRecord(data) {
        try {
            const newRecord = new Record(
                data.identification,
                parseInt(data.year),
                parseInt(data.transect),
                parseInt(data.quadrat),
                data.name,
                parseInt(data.count)
            );
            this.records.push(newRecord);
            console.log('Record created successfully!');
            return true;
        } catch (error) {
            console.error(`Error creating record: ${error.message}`);
            return false;
        }
    }

    /**
     * Update an existing record in the data structure
     * @param {number} index - Index of record to update
     * @param {Object} newData - New data for the record
     * @returns {boolean} Success status
     */
    updateRecord(index, newData) {
        if (index >= 0 && index < this.records.length) {
            this.records[index].identification = newData.identification;
            this.records[index].year = parseInt(newData.year);
            this.records[index].transect = parseInt(newData.transect);
            this.records[index].quadrat = parseInt(newData.quadrat);
            this.records[index].name = newData.name;
            this.records[index].count = parseInt(newData.count);
            console.log('Record updated successfully!');
            return true;
        }
        console.log(`Record at index ${index} not found`);
        return false;
    }

    /**
     * Delete a record from the data structure
     * @param {number} index - Index of record to delete
     * @returns {boolean} Success status
     */
    deleteRecord(index) {
        if (index >= 0 && index < this.records.length) {
            const deleted = this.records.splice(index, 1);
            console.log(`Deleted record: ${deleted[0].identification}`);
            return true;
        }
        console.log(`Record at index ${index} not found`);
        return false;
    }

    /**
     * Get total number of records
     * @returns {number} Number of records
     */
    getRecordCount() {
        return this.records.length;
    }

    /**
     * Search records by name
     * @param {string} searchName - Name to search for
     * @returns {Array<Record>} Matching records
     */
    searchByName(searchName) {
        return this.records.filter(record => 
            record.name.toLowerCase().includes(searchName.toLowerCase())
        );
    }

    /**
 * Sort records by multiple columns
 * @param {Array<Object>} sortRules - Array of sort rules 
 * Example: [{column: 'year', order: 'asc'}, {column: 'name', order: 'desc'}]
 * @returns {Array<Record>} Sorted records
 */
multiColumnSort(sortRules) {
    if (!sortRules || sortRules.length === 0) {
        console.log('No sort rules provided');
        return this.records;
    }

    // Create a copy to avoid modifying original array
    const sortedRecords = [...this.records];

    sortedRecords.sort((a, b) => {
        // Iterate through each sort rule
        for (let rule of sortRules) {
            const column = rule.column;
            const order = rule.order; // 'asc' or 'desc'
            
            let comparison = 0;
            
            // Compare based on column type
            if (typeof a[column] === 'string') {
                comparison = a[column].localeCompare(b[column]);
            } else {
                comparison = a[column] - b[column];
            }
            
            // Apply sort order
            if (order === 'desc') {
                comparison = -comparison;
            }
            
            // If not equal, return the comparison result
            if (comparison !== 0) {
                return comparison;
            }
            // If equal, continue to next sort rule
        }
        
        return 0; // All columns are equal
    });

    console.log(`Sorted ${sortedRecords.length} records by ${sortRules.length} column(s)`);
    return sortedRecords;
}
}

export default DataManager;