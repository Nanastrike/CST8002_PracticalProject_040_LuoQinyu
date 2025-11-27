/**
 * UserInterface class for handling user interactions.
 * Updated for Practical Project Part 3 to demonstrate polymorphism
 * 
 * Course: CST8002
 * Practical Project Part 3
 * Author: Qinyu Luo
 */

import readline from 'readline';
import DataManager from '../business/DataManager.js';
import JSONFormatRecord from '../model/JSONFormatRecord.js';
import TableFormatRecord from '../model/TableFormatRecord.js';

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
        console.log('3. Display all records (Standard format)');
        console.log('4. Display single record');
        console.log('5. Create new record');
        console.log('6. Edit record');
        console.log('7. Delete record');
        console.log('8. Search records by name');
        console.log('9. Display records in JSON format');
        console.log('10. Display records in Table format');
        console.log('11. Sort records by multiple columns');
        console.log('12. Exit');
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
     * Display all records with pagination (standard format)
     */
    displayAllRecords() {
        const records = this.dataManager.getAllRecords();

        console.log('\n' + '─'.repeat(60));
        console.log(`Total Records: ${records.length} (Standard Format)`);
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
     * Display records using polymorphic formatting
     * This method demonstrates polymorphism in action:
     * - Creates instances of different subclasses (JSONFormatRecord, TableFormatRecord)
     * - Stores them in an array of base class type (Record)
     * - Calls formatOutput() polymorphically - each object uses its own implementation
     * 
     * @param {string} formatType - 'json' or 'table'
     */
    displayRecordsWithFormat(formatType) {
        const records = this.dataManager.getAllRecords();

        console.log('\n' + '─'.repeat(60));
        console.log(`Total Records: ${records.length} (${formatType.toUpperCase()} Format)`);
        console.log(`Program by ${this.yourFullName}`);
        console.log('─'.repeat(60));

        if (records.length === 0) {
            console.log('No records to display.');
            return;
        }

        // POLYMORPHISM IN ACTION:
        // Convert plain records to formatted record objects
        // Each subclass will override the formatOutput() method
        const formattedRecords = records.map(record => {
            let formattedRecord;

            switch (formatType) {
                case 'json':
                    // Create JSONFormatRecord subclass instance
                    formattedRecord = new JSONFormatRecord(
                        record.identification,
                        record.year,
                        record.transect,
                        record.quadrat,
                        record.name,
                        record.count
                    );
                    break;

                case 'table':
                    // Create TableFormatRecord subclass instance
                    formattedRecord = new TableFormatRecord(
                        record.identification,
                        record.year,
                        record.transect,
                        record.quadrat,
                        record.name,
                        record.count
                    );
                    break;

                default:
                    // Use base Record class
                    formattedRecord = record;
            }

            return formattedRecord;
        });

        // Display table header if table format
        if (formatType === 'table') {
            console.log(TableFormatRecord.getTableHeader());
            console.log(TableFormatRecord.getSeparator());
        }

        // POLYMORPHIC METHOD CALLS:
        // Each record object calls its own version of formatOutput()
        // - JSONFormatRecord.formatOutput() returns JSON
        // - TableFormatRecord.formatOutput() returns table row
        // - Record.formatOutput() returns standard format
        formattedRecords.forEach((record, index) => {
            if (formatType === 'json') {
                console.log(`\n[Index: ${index}]`);
            }
            console.log(record.formatOutput());

            // Display name every 10 records
            if ((index + 1) % 10 === 0) {
                console.log(`\n--- Program by ${this.yourFullName} ---\n`);
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
            const choice = await this.prompt('Enter your choice (1-11): ');

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
                    this.displayRecordsWithFormat('json');
                    break;
                case '10':
                    this.displayRecordsWithFormat('table');
                    break;
                case '11':
                    await this.sortRecordsMultiColumn();
                    break;
                case '12':
                    running = false;
                    console.log('\n' + '='.repeat(60));
                    console.log('Thank you for using Data Management System!');
                    console.log(`Program by ${this.yourFullName}`);
                    console.log('='.repeat(60) + '\n');
                    break;
                default:
                    console.log('Invalid choice. Please enter 1-12.');
            }
        }

        this.rl.close();
    }

    /**
 * Multi-column sort interface
 * Allows user to sort by multiple columns with custom order
 */
    async sortRecordsMultiColumn() {
        console.log('\n' + '─'.repeat(60));
        console.log(`Multi-Column Sort - Program by ${this.yourFullName}`);
        console.log('─'.repeat(60));

        const availableColumns = ['identification', 'year', 'transect', 'quadrat', 'name', 'count'];

        console.log('\nAvailable columns to sort by:');
        availableColumns.forEach((col, index) => {
            console.log(`  ${index + 1}. ${col}`);
        });

        const sortRules = [];
        let addMore = true;

        while (addMore && sortRules.length < availableColumns.length) {
            console.log(`\n--- Sort Rule ${sortRules.length + 1} ---`);

            const colInput = await this.prompt('Enter column number to sort by: ');
            const colIndex = parseInt(colInput) - 1;

            if (isNaN(colIndex) || colIndex < 0 || colIndex >= availableColumns.length) {
                console.log('Invalid column number. Please try again.');
                continue;
            }

            const selectedColumn = availableColumns[colIndex];

            // Check if column already selected
            if (sortRules.some(rule => rule.column === selectedColumn)) {
                console.log('This column is already selected. Please choose another.');
                continue;
            }

            const orderInput = await this.prompt('Sort order - (a)scending or (d)escending? ');
            const order = orderInput.toLowerCase() === 'd' ? 'desc' : 'asc';

            sortRules.push({ column: selectedColumn, order });
            console.log(`✓ Added: ${selectedColumn} (${order})`);

            if (sortRules.length < availableColumns.length) {
                const continueInput = await this.prompt('\nAdd another sort column? (y/n): ');
                addMore = continueInput.toLowerCase() === 'y';
            }
        }

        if (sortRules.length === 0) {
            console.log('No sort rules defined. Returning to menu.');
            return;
        }

        // Display sort rules summary
        console.log('\n' + '─'.repeat(60));
        console.log('Sort Rules Summary:');
        sortRules.forEach((rule, index) => {
            console.log(`  ${index + 1}. ${rule.column} (${rule.order})`);
        });
        console.log('─'.repeat(60));

        // Perform sort
        const sortedRecords = this.dataManager.multiColumnSort(sortRules);

        // Display sorted results
        console.log('\n' + '─'.repeat(60));
        console.log(`Sorted Results (${sortedRecords.length} records)`);
        console.log(`Program by ${this.yourFullName}`);
        console.log('─'.repeat(60));

        sortedRecords.forEach((record, index) => {
            console.log(`\n[Index: ${index}]`);
            console.log(record.toString());

            if ((index + 1) % 10 === 0) {
                console.log(`\n--- Program by ${this.yourFullName} ---`);
            }
        });

        console.log('\n' + '─'.repeat(60));
    }
}

export default UserInterface;