import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function IntakeListItem ({ intakeForm, myPartner }) {
    const history = useHistory();
    return (
        <li>
            <h3>Intake Form Details: {intakeForm.forms_aggregator_id} </h3>
            <button onClick={() => history.push(`/guardianship/${myPartner.service_partner_id}/${intakeForm.forms_aggregator_id}`)}>Add Guardianship +</button>

        </li>
    );
}

export default IntakeListItem;
