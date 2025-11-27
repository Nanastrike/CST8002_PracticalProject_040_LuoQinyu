/**
 * Record Routes - REST API endpoints
 * Course: CST8002
 * Practical Project Part 4
 * Author: Qinyu Luo
 */

import express from 'express';
import DataManager from '../business/DataManager.js';

const router = express.Router();
const dataManager = new DataManager();

// Load initial data when routes are initialized
dataManager.loadData();

/**
 * GET /api/records
 * Get all records
 */
router.get('/', (req, res) => {
    try {
        const records = dataManager.getAllRecords();
        res.json({
            success: true,
            count: records.length,
            data: records
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve records',
            message: error.message
        });
    }
});

/**
 * GET /api/records/:index
 * Get a single record by index
 */
router.get('/:index', (req, res) => {
    try {
        const index = parseInt(req.params.index);
        
        if (isNaN(index)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid index',
                message: 'Index must be a number'
            });
        }

        const record = dataManager.getRecord(index);
        
        if (!record) {
            return res.status(404).json({
                success: false,
                error: 'Record not found',
                message: `No record found at index ${index}`
            });
        }

        res.json({
            success: true,
            data: record
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve record',
            message: error.message
        });
    }
});

/**
 * POST /api/records
 * Create a new record
 */
router.post('/', (req, res) => {
    try {
        const { identification, year, transect, quadrat, name, count } = req.body;

        // Validate required fields
        if (!identification || !year || !transect || !quadrat || !name || count === undefined) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields',
                message: 'All fields are required: identification, year, transect, quadrat, name, count'
            });
        }

        const success = dataManager.createRecord(req.body);

        if (success) {
            const newIndex = dataManager.getRecordCount() - 1;
            res.status(201).json({
                success: true,
                message: 'Record created successfully',
                index: newIndex,
                data: dataManager.getRecord(newIndex)
            });
        } else {
            res.status(400).json({
                success: false,
                error: 'Failed to create record',
                message: 'Invalid record data'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to create record',
            message: error.message
        });
    }
});

/**
 * PUT /api/records/:index
 * Update an existing record
 */
router.put('/:index', (req, res) => {
    try {
        const index = parseInt(req.params.index);

        if (isNaN(index)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid index',
                message: 'Index must be a number'
            });
        }

        const { identification, year, transect, quadrat, name, count } = req.body;

        // Validate required fields
        if (!identification || !year || !transect || !quadrat || !name || count === undefined) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields',
                message: 'All fields are required: identification, year, transect, quadrat, name, count'
            });
        }

        const success = dataManager.updateRecord(index, req.body);

        if (success) {
            res.json({
                success: true,
                message: 'Record updated successfully',
                data: dataManager.getRecord(index)
            });
        } else {
            res.status(404).json({
                success: false,
                error: 'Record not found',
                message: `No record found at index ${index}`
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to update record',
            message: error.message
        });
    }
});

/**
 * DELETE /api/records/:index
 * Delete a record
 */
router.delete('/:index', (req, res) => {
    try {
        const index = parseInt(req.params.index);

        if (isNaN(index)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid index',
                message: 'Index must be a number'
            });
        }

        const success = dataManager.deleteRecord(index);

        if (success) {
            res.json({
                success: true,
                message: `Record at index ${index} deleted successfully`
            });
        } else {
            res.status(404).json({
                success: false,
                error: 'Record not found',
                message: `No record found at index ${index}`
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to delete record',
            message: error.message
        });
    }
});

/**
 * GET /api/records/search/:name
 * Search records by name
 */
router.get('/search/:name', (req, res) => {
    try {
        const searchName = req.params.name;
        const results = dataManager.searchByName(searchName);

        res.json({
            success: true,
            count: results.length,
            searchTerm: searchName,
            data: results
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Search failed',
            message: error.message
        });
    }
});

/**
 * POST /api/records/reload
 * Reload data from dataset
 */
router.post('/reload', (req, res) => {
    try {
        const success = dataManager.reloadData();

        if (success) {
            res.json({
                success: true,
                message: 'Data reloaded successfully',
                count: dataManager.getRecordCount()
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Failed to reload data'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to reload data',
            message: error.message
        });
    }
});

/**
 * POST /api/records/save
 * Save current records to a new file
 */
router.post('/save', (req, res) => {
    try {
        const filePath = dataManager.saveData();

        if (filePath) {
            res.json({
                success: true,
                message: 'Data saved successfully',
                filePath: filePath
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Failed to save data'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to save data',
            message: error.message
        });
    }
});

export default router;