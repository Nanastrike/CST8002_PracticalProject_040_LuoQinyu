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

}

export default DataManager;