const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');



router.get('/', rejectUnauthenticated, (req, res) => {
    console.log(`in GET /child`);

    const userId = req.user.id;

    console.log(`Logged in User`, userId);
    const queryText = `
    SELECT 
    "child_profile".*, 
    -- Behavioral history subquery
    (SELECT coalesce(jsonb_agg(bh), '[]'::jsonb) 
    FROM "behavioral_history" bh
    WHERE bh."child_id" = "child_profile"."child_id") AS behavioral_history,
    
    -- Guardianship subquery
    (SELECT coalesce(jsonb_agg(g), '[]'::jsonb) 
    FROM "guardianship" g
    WHERE g."child_id" = "child_profile"."child_id") AS guardianship,
    
    -- Health Histories subquery
    (SELECT coalesce(jsonb_agg(hh), '[]'::jsonb) 
    FROM "health_history" hh
    WHERE hh."child_id" = "child_profile"."child_id") AS health_histories,
    
    -- Family Histories subquery
    (SELECT coalesce(jsonb_agg(fh), '[]'::jsonb) 
    FROM "family_history" fh
    WHERE fh."child_id" = "child_profile"."child_id") AS family_histories,

    -- Consent Forms subquery
    (SELECT coalesce(jsonb_agg(cf), '[]'::jsonb) 
    FROM "consent_forms" cf
    WHERE cf."child_id" = "child_profile"."child_id") AS consent_forms,
    
    -- Financial Responsibilities subquery
    (SELECT coalesce(jsonb_agg(fr), '[]'::jsonb) 
    FROM "financial_responsibility" fr
    WHERE fr."child_id" = "child_profile"."child_id") AS financial_responsibilities,
    
    -- Authorizations subquery
    (SELECT coalesce(jsonb_agg(a), '[]'::jsonb) 
    FROM "authorizations" a
    WHERE a."child_id" = "child_profile"."child_id") AS authorizations

    FROM "child_profile"
    WHERE "child_profile"."user_id" = $1  -- Filter by logged-in user's ID
    ORDER BY "child_id";
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
            console.error('Error in GET /user/:userId/children', error);
            res.sendStatus(500);
        });
});

router.put('/child/:childId', rejectUnauthenticated, async (req, res) => {
    const { firstName, lastName, dateOfBirth, gender, dateOfPlacement } = req.body;
    const { childId } = req.params;

    const queryText = `
        UPDATE child_profile 
        SET first_name = $1, last_name = $2, date_of_birth = $3, gender = $4, date_of_placement = $5
        WHERE child_id = $6 AND user_id = $7;`;

    try {
        await pool.query(queryText, [firstName, lastName, dateOfBirth, gender, dateOfPlacement, childId, req.user.id]);
        res.send({ message: 'Child profile updated successfully' });
    } catch (error) {
        console.error('Error in PUT /child/:childId', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// router.post('/', rejectUnauthenticated, async (req, res) => {
//     console.log(`in POST /child`);
//     const userId = req.user.id; // User ID from authentication
//     const {
//         firstName,
//         lastName,
//         nickName,
//         dateOfBirth,
//         gender,
//         dateOfPlacement,
//         guardianships,
//         behavioralHistories,
//         formType, 
//         status = 'pending' 
//     } = req.body;

//     try {
//         await pool.query('BEGIN'); // Start transaction

//         // Insert into child_profile
//         const childProfileQuery = `
//             INSERT INTO child_profile (first_name, nick_name, last_name, date_of_birth, gender, date_of_placement, user_id, date_created)
//             VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP) RETURNING child_id`;
//         const childProfileResult = await pool.query(childProfileQuery, [firstName, nickName, lastName, dateOfBirth, gender, dateOfPlacement, userId]);
//         const childId = childProfileResult.rows[0].child_id;

//         // Insert into forms table and get form_id
//         const formQuery = `
//             INSERT INTO forms (user_id, child_id, submission_date, form_type, date_created, status)
//             VALUES ($1, $2, CURRENT_TIMESTAMP, $3, CURRENT_TIMESTAMP, $4) RETURNING form_id`;
//         const formResult = await pool.query(formQuery, [userId, childId, formType, status]);
//         const formId = formResult.rows[0].form_id;

//         // Insert into behavioral_history
//         behavioralHistories.forEach(async (bh) => {
//             const bhQuery = `
//                 INSERT INTO behavioral_history (user_id, child_id, form_id, reason_for_counseling, previous_therapy, trauma_history, sexualized_behaviors, bed_wetting, sleep_changes, appetite_changes, date_created)
//                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP)`;
//             await pool.query(bhQuery, [userId, childId, formId, bh.reason_for_counseling, bh.previous_therapy, bh.trauma_history, bh.sexualized_behaviors, bh.bed_wetting, bh.sleep_changes, bh.appetite_changes]);
//         });

//         // Insert into guardianship 
//         guardianships.forEach(async (g) => {
//             const gQuery = `
//                 INSERT INTO guardianship (user_id, child_id, form_id, court_order_number, cps_worker_name, cps_worker_phone, cps_worker_email, date_created)
//                 VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP)`;
//             await pool.query(gQuery, [userId, childId, formId, g.court_order_number, g.cps_worker_name, g.cps_worker_phone, g.cps_worker_email]);
//         });

//         await pool.query('COMMIT'); // Commit transaction
//         res.status(201).json({ message: 'New child profile and related records successfully created', childId, formId });
//     } catch (error) {
//         await pool.query('ROLLBACK'); // Rollback transaction on error
//         console.error('Error in POST /child', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });





module.exports = router;


