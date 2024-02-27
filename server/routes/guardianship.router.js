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

module.exports = router;
