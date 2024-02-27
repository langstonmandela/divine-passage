const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(`in POST /forms_aggregator`);
    const userId = req.user.id;
    const {
        form_type,
        status,
        service_partner_id
    } = req.body;

    console.log(`Logged in User`, userId);
    const queryText = `
    INSERT INTO "forms_aggregator" ("user_id", "service_partner_id", "form_type", "status" )
    VALUES ($1, $2, $3, $4) 
    RETURNING "forms_aggregator_id";
    `
    

    pool.query(queryText, [userId, service_partner_id, form_type, status])
        .then(result => {
        const formsAggregatorId = result.rows[0].forms_aggregator_id;
        console.log(`you've created a packet with id ${formsAggregatorId}`);
            
            pool.query()// Here we will take the Returned form agg id and use that to insert on the guardianship table
            res.sendStatus(201);
        })
        .catch(error => {
            console.error('Error in POST /user/:userId/service_partner', error);
            res.sendStatus(500);
        });
});

module.exports = router;
