import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import GuardianshipList from '../Guardianship/GuardianshipList';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import IntakeList from './IntakeList';


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

        const handleIntake = () => {
            let newIntake = {
                form_type: 'intake form',
                status: 'pending',
                service_partner_id: myPartner.service_partner_id
            }
            dispatch({ type: 'CREATE_INTAKE' , payload: newIntake}); 
            console.log('In handle Intake', myPartner.service_partner_id);
        }
    return (
        <div className="container">
            <p>Intake Page for {myPartner?.first_name}</p>
            <IntakeList intakeForms={intakeForms} myPartner={myPartner}/> 
            <button onClick={() => handleIntake()}>Create New Intake</button>
            


                {guardianships?.length > 0 && <GuardianshipList guardianships={guardianships} /> }
        </div>
    );
}

export default IntakePage;
