const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// POST route to add a new guardianship
router.post('/', rejectUnauthenticated, async (req, res) => {
    console.log(`in POST /guardianship`);
    
    // Extract guardianship data from the request body
    const {
        courtOrderNumber,
        cpsWorkerName,
        cpsWorkerPhone,
        cpsWorkerEmail,
        servicePartnerId,
        formId
    } = req.body;

    const userId = req.user.id; // User ID from Passport session

    
    try {
        const guardianshipQuery = `
            INSERT INTO guardianship (
                court_order_number,
                cps_worker_name,
                cps_worker_phone,
                cps_worker_email,
                child_id,
                user_id,
                form_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING guardianship_id;
        `;
        await pool.query();

        // Insert the new guardianship record and return its ID

        const guardianshipParams = [
            courtOrderNumber,
            cpsWorkerName,
            cpsWorkerPhone,
            cpsWorkerEmail,
            servicePartnerId,
            userId,
            formId
        ];

        const guardianshipResult = await pool.query(guardianshipQuery, guardianshipParams);
        const guardianshipId = guardianshipResult.rows[0].guardianship_id;

        // We will use guardianshipId, servicePartnerId, userId to insert later
        res.status(201).json({ guardianshipId: guardianshipId, message: 'Guardianship record created successfully' });

        
    } catch (error) {
        console.error('Error in POST /guardianship', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE route to remove a guardianship by its ID
router.delete('/:id', rejectUnauthenticated, async (req, res) => {
    console.log(`in DELETE /guardianship/:guardianshipId`);
    
    // Extract the guardianship ID from the request parameters
    const guardianshipId = req.params.guardianshipId;
    const userId = req.user.id; // User ID from Passport session
    console.log(`in DELETE:`, guardianshipId, userId);
    try {
        const deleteQuery = `
            DELETE FROM guardianship 
            WHERE guardianship_id = $1 
            AND user_id = $2; // Ensure that only the authenticated user can delete their records
        `;

        const deleteResult = await pool.query(deleteQuery, [guardianshipId, userId]);
        if (deleteResult.rowCount > 0) {
            res.status(204).end(); // 204 No Content is appropriate for a successful DELETE request
        } else {
            res.status(404).json({ error: 'Guardianship record not found or not authorized to delete.' });
        }
    } catch (error) {
        console.error('Error in DELETE /guardianship/:guardianshipId', error); 
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
