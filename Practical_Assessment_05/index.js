/**
 * Author: Qinyu Luo
 * Course: CST8002 Programming Language Research Project
 * Assignment: Practical Assessment 5
 * 
 * References:
 * [1] "Array.prototype.filter() - JavaScript | MDN", MDN Web Docs. 
 *     Available: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 * [2] "How to Implement Search and Filtering in a REST API with Node.js and Express.js", GeeksforGeeks, Jul. 2025.
 *     Available: https://www.geeksforgeeks.org/node-js/how-to-implement-search-and-filtering-in-a-rest-api-with-node-js-and-express-js/
 */

const fs = require('fs');

const students = JSON.parse(fs.readFileSync('./students.json', 'utf8'));

/**
 * @param {Array} data
 * @param {Object} filters 
 * @returns {Array} 
 */
function filterByMultipleColumns(data, filters) {
  return data.filter(item => {
    return Object.keys(filters).every(key => {
      if (typeof item[key] === 'string') {
        return item[key].toLowerCase().includes(filters[key].toString().toLowerCase());
      } else {
        return item[key] == filters[key];
      }
    });
  });
}

console.log('\n========================================');
console.log('Multi-Column Filter Program');
console.log('Created by: Qinyu Luo');
console.log('========================================\n');

console.log('Original Student Data:');
console.table(students);

console.log('\n--- Example 1: Filter by Major (Computer Science) ---');
const filter1 = { major: 'Computer Science' };
const result1 = filterByMultipleColumns(students, filter1);
console.table(result1);

console.log('\n--- Example 2: Filter by Age (20) AND Major (Computer Science) ---');
const filter2 = { age: 20, major: 'Computer Science' };
const result2 = filterByMultipleColumns(students, filter2);
console.table(result2);

console.log('\n--- Example 3: Filter by Major (Engineering) ---');
const filter3 = { major: 'Engineering' };
const result3 = filterByMultipleColumns(students, filter3);
console.table(result3);

console.log('\n========================================');
console.log('Program completed successfully!');
console.log('========================================\n');