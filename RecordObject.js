/*
  @author :Qinyu Luo
  @course: CST8002
  @assignment: practical projects 1
  @time: 2025/9/21
  @description:  an object containing all the variables and a constructor
*/

class RecordObjects{
    constructor(siteIdentification, year, transect, quadrat, speciesCommonName, count){
        this.siteIdentification = siteIdentification;
        this.year = year;
        this.transect = transect;
        this.quadrat = quadrat;
        this.speciesCommonName = speciesCommonName;
        this.count = count;
    }

    getSiteIdentification() {
        return this.siteIdentification;
    }

    setSiteIdentification(siteIdentification) {
        this.siteIdentification = siteIdentification;
    }

    getYear(){
        return this.year;
    }

    setYear(year){
        this.year = year;
    }

    getTransect(){
        return this.transect;
    }
    
    setTransect(transect){
        this.transect = transect;
    }

    getQuadrat(){
        return this.quadrat;
    }

    setQuadrat(quadrat){
        return this.quadrat;
    }

    getSpeciesCommonName(){
        return this.speciesCommonName;
    }

    setSpeciesCommonName(speciesCommonName){
        this.speciesCommonName = speciesCommonName;
    }

    getCount(){
        return this.count;
    }

    setCount(count){
        this.count = count;
    }
}
module.exports = RecordObjects;
