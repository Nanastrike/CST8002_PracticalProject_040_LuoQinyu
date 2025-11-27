/**
 * Express server for Record Management REST API
 * Course: CST8002
 * Practical Project Part 4
 * Author: Qinyu Luo
 */

import express from 'express';
import recordRoutes from './routes/recordRoutes.js';

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// API Routes
app.use('/api/records', recordRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Record Management API',
        version: '1.0.0',
        endpoints: {
            'GET /api/records': 'Get all records',
            'GET /api/records/:index': 'Get record by index',
            'POST /api/records': 'Create new record',
            'PUT /api/records/:index': 'Update record by index',
            'DELETE /api/records/:index': 'Delete record by index',
            'GET /api/records/search/:name': 'Search records by name',
            'POST /api/records/reload': 'Reload data from dataset',
            'POST /api/records/save': 'Save data to new file'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        message: `Cannot ${req.method} ${req.path}`
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`✓ Server is running on http://localhost:${PORT}`);
    console.log(`✓ API documentation available at http://localhost:${PORT}`);
});

export default app;