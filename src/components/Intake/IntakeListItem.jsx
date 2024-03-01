import React from 'react';
import { useHistory } from 'react-router-dom';

function IntakeListItem({ intakeForm, myPartner }) {
    const history = useHistory();
    return (
        <li className="w3-padding">
            <h3>Intake Form Details: {intakeForm.forms_aggregator_id}</h3>
            <button className="w3-button w3-teal" onClick={() => history.push(`/guardianship/${myPartner.service_partner_id}/${intakeForm.forms_aggregator_id}`)}>Add Guardianship +</button>
        </li>
    );
}

export default IntakeListItem;
