/**
 * Unit tests for polymorphic record formatting (Practical Project Part 3)
 * Tests inheritance and polymorphism implementation
 * 
 * Course: CST8002
 * Practical Project Part 3
 * Author: Qinyu Luo
 */

import Record from '../model/Record.js';
import JSONFormatRecord from '../model/JSONFormatRecord.js';
import TableFormatRecord from '../model/TableFormatRecord.js';

console.log('='.repeat(70));
console.log('POLYMORPHIC FORMAT UNIT TESTS');
console.log('Program by Qinyu Luo');
console.log('='.repeat(70));

// Test data
const testData = {
    identification: 'TEST001',
    year: 2024,
    transect: 5,
    quadrat: 10,
    name: 'Test Species',
    count: 25
};

let passedTests = 0;
let totalTests = 0;

/**
 * Helper function to run a test
 * @param {string} testName - Name of the test
 * @param {function} testFunc - Test function that returns boolean
 */
function runTest(testName, testFunc) {
    totalTests++;
    try {
        const result = testFunc();
        if (result) {
            console.log(`✓ PASS: ${testName}`);
            passedTests++;
        } else {
            console.log(`✗ FAIL: ${testName}`);
        }
    } catch (error) {
        console.log(`✗ FAIL: ${testName} - Error: ${error.message}`);
    }
}

console.log('\n' + '-'.repeat(70));
console.log('TEST SUITE 1: Base Record Class');
console.log('-'.repeat(70));

const baseRecord = new Record(
    testData.identification,
    testData.year,
    testData.transect,
    testData.quadrat,
    testData.name,
    testData.count
);

runTest('Base Record: Object created successfully', () => {
    return baseRecord !== null && baseRecord instanceof Record;
});

runTest('Base Record: formatOutput() returns string', () => {
    const output = baseRecord.formatOutput();
    return typeof output === 'string' && output.length > 0;
});

runTest('Base Record: formatOutput() contains identification', () => {
    const output = baseRecord.formatOutput();
    return output.includes('TEST001');
});

runTest('Base Record: formatOutput() contains species name', () => {
    const output = baseRecord.formatOutput();
    return output.includes('Test Species');
});

console.log('\nBase Record Output:');
console.log(baseRecord.formatOutput());

console.log('\n' + '-'.repeat(70));
console.log('TEST SUITE 2: JSONFormatRecord Subclass (Inheritance & Polymorphism)');
console.log('-'.repeat(70));

const jsonRecord = new JSONFormatRecord(
    testData.identification,
    testData.year,
    testData.transect,
    testData.quadrat,
    testData.name,
    testData.count
);

runTest('JSONFormatRecord: Inherits from Record', () => {
    return jsonRecord instanceof Record && jsonRecord instanceof JSONFormatRecord;
});

runTest('JSONFormatRecord: formatOutput() returns valid JSON', () => {
    const output = jsonRecord.formatOutput();
    try {
        JSON.parse(output);
        return true;
    } catch {
        return false;
    }
});

runTest('JSONFormatRecord: JSON contains correct identification', () => {
    const output = jsonRecord.formatOutput();
    const parsed = JSON.parse(output);
    return parsed.identification === 'TEST001';
});

runTest('JSONFormatRecord: JSON contains correct year', () => {
    const output = jsonRecord.formatOutput();
    const parsed = JSON.parse(output);
    return parsed.year === 2024;
});

runTest('JSONFormatRecord: JSON contains all fields', () => {
    const output = jsonRecord.formatOutput();
    const parsed = JSON.parse(output);
    return parsed.identification && parsed.year && parsed.transect && 
           parsed.quadrat && parsed.name && parsed.count;
});

console.log('\nJSONFormatRecord Output:');
console.log(jsonRecord.formatOutput());

console.log('\n' + '-'.repeat(70));
console.log('TEST SUITE 3: TableFormatRecord Subclass (Inheritance & Polymorphism)');
console.log('-'.repeat(70));

