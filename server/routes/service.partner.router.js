const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');



router.get('/', rejectUnauthenticated, (req, res) => {
    console.log(`in GET /service_partner`);

    const userId = req.user.id;

    console.log(`Logged in User`, userId);
    const queryText = `
    SELECT 
    "service_partner".*, 
    -- Behavioral history subquery
    (SELECT coalesce(jsonb_agg(bh), '[]'::jsonb) 
    FROM "behavioral_history" bh
    WHERE bh."service_partner_id" = "service_partner"."service_partner_id") AS behavioral_history,
    
    -- Guardianship subquery
    (SELECT coalesce(jsonb_agg(g), '[]'::jsonb) 
    FROM "guardianship" g
    WHERE g."service_partner_id" = "service_partner"."service_partner_id") AS guardianship,
    
    -- Health Histories subquery
    (SELECT coalesce(jsonb_agg(hh), '[]'::jsonb) 
    FROM "health_history" hh
    WHERE hh."service_partner_id" = "service_partner"."service_partner_id") AS health_histories,
    
    -- Family Histories subquery
    (SELECT coalesce(jsonb_agg(fh), '[]'::jsonb) 
    FROM "family_history" fh
    WHERE fh."service_partner_id" = "service_partner"."service_partner_id") AS family_histories,

    -- Consent Forms subquery
    (SELECT coalesce(jsonb_agg(cf), '[]'::jsonb) 
    FROM "consent_forms" cf
    WHERE cf."service_partner_id" = "service_partner"."service_partner_id") AS consent_forms,
    
    -- Financial Responsibilities subquery
    (SELECT coalesce(jsonb_agg(fr), '[]'::jsonb) 
    FROM "financial_responsibility" fr
    WHERE fr."service_partner_id" = "service_partner"."service_partner_id") AS financial_responsibilities,
    
    -- Authorizations subquery
    (SELECT coalesce(jsonb_agg(a), '[]'::jsonb) 
    FROM "authorizations" a
    WHERE a."service_partner_id" = "service_partner"."service_partner_id") AS authorizations

    FROM "service_partner"
    WHERE "service_partner"."user_id" = $1  -- Filter by logged-in user's ID
    ORDER BY "service_partner_id";
    `;

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


