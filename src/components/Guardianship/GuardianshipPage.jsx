import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GuardianshipList from './GuardianshipList';
import GuardianshipForm from './GuardianshipForm';
import { useParams } from 'react-router-dom';

function GuardianshipPage() {
    const dispatch = useDispatch();
    const { partnerId, intakeId } = useParams();
    console.log('Displaying your Service Partner ID and IntakeId', partnerId, intakeId);

    const guardianships = useSelector((store) => store.guardianships);
    useEffect(() => {
        dispatch({ type: 'FETCH_GUARDIANSHIP' }); // Dispatch action to fetch guardianships
    }, [dispatch]);

    return (
        <div className="w3-container w3-margin">
            <h1 className="w3-text-teal">Guardianship Management</h1>
            <GuardianshipForm guardianship={undefined} partnerId={partnerId} intakeId={intakeId} /> {/* For adding new guardianship */}
            <GuardianshipList guardianships={guardianships} /> {/* To list all guardianships */}
        </div>
    );
}

export default GuardianshipPage;
