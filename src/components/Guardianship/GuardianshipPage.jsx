import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GuardianshipList from './GuardianshipList';
import GuardianshipForm from './GuardianshipForm';

function GuardianshipPage() {
    const dispatch = useDispatch();
    const guardianships = useSelector((store) => store.guardianships); 
    useEffect(() => {
        dispatch({ type: 'FETCH_GUARDIANSHIP' }); // Dispatch action to fetch guardianships
    }, [dispatch]);

    return (
        <>
            <h1>Guardianship Management</h1>
            <GuardianshipForm guardianship={undefined} /> {/* For adding new guardianship */}
            <GuardianshipList guardianships={guardianships} /> {/* To list all guardianships */}
        </>
    );
}

export default GuardianshipPage;
