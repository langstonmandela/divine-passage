import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import GuardianshipList from '../Guardianship/GuardianshipList';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import intakeReducer from '../../redux/reducers/intake.reducer';



function IntakePage() {
    const {partnerId} = useParams()
    const dispatch = useDispatch()
    console.log(partnerId);
    const intakeForms = useSelector((store) => store.intakeReducer);
    console.log('This is intakes ', intakeForms);
    const guardianships = useSelector((store) => store.guardianships);
    const partners = useSelector((store) => store.servicePartners);
    // console.log("partners", partners);
    const myPartner = partners?.find((partner) => Number(partner.service_partner_id) === Number(partnerId));
    console.log("myPartner", myPartner);
    useEffect(() => {
        dispatch({ type: 'FETCH_INTAKE' }); // Dispatch action to fetch intakes
        dispatch({ type: 'FETCH_GUARDIANSHIP' }); // Dispatch action to fetch guardianships
    }, [dispatch]); 
    return (
        <div className="container">
            <p>Intake Page for {myPartner?.first_name}</p>
            <button>Create New Intake</button>
            <button onClick={() => history.push(`/guardianship/`)}>
                    Add Guardianship +
                </button>


                {guardianships?.length > 0 && <GuardianshipList guardianships={guardianships} /> }
        </div>
    );
}

export default IntakePage;
