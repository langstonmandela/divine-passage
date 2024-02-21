const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');



router.get('/', rejectUnauthenticated, (req, res) => {
    console.log(`in GET /child`);

    const userId = req.user.id;

    console.log(`Logged in User`, userId);
    const queryText = `
        SELECT cp.*
        FROM child_profile cp
        WHERE cp.user_id = $1;
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

module.exports = router;

// router.get('/child/:childId/profile', rejectUnauthenticated, (req, res) => {
//     console.log(`in GET`);
//     const childId = req.params.childId;
//     const queryText = `
//         SELECT *
//         FROM child_profile
//         WHERE child_id = $1;
//     `;

//     pool.query(queryText, [childId])
//     .then(result => {
//         // If no rows were returned, send a 404
//         if (result.rows.length === 0) {
//             return res.status(404).send('Profile not found.');
//         }
//         // Send back the first row's data as the child's profile
//         res.send(result.rows[0]);
//     })
//     .catch(error => {
//         console.error('Error in GET /child/:childId/profile', error);
//         res.sendStatus(500);
//     });
// });



// router.get('/child/:childId/profile', (req, res) => {
//     const childId = req.params.childId;
//     const queryText = `
//     SELECT json_build_object(
//         'childProfile', cp,
//         'guardianships', (SELECT json_agg(g) FROM guardianship g WHERE g.child_id = cp.child_id),
//         'healthHistories', (SELECT json_agg(hh) FROM health_history hh WHERE hh.child_id = cp.child_id),
//         'behavioralHistories', (SELECT json_agg(bh) FROM behavioral_history bh WHERE bh.child_id = cp.child_id),
//         'familyHistories', (SELECT json_agg(fh) FROM family_history fh WHERE fh.child_id = cp.child_id),
//         'consentForms', (SELECT json_agg(cf) FROM consent_forms cf WHERE cf.child_id = cp.child_id),
//         'financialResponsibilities', (SELECT json_agg(fr) FROM financial_responsibility fr WHERE fr.child_id = cp.child_id),
//         'authorizations', (SELECT json_agg(a) FROM authorization a WHERE a.child_id = cp.child_id)
//     )
//     FROM child_profile cp
//     WHERE cp.child_id = $1;
//     `;

//     pool.query(queryText, [childId])
//         .then(result => {
//             // If no rows were returned, send a 404
//             if (result.rows.length === 0) {
//                 return res.status(404).send('Profile not found.');
//             }
//             // Send back the first row's json_build_object column data
//             res.send(result.rows[0].json_build_object);
//         })
//         .catch(error => {
//             console.error('Error in GET /child/:childId/profile', error);
//             res.sendStatus(500);
//         });
// });

