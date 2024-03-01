import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function GuardianshipListItem({ guardianship }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = (guardianshipId) => {
        console.log(`Delete ${guardianshipId}`);
        dispatch({ type: 'DELETE_GUARDIANSHIP', payload: guardianshipId });
    };

    return (
        <li className="w3-padding">
            <h3 className="w3-text-teal">Guardianship Details:</h3>
            <p>Court Order Number: {guardianship.court_order_number}</p>
            <p>CPS Worker Name: {guardianship.cps_worker_name}</p>
            <p>CPS Worker Phone: {guardianship.cps_worker_phone}</p>
            <p>CPS Worker Email: {guardianship.cps_worker_email}</p>
            <p>Date Created: {new Date(guardianship.date_created).toLocaleDateString()}</p>
            <button 
                className="w3-button w3-teal w3-margin-right"
                onClick={() => history.push(`/guardianship/edit/${guardianship?.guardianship_id}`)}>
                Edit
            </button>
            <button 
                className="w3-button w3-red"
                onClick={() => handleDelete(guardianship.guardianship_id)}>
                Delete
            </button>
        </li>
    );
}

export default GuardianshipListItem;
