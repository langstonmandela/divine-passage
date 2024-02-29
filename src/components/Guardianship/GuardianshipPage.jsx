import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GuardianshipList from './GuardianshipList';
import GuardianshipForm from './GuardianshipForm';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function GuardianshipPage() {
    const dispatch = useDispatch();
    const {partnerId, intakeId} = useParams();
    console.log('Diplaying your Service Partner ID and IntakeId', partnerId, intakeId);

    const guardianships = useSelector((store) => store.guardianships); 
    useEffect(() => {
        dispatch({ type: 'FETCH_GUARDIANSHIP' }); // Dispatch action to fetch guardianships
    }, [dispatch]);

    return (
        <>
            <h1>Guardianship Management</h1>
            <GuardianshipForm guardianship={undefined} partnerId={partnerId} intakeId={intakeId} /> {/* For adding new guardianship */}
            <GuardianshipList guardianships={guardianships} /> {/* To list all guardianships */}
        </>
    );
}

export default GuardianshipPage;
