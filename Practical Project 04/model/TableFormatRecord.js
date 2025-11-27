/**
 * TableFormatRecord - Record subclass for table output format
 * This class demonstrates inheritance and polymorphism by extending Record
 * and overriding the formatOutput() method
 * 
 * Course: CST8002
 * Practical Project Part 3
 * Author: Qinyu Luo
 */

import Record from './Record.js';

class TableFormatRecord extends Record {
    /**
     * Override formatOutput to return table format
     * This is an example of polymorphism - same method name, different implementation
     * @returns {string} Table formatted record
     */
    formatOutput() {
        return `| ${String(this.identification).padEnd(15)} | ${String(this.year).padEnd(6)} | ${String(this.transect).padEnd(10)} | ${String(this.quadrat).padEnd(8)} | ${String(this.name).padEnd(30)} | ${String(this.count).padEnd(8)} |`;
    }

    /**
     * Get table header (static method)
     * @returns {string} Table header
     */
    static getTableHeader() {
        return `| ${'Identification'.padEnd(15)} | ${'Year'.padEnd(6)} | ${'Transect'.padEnd(10)} | ${'Quadrat'.padEnd(8)} | ${'Name'.padEnd(30)} | ${'Count'.padEnd(8)} |`;
    }

    /**
     * Get table separator line
     * @returns {string} Separator line
     */
    static getSeparator() {
        return '─'.repeat(120);
    }
}

export default TableFormatRecord;