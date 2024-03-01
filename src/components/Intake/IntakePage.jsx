import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GuardianshipList from '../Guardianship/GuardianshipList';
import { useSelector, useDispatch } from 'react-redux';
import IntakeList from './IntakeList';

function IntakePage() {
    const { partnerId } = useParams();
    const dispatch = useDispatch();
    const intakeForms = useSelector((store) => store.intakeReducer);
    const guardianships = useSelector((store) => store.guardianships);
    const partners = useSelector((store) => store.servicePartners);
    const myPartner = partners?.find(partner => Number(partner.service_partner_id) === Number(partnerId));

    useEffect(() => {
        // dispatch({ type: 'FETCH_INTAKE' });
        // dispatch({ type: 'FETCH_GUARDIANSHIP' });
        // dispatch({ type: 'FETCH_SERVICE_PARTNER' }); // Ensuring action type is consistent with expected Redux action
    }, [dispatch]);

    const handleIntake = () => {
        let newIntake = {
            form_type: 'intake form',
            status: 'pending',
            service_partner_id: myPartner.service_partner_id
        };
        dispatch({ type: 'CREATE_INTAKE', payload: newIntake });
    };

    return (
        <div className="w3-container w3-margin">
            <p className="w3-large">Intake Page for {myPartner?.first_name}</p>
            <IntakeList intakeForms={intakeForms} myPartner={myPartner} />
            <button className="w3-button w3-teal w3-margin" onClick={handleIntake}>Create New Intake</button>
            {guardianships?.length > 0 && <GuardianshipList guardianships={guardianships} />}
        </div>
    );
}

export default IntakePage;
