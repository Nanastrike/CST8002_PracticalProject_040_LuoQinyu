/**
 * Course: CST8002
 * Due Date: 2025/10/12
 * Author: Qinyu Luo
 */

class Record {
    /**
     * Create a new Record instance
     * @param {number} identification 
     * @param {number} year 
     * @param {number} transect 
     * @param {number} quadrat
     * @param {string} name
     * @param {number} count
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
     * Convert record to CSV format string
     * @returns {string} CSV formatted string
     */
    toCSV() {
        return `${this.identification},${this.year},${this.transect},${this.quadrat},${this.name},${this.count}`;
    }

    /**
         * Get string representation of record
         * @returns {string} Formatted record information
         */
    toString() {
        return `ID: ${this.identification} | Year: ${this.year} | Transect: ${this.transect} | Quadrat: ${this.quadrat} | Name: ${this.name} | Count: ${this.count}`;
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
        Count: ${this.count}
                `.trim();
        }
    }

export default Record;