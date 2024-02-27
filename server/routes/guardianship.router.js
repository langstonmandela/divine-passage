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
    SELECT * FROM "guardianship" WHERE "user_id" = $1;
    `;
    
    pool.query(queryText, [userId])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.error('Error in GET /guardianships', error);
            res.sendStatus(500);
        });
});


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




module.exports = router;
