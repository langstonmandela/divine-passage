const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');



router.get('/', rejectUnauthenticated, (req, res) => {
    console.log(`in GET /service_partner`);

    const userId = req.user.id;

    console.log(`Logged in User`, userId);
    const queryText = `
    SELECT * FROM "service_partner" WHERE "user_id" = $1;
    `
    

    pool.query(queryText, [userId])
        .then(result => {
            // If no rows were returned, send a 404
            if (result.rows.length === 0) {
                return res.status(404).send('No children found for this user.');
            }
            // Send back all child profiles associated with the user
            res.send(result.rows);
        })
        .catch(error => {
            console.error('Error in GET /user/:userId/service_partner', error);
            res.sendStatus(500);
        });
});

router.post('/', rejectUnauthenticated, async (req, res) => {
    console.log(`in POST /service_partner`);
    const userId = req.user.id; // User ID from Passport session
    const { firstName, lastName, nick_name, dateOfBirth, gender, dateOfPlacement } = req.body;

    try {
        const queryText = `
            INSERT INTO service_partner (first_name, last_name, nick_name, date_of_birth, gender, date_of_placement, user_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING service_partner_id`;
        const { rows } = await pool.query(queryText, [firstName, lastName, nick_name, dateOfBirth, gender, dateOfPlacement, userId]);
        res.status(201).json({ servicePartnerId: rows[0].service_partner_id, message: 'Child profile created successfully' });
    } catch (error) {
        console.error('Error in POST /service_partner', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;


