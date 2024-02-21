const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route, full monty
 */
router.get('/', async (req, res) => {
  try {
    console.log('in GET route');
    const client = await pool.connect(); // Get a client from the pool
    const queryText =
      `SELECT json_build_object(
    'child_id', cp.child_id,
    'first_name', cp.first_name,
    'last_name', cp.last_name,
    'date_of_birth', cp.date_of_birth,
    'gender', cp.gender,
    'date_of_placement', cp.date_of_placement,
    'guardianships', g.guardianship_data,
    'health_histories', hh.health_history_data,
    'behavioral_histories', bh.behavioral_history_data,
    'family_histories', fh.family_history_data,
    'consent_forms', cf.consent_form_data,
    'financial_responsibilities', fr.financial_responsibility_data,
    'authorizations', a.authorization_data
) AS child_complete_profile
FROM child_profile cp
LEFT JOIN (
    SELECT child_id, json_agg(json_build_object(
        'guardianship_id', guardianship_id,
        'court_order_number', court_order_number,
        'cps_worker_name', cps_worker_name,
        'cps_worker_phone', cps_worker_phone,
        'cps_worker_email', cps_worker_email,
        'created_by_user_id', created_by_user_id,
        'date_created', date_created
    )) AS guardianship_data
    FROM guardianship
    GROUP BY child_id
) g ON cp.child_id = g.child_id
LEFT JOIN (
    SELECT child_id, json_agg(json_build_object(
        'health_history_id', health_history_id,
        'recent_doctor_visit', recent_doctor_visit,
        'current_pediatrician', current_pediatrician,
        'pediatrician_contact', pediatrician_contact,
        'dental_checkup', dental_checkup,
        'medications', medications,
        'chronic_illnesses', chronic_illnesses,
        'allergies', allergies,
        'birth_complications', birth_complications,
        'developmental_delays', developmental_delays,
        'created_by_user_id', created_by_user_id,
        'date_created', date_created
    )) AS health_history_data
    FROM health_history
    GROUP BY child_id
) hh ON cp.child_id = hh.child_id
LEFT JOIN (
    SELECT child_id, json_agg(json_build_object(
        'behavioral_history_id', behavioral_history_id,
        'reason_for_counseling', reason_for_counseling,
        'previous_therapy', previous_therapy,
        'trauma_history', trauma_history,
        'sexualized_behaviors', sexualized_behaviors,
        'bed_wetting', bed_wetting,
        'sleep_changes', sleep_changes,
        'appetite_changes', appetite_changes,
        'created_by_user_id', created_by_user_id,
        'date_created', date_created
    )) AS behavioral_history_data
    FROM behavioral_history
    GROUP BY child_id
) bh ON cp.child_id = bh.child_id
LEFT JOIN (
    SELECT child_id, json_agg(json_build_object(
        'family_history_id', family_history_id,
        'mental_health_issues', mental_health_issues,
        'substance_abuse_history', substance_abuse_history,
        'created_by_user_id', created_by_user_id,
        'date_created', date_created
    )) AS family_history_data
    FROM family_history
    GROUP BY child_id
) fh ON cp.child_id = fh.child_id
LEFT JOIN (
    SELECT child_id, json_agg(json_build_object(
        'consent_form_id', consent_form_id,
        'consent_type', consent_type,
        'consent_given', consent_given,
        'guardian_signature', guardian_signature,
        'date_signed', date_signed,
        'created_by_user_id', created_by_user_id,
        'date_created', date_created
    )) AS consent_form_data
    FROM consent_forms
    GROUP BY child_id
) cf ON cp.child_id = cf.child_id
LEFT JOIN (
    SELECT child_id, json_agg(json_build_object(
        'financial_responsibility_id', financial_responsibility_id,
        'insurance_provider', insurance_provider,
        'insurance_id', insurance_id,
        'medicaid_id', medicaid_id,
        'fiscal_responsibility', fiscal_responsibility,
        'created_by_user_id', created_by_user_id,
        'date_created', date_created
            )) AS financial_responsibility_data
    FROM financial_responsibility
    GROUP BY child_id
) fr ON cp.child_id = fr.child_id
LEFT JOIN (
    SELECT child_id, json_agg(json_build_object(
        'authorization_id', authorization_id,
        'authorization_type', authorization_type,
        'authorized_party', authorized_party,
        'disclosure_details', disclosure_details,
        'created_by_user_id', created_by_user_id,
        'date_created', date_created
    )) AS authorization_data
    FROM authorization
    GROUP BY child_id
) a ON cp.child_id = a.child_id`
      ;
    const result = await client.query(queryText);
    client.release(); // Release the client back to the pool
    res.json(result.rows.map(row => row.child_complete_profile));
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