const tableRecord = new TableFormatRecord(
    testData.identification,
    testData.year,
    testData.transect,
    testData.quadrat,
    testData.name,
    testData.count
);

runTest('TableFormatRecord: Inherits from Record', () => {
    return tableRecord instanceof Record && tableRecord instanceof TableFormatRecord;
});

runTest('TableFormatRecord: formatOutput() contains pipe symbols', () => {
    const output = tableRecord.formatOutput();
    return output.includes('|') && output.split('|').length > 5;
});

runTest('TableFormatRecord: formatOutput() contains identification', () => {
    const output = tableRecord.formatOutput();
    return output.includes('TEST001');
});

runTest('TableFormatRecord: Static getTableHeader() works', () => {
    const header = TableFormatRecord.getTableHeader();
    return typeof header === 'string' && header.includes('Identification');
});

console.log('\nTableFormatRecord Output:');
console.log(TableFormatRecord.getTableHeader());
console.log(tableRecord.formatOutput());

console.log('\n' + '-'.repeat(70));
console.log('TEST SUITE 4: Polymorphism Demonstration');
console.log('-'.repeat(70));

// This is the KEY TEST for polymorphism:
// Create an array of base class type (Record) but store different subclass instances
// When we call formatOutput() on each, they use their own overridden version
const mixedRecords = [baseRecord, jsonRecord, tableRecord];

runTest('Polymorphic Array: Contains all three record types', () => {
    return mixedRecords.length === 3;
});

runTest('Polymorphic Array: All elements are Record instances', () => {
    return mixedRecords.every(record => record instanceof Record);
});

runTest('Polymorphic Array: Each type overrides formatOutput() differently', () => {
    const outputs = mixedRecords.map(record => record.formatOutput());
    // Check that outputs are different (polymorphism in action!)
    return outputs[0] !== outputs[1] && outputs[1] !== outputs[2];
});

runTest('Polymorphic Call: Base Record uses standard format', () => {
    const output = mixedRecords[0].formatOutput();
    return output.includes('ID:') && !output.startsWith('{');
});

runTest('Polymorphic Call: JSON Record returns valid JSON', () => {
    const output = mixedRecords[1].formatOutput();
    try {
        JSON.parse(output);
        return true;
    } catch {
        return false;
    }
});

runTest('Polymorphic Call: Table Record uses pipe separators', () => {
    const output = mixedRecords[2].formatOutput();
    return output.includes('|');
});

console.log('\nPolymorphic Method Calls Demonstration:');
console.log('Calling formatOutput() on array of Record type containing different subclasses:\n');

mixedRecords.forEach((record, index) => {
    console.log(`[${index}] ${record.constructor.name}:`);
    const output = record.formatOutput();
    // Show first 100 chars for readability
    console.log(output.substring(0, 100) + (output.length > 100 ? '...' : ''));
    console.log();
});

console.log('-'.repeat(70));
console.log('TEST SUITE 5: Inherited Methods Still Work');
console.log('-'.repeat(70));

runTest('JSONFormatRecord: Inherited toCSV() method works', () => {
    const csv = jsonRecord.toCSV();
    return csv.includes('TEST001') && csv.includes('Test Species');
});

runTest('TableFormatRecord: Inherited toDetailedString() method works', () => {
    const detailed = tableRecord.toDetailedString();
    return detailed.includes('Identification:') && detailed.includes('TEST001');
});

console.log('\n' + '='.repeat(70));
console.log('TEST RESULTS SUMMARY');
console.log('Program by Qinyu Luo');
console.log('='.repeat(70));
console.log(`Total Tests: ${totalTests}`);
console.log(`Passed: ${passedTests}`);
console.log(`Failed: ${totalTests - passedTests}`);
console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

if (passedTests === totalTests) {
    console.log('\n✓ ALL TESTS PASSED! Polymorphism implementation is correct.');
} else {
    console.log('\n✗ Some tests failed. Please review the implementation.');
}

console.log('='.repeat(70) + '\n');