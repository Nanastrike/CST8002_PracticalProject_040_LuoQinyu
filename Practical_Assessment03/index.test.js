/*
 * author: Qinyu Luo
 * date:2025/10/2
 * 
 * Reference:
 * Source: https://medium.com/@ben.dev.io/node-js-unit-testing-with-jest-b7042d7c2ad0
 * Description: introduction of how to use jest to implement unit test
 * Date: 2025-10-02
 */

const { add } = require('./index');

// Display student name before tests run
beforeAll(() => {
    console.log('\n=================================');
    console.log('Student: Qinyu Luo');
    console.log('=================================\n');
});

describe('Add Function Tests', () => {
    
    // Test Case 1: 
    test('add(2, 3) should return 5', () => {
        const result = add(2, 3);
        expect(result).toBe(5);
    });
    
    // Test Case 2: 
    test('add(2, 3) should return 10', () => {
        const result = add(2, 3);
        // This assertion is intentionally wrong to demonstrate test failure
        expect(result).toBe(10); // Expected 10, but actual result is 5
    });
    
});














