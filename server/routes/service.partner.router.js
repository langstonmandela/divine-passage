const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  console.log(`in GET /service_partner`);
  const queryText = `
    SELECT * FROM "service_partner";
    `;
  pool
    .query(queryText)
    .then((result) => {
      // Send back all service partner profiles
      res.send(result.rows);
    })
    .catch((error) => {
      console.error('Error in GET /service_partner', error);
      res.sendStatus(500);
    });
});

router.post('/', rejectUnauthenticated, async (req, res) => {
  console.log(`in POST /service_partner`);
  const userId = req.user.id; // User ID from Passport session
  const {
    firstName,
    lastName,
    nick_name,
    dateOfBirth,
    gender,
    dateOfPlacement,
  } = req.body;

  try {
    const queryText = `
            INSERT INTO service_partner (first_name, last_name, nick_name, date_of_birth, gender, date_of_placement, user_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING service_partner_id`;
    const { rows } = await pool.query(queryText, [
      firstName,
      lastName,
      nick_name,
      dateOfBirth,
      gender,
      dateOfPlacement,
      userId,
    ]);
    res.status(201).json({
      servicePartnerId: rows[0].service_partner_id,
      message: 'Child profile created successfully',
    });
  } catch (error) {
    console.error('Error in POST /service_partner', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', rejectUnauthenticated, async (req, res) => {
  console.log(`in PUT /service_partner`);
  const userId = req.user.id; // User ID from Passport session
  const servicePartnerId = req.params.id;
  // const { firstName, lastName, nick_name, dateOfBirth, gender, dateOfPlacement } = req.body; //USE THIS to complete the PUT when ready to refactor
  const { nick_name } = req.body;

  try {
    const queryText = `
        UPDATE "service_partner"
        SET "nick_name" = $2
        WHERE "user_id" = $1 and "service_partner_id" = $3;
        `;
    pool
      .query(queryText, [userId, nick_name, servicePartnerId])
      .then((result) => {
        // Return 201 upon successful UPDATE
        return res
          .status(201)
          .send(`Updated Service Partner ${servicePartnerId}`);
      })
      .catch((error) => {
        console.error('Error in GET /user/:userId/service_partner', error);
        res.sendStatus(500);
      });
  } catch (error) {
    console.error('Error in PUT /service_partner', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
