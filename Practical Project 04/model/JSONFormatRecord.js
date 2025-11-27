/**
 * JSONFormatRecord - Record subclass for JSON output format
 * This class demonstrates inheritance and polymorphism by extending Record
 * and overriding the formatOutput() method
 * 
 * Course: CST8002
 * Practical Project Part 3
 * Author: Qinyu Luo
 */

import Record from './Record.js';

class JSONFormatRecord extends Record {
    /**
     * Override formatOutput to return JSON format
     * This is an example of polymorphism - same method name, different implementation
     * @returns {string} JSON formatted record
     */
    formatOutput() {
        return JSON.stringify({
            identification: this.identification,
            year: this.year,
            transect: this.transect,
            quadrat: this.quadrat,
            name: this.name,
            count: this.count
        }, null, 2);
    }
}

export default JSONFormatRecord;