const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET route to retrieve all guardianships
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log(`in GET /guardianships`);
    const userId = req.user.id;

    console.log(`Logged in User`, userId);
    const queryText = `
    SELECT * FROM "guardianship";
    `;
    
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.error('Error in GET /guardianships', error);
            res.sendStatus(500);
        });
});

// POST route guardianship to create a 
// new guardianship for an existing form, service partner, and user ID

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(`in POST /guardianship`);
    const userId = req.user.id;
    const {
        courtOrderNumber,
        cpsWorkerName,
        cpsWorkerPhone,
        cpsWorkerEmail,
        servicePartnerId,
        formId
    } = req.body;

    console.log(`Logged in User`, userId);
    const queryText = `
        INSERT INTO guardianship (
            court_order_number,
            cps_worker_name,
            cps_worker_phone,
            cps_worker_email,
            service_partner_id,
            user_id,
            forms_aggregator_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING guardianship_id;
    `;
    
    pool.query(queryText, [courtOrderNumber, cpsWorkerName, cpsWorkerPhone, cpsWorkerEmail, servicePartnerId, userId, formId])
        .then(result => {
            const guardianshipId = result.rows[0].guardianship_id;
            console.log(`Guardianship inserted with ID: ${guardianshipId}`);
            res.sendStatus(201);
        })
        .catch(error => {
            console.error('Error in POST /guardianship', error);
            res.sendStatus(500);
        });
});


// PUT updating with the ID provided in the URL
router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log(`in PUT /guardianship/:id`);

    const guardianshipId = req.params.id;
    // const userId = req.user.id; // This is retrieved from the authenticated user session
    
    const {
        courtOrderNumber,
        cpsWorkerName,
        cpsWorkerPhone,
        cpsWorkerEmail
    } = req.body;

    // Check if formsAggregatorId is provided and is not null
    console.log('Request body:', req.body);
    
    
    const updateQuery = `
        UPDATE guardianship 
        SET 
            court_order_number = $1, 
            cps_worker_name = $2, 
            cps_worker_phone = $3, 
            cps_worker_email = $4
        WHERE guardianship_id = $5;
    `;

    const values = [
        
        courtOrderNumber, 
        cpsWorkerName, 
        cpsWorkerPhone, 
        cpsWorkerEmail, 
        guardianshipId
    ];

    pool.query(updateQuery, values)
        .then(() => res.sendStatus(200))
        .catch(error => {
            console.error('Error in PUT /guardianship', error);
            res.status(500).send('Error updating guardianship record');
        });
});

// DELETE with the ID provided in the URL
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log(`in DELETE /guardianship/:id`);

    const guardianshipId = req.params.id;
    // const userId = req.user.id; // This is retrieved from the authenticated user session
    console.log(`Guardianship ID:`, guardianshipId);

    
    
    
    const updateQuery = `
    DELETE FROM "guardianship"
    WHERE "guardianship_id" = $1;
    `;


    pool.query(updateQuery,[guardianshipId])
        .then(() => res.sendStatus(204))
        .catch(error => {
            console.error('Error in DELETE /guardianship', error);
            res.status(500).send('Error DELETING guardianship record');
        });
});


module.exports = router;
