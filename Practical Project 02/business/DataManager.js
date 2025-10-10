/**
 * DataManager class for managing record operations (CRUD).
 * Course: CST8002
 * Due Date: 2025/10/12
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
            this.records = this.fileHandler.readRecordsFromFile(this.datasetPath, 100);
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
            console.log('✓ Data reloaded successfully!');
        } else {
            console.log('✗ Failed to reload data');
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
            console.log(`✓ Successfully saved to: ${filePath}`);
            return filePath;
        } catch (error) {
            console.error(`✗ Error saving data: ${error.message}`);
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
        console.log(`✗ Record at index ${index} not found`);
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
            console.log('✓ Record created successfully!');
            return true;
        } catch (error) {
            console.error(`✗ Error creating record: ${error.message}`);
            return false;
        }
    }

}

export default DataManager;