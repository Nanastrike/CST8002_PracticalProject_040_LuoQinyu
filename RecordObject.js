/*
  @author :Qinyu Luo
  @course: CST8002
  @assignment: practical projects 1
  @time: 2025/9/21
  @description: Record object class for storing dataset information
*/

/**
 * RecordObjects class represents a single record from the dataset
 * Contains site identification, year, transect, quadrat, species name and count data
 */
class RecordObjects {
    /**
     * Constructor for RecordObjects
     * @param {string} siteIdentification - Site identification information
     * @param {string} year - Year of the record
     * @param {string} transect - Transect information
     * @param {string} quadrat - Quadrat information
     * @param {string} speciesCommonName - Common name of the species
     * @param {string} count - Count data
     */
    constructor(siteIdentification, year, transect, quadrat, speciesCommonName, count) {
        this.siteIdentification = siteIdentification;
        this.year = year;
        this.transect = transect;
        this.quadrat = quadrat;
        this.speciesCommonName = speciesCommonName;
        this.count = count;
    }

    /**
    * Gets the site identification
    * @returns {string} The site identification
    */
    getSiteIdentification() {
        return this.siteIdentification;
    }

    /**
   * Sets the site identification
   * @param {string} siteIdentification - The new site identification
   */
    setSiteIdentification(siteIdentification) {
        this.siteIdentification = siteIdentification;
    }

    /**
* Gets the year
* @returns {Number} The year
*/
    getYear() {
        return this.year;
    }

    /**
  * Sets the year
  * @param {Number} year - The new year
  */
    setYear(year) {
        this.year = year;
    }

    /**
* Gets the transect
* @returns {Number} The transect
*/
    getTransect() {
        return this.transect;
    }

    /**
  * Sets the transect
  * @param {Number} transect - The new transect
  */
    setTransect(transect) {
        this.transect = transect;
    }

    /**
* Gets the quadrat
* @returns {Number} The quadrat
*/
    getQuadrat() {
        return this.quadrat;
    }

    /**
  * Sets the quadrat
  * @param {Number} quadrat - The new quadrat
  */
    setQuadrat(quadrat) {
        return this.quadrat;
    }

    /**
* Gets the speciesCommonName
* @returns {string} The speciesCommonName
*/
    getSpeciesCommonName() {
        return this.speciesCommonName;
    }

    /**
  * Sets the speciesCommonName
  * @param {string} speciesCommonName - The new speciesCommonName
  */
    setSpeciesCommonName(speciesCommonName) {
        this.speciesCommonName = speciesCommonName;
    }

    /**
* Gets count
* @returns {Number} The count
*/
    getCount() {
        return this.count;
    }

    /**
  * Sets the site count
  * @param {Number} count - The new count
  */
    setCount(count) {
        this.count = count;
    }
}
module.exports = RecordObjects;
