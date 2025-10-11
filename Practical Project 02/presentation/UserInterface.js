/**
 * UserInterface class for handling user interactions.
 * Course: CST8002
 * Due Date: 2025/10/11
 * Author: Qinyu Luo
 */

import readline from 'readline';
import DataManager from '../business/DataManager.js';

class UserInterface {
    /**
     * Initialize the user interface
     */
    constructor() {
        this.dataManager = new DataManager();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.yourFullName = "Qinyu Luo";
    }

    /**
     * Display the main menu
     */
    displayMenu() {
        console.log('\n' + '='.repeat(60));
        console.log(`Data Management System - Program by ${this.yourFullName}`);
        console.log('='.repeat(60));
        console.log('1. Reload data from dataset');
        console.log('2. Save data to file');
        console.log('3. Display all records');
        console.log('4. Display single record');
        console.log('5. Create new record');
        console.log('6. Edit record');
        console.log('7. Delete record');
        console.log('8. Search records by name');
        console.log('9. Exit');
        console.log('='.repeat(60));
    }

    /**
     * Prompt user for input
     * @param {string} question - Question to ask
     * @returns {Promise<string>} User's answer
     */
    prompt(question) {
        return new Promise((resolve) => {
            this.rl.question(question, (answer) => {
                resolve(answer.trim());
            });
        });
    }

    /**
     * Display all records with pagination
     */
    displayAllRecords() {
        const records = this.dataManager.getAllRecords();
        
        console.log('\n' + '─'.repeat(60));
        console.log(`Total Records: ${records.length}`);
        console.log(`Program by ${this.yourFullName}`);
        console.log('─'.repeat(60));
        
        if (records.length === 0) {
            console.log('No records to display.');
            return;
        }

        records.forEach((record, index) => {
            console.log(`\n[Index: ${index}]`);
            console.log(record.toString());
            
            // Display name every 10 records
            if ((index + 1) % 10 === 0) {
                console.log(`\n--- Program by ${this.yourFullName} ---`);
            }
        });
        
        console.log('\n' + '─'.repeat(60));
    }

    /**
     * Display a single record by index
     */
    async displaySingleRecord() {
        const indexStr = await this.prompt('Enter record index: ');
        const index = parseInt(indexStr);
        
        if (isNaN(index)) {
            console.log('Invalid index. Please enter a number.');
            return;
        }

        const record = this.dataManager.getRecord(index);
        
        if (record) {
            console.log('\n' + '─'.repeat(60));
            console.log(`Program by ${this.yourFullName}`);
            console.log('─'.repeat(60));
            console.log(record.toDetailedString());
            console.log('─'.repeat(60));
        }
    }

