/**
 * Unit tests for DataManager class.
 * Course: CST8002
 * Due Date: 2025/10/12
 * Author: Qinyu Luo
 */

import DataManager from '../business/DataManager.js';

describe('DataManager CRUD Operations', () => {
    let dataManager;

    beforeEach(() => {
        dataManager = new DataManager();
    });

    /**
     * Test: Create a new record
     */
    test('should create a new record successfully', () => {
        const initialCount = dataManager.getRecordCount();
        
        const recordData = {
            identification: 'TEST001',
            year: 2024,
            transect: 1,
            quadrat: 5,
            name: 'Test Species',
            count: 10
        };
        
        const result = dataManager.createRecord(recordData);
        
        expect(result).toBe(true);
        expect(dataManager.getRecordCount()).toBe(initialCount + 1);
        
        const newRecord = dataManager.getRecord(initialCount);
        expect(newRecord.identification).toBe('TEST001');
        expect(newRecord.name).toBe('Test Species');
    });

    /**
     * Test: Retrieve a record by index
     */
    test('should retrieve a record by index', () => {
        const recordData = {
            identification: 'TEST002',
            year: 2023,
            transect: 2,
            quadrat: 3,
            name: 'Sample Species',
            count: 15
        };
        
        dataManager.createRecord(recordData);
        const record = dataManager.getRecord(0);
        
        expect(record).not.toBeNull();
        expect(record.identification).toBe('TEST002');
        expect(record.year).toBe(2023);
    });

    /**
     * Test: Update a record
     */
    test('should update a record successfully', () => {
        const initialData = {
            identification: 'TEST003',
            year: 2022,
            transect: 1,
            quadrat: 1,
            name: 'Original Name',
            count: 5
        };
        
        dataManager.createRecord(initialData);
        
        const updatedData = {
            identification: 'TEST003-UPDATED',
            year: 2023,
            transect: 2,
            quadrat: 2,
            name: 'Updated Name',
            count: 20
        };
        
        const result = dataManager.updateRecord(0, updatedData);
        const record = dataManager.getRecord(0);
        
        expect(result).toBe(true);
        expect(record.identification).toBe('TEST003-UPDATED');
        expect(record.name).toBe('Updated Name');
        expect(record.count).toBe(20);
    });

    /**
     * Test: Delete a record
     */
    test('should delete a record successfully', () => {
        const recordData = {
            identification: 'TEST004',
            year: 2024,
            transect: 3,
            quadrat: 4,
            name: 'Delete Test',
            count: 8
        };
        
        dataManager.createRecord(recordData);
        const initialCount = dataManager.getRecordCount();
        
        const result = dataManager.deleteRecord(0);
        
        expect(result).toBe(true);
        expect(dataManager.getRecordCount()).toBe(initialCount - 1);
    });

    /**
     * Test: Handle invalid index
     */
    test('should return null for invalid index', () => {
        const record = dataManager.getRecord(999);
        expect(record).toBeNull();
    });

    /**
     * Test: Search by name
     */
    test('should search records by name', () => {
        dataManager.createRecord({
            identification: 'TEST005',
            year: 2024,
            transect: 1,
            quadrat: 1,
            name: 'Species Alpha',
            count: 5
        });
        
        dataManager.createRecord({
            identification: 'TEST006',
            year: 2024,
            transect: 2,
            quadrat: 2,
            name: 'Species Beta',
            count: 10
        });
        
        const results = dataManager.searchByName('Alpha');
        
        expect(results.length).toBe(1);
        expect(results[0].name).toBe('Species Alpha');
    });
});