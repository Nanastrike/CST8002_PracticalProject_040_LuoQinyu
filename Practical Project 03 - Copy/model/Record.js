/**
 * Base Record class for storing biological survey data
 * Course: CST8002
 * Practical Project Part 3
 * Author: Qinyu Luo
 */

class Record {
    /**
     * Create a new Record instance
     * @param {string} identification - Unique identifier
     * @param {number} year - Survey year
     * @param {number} transect - Transect number
     * @param {number} quadrat - Quadrat number
     * @param {string} name - Species name
     * @param {number} count - Count of specimens
     */
    constructor(identification, year, transect, quadrat, name, count) {
        this.identification = identification;
        this.year = year;
        this.transect = transect;
        this.quadrat = quadrat;
        this.name = name;
        this.count = count;
    }

    /**
     * Format output - Base implementation (can be overridden by subclasses)
     * This demonstrates polymorphism - subclasses can override this method
     * @returns {string} Formatted record string
     */
    formatOutput() {
        // Base format - simple one-line display
        return `ID: ${this.identification} | Year: ${this.year} | Transect: ${this.transect} | Quadrat: ${this.quadrat} | Name: ${this.name} | Count: ${this.count}`;
    }

    /**
     * Convert record to CSV format string
     * @returns {string} CSV formatted string
     */
    toCSV() {
        return `${this.identification},${this.year},${this.transect},${this.quadrat},${this.name},${this.count}`;
    }

    /**
     * Get string representation of record (uses formatOutput for consistency)
     * @returns {string} Formatted record information
     */
    toString() {
        return this.formatOutput();
    }

    /**
     * Get detailed multi-line string representation
     * @returns {string} Detailed formatted record
     */
    toDetailedString() {
        return `
Identification: ${this.identification}
Year: ${this.year}
Transect: ${this.transect}
Quadrat: ${this.quadrat}
Name: ${this.name}
Count: ${this.count}`.trim();
    }
}

export default Record;