    /**
     * Create a new record through user input
     */
    async createNewRecord() {
        console.log('\n' + '─'.repeat(60));
        console.log(`Creating New Record - Program by ${this.yourFullName}`);
        console.log('─'.repeat(60));
        
        try {
            const identification = await this.prompt('Enter Identification: ');
            const year = await this.prompt('Enter Year: ');
            const transect = await this.prompt('Enter Transect: ');
            const quadrat = await this.prompt('Enter Quadrat: ');
            const name = await this.prompt('Enter Name: ');
            const count = await this.prompt('Enter Count: ');
            
            const success = this.dataManager.createRecord({
                identification,
                year,
                transect,
                quadrat,
                name,
                count
            });
            
            if (success) {
                console.log(`\nRecord created! Total records: ${this.dataManager.getRecordCount()}`);
            }
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }

    /**
     * Edit an existing record
     */
    async editRecord() {
        console.log('\n' + '─'.repeat(60));
        console.log(`Editing Record - Program by ${this.yourFullName}`);
        console.log('─'.repeat(60));
        
        const indexStr = await this.prompt('Enter record index to edit: ');
        const recordIndex = parseInt(indexStr);
        
        if (isNaN(recordIndex)) {
            console.log('Invalid index.');
            return;
        }
        
        const existingRecord = this.dataManager.getRecord(recordIndex);
        if (!existingRecord) {
            return;
        }
        
        console.log('\nCurrent record:');
        console.log(existingRecord.toDetailedString());
        console.log('\nEnter new values (press Enter to keep current value):');
        
        const identification = await this.prompt(`Identification [${existingRecord.identification}]: `) || existingRecord.identification;
        const year = await this.prompt(`Year [${existingRecord.year}]: `) || existingRecord.year.toString();
        const transect = await this.prompt(`Transect [${existingRecord.transect}]: `) || existingRecord.transect.toString();
        const quadrat = await this.prompt(`Quadrat [${existingRecord.quadrat}]: `) || existingRecord.quadrat.toString();
        const name = await this.prompt(`Name [${existingRecord.name}]: `) || existingRecord.name;
        const count = await this.prompt(`Count [${existingRecord.count}]: `) || existingRecord.count.toString();
        
        this.dataManager.updateRecord(recordIndex, {
            identification,
            year,
            transect,
            quadrat,
            name,
            count
        });
    }

    /**
     * Delete a record by index
     */
    async deleteRecord() {
        console.log('\n' + '─'.repeat(60));
        console.log(`Deleting Record - Program by ${this.yourFullName}`);
        console.log('─'.repeat(60));
        
        const indexStr = await this.prompt('Enter record index to delete: ');
        const index = parseInt(indexStr);
        
        if (isNaN(index)) {
            console.log('Invalid index.');
            return;
        }

        const record = this.dataManager.getRecord(index);
        if (record) {
            console.log('\nRecord to delete:');
            console.log(record.toString());
            const confirm = await this.prompt('Are you sure? (yes/no): ');
            
            if (confirm.toLowerCase() === 'yes' || confirm.toLowerCase() === 'y') {
                this.dataManager.deleteRecord(index);
            } else {
                console.log('Deletion cancelled.');
            }
        }
    }

    /**
     * Search records by name
     */
    async searchRecords() {
        console.log('\n' + '─'.repeat(60));
        console.log(`Search Records - Program by ${this.yourFullName}`);
        console.log('─'.repeat(60));
        
        const searchName = await this.prompt('Enter name to search: ');
        const results = this.dataManager.searchByName(searchName);
        
        if (results.length === 0) {
            console.log(`No records found matching "${searchName}"`);
        } else {
            console.log(`\nFound ${results.length} record(s):`);
            results.forEach((record, index) => {
                console.log(`\n[${index}] ${record.toString()}`);
            });
        }
    }

    /**
     * Start the application
     */
    async start() {
        console.log('\n' + '='.repeat(60));
        console.log('Welcome to Data Management System');
        console.log(`Program by ${this.yourFullName}`);
        console.log('='.repeat(60));
        
        // Load initial data
        console.log('\nLoading data from dataset...');
        if (this.dataManager.loadData()) {
            console.log(`Successfully loaded ${this.dataManager.getRecordCount()} records.`);
        } else {
            console.log('Warning: Failed to load data. Starting with empty dataset.');
        }

        let running = true;
        
        while (running) {
            this.displayMenu();
            const choice = await this.prompt('Enter your choice (1-9): ');
            
            switch (choice) {
                case '1':
                    this.dataManager.reloadData();
                    break;
                case '2':
                    this.dataManager.saveData();
                    break;
                case '3':
                    this.displayAllRecords();
                    break;
                case '4':
                    await this.displaySingleRecord();
                    break;
                case '5':
                    await this.createNewRecord();
                    break;
                case '6':
                    await this.editRecord();
                    break;
                case '7':
                    await this.deleteRecord();
                    break;
                case '8':
                    await this.searchRecords();
                    break;
                case '9':
                    running = false;
                    console.log('\n' + '='.repeat(60));
                    console.log('Thank you for using Data Management System!');
                    console.log(`Program by ${this.yourFullName}`);
                    console.log('='.repeat(60) + '\n');
                    break;
                default:
                    console.log('Invalid choice. Please enter 1-9.');
            }
        }
        
        this.rl.close();
    }
}

export default UserInterface;