import { useDispatch } from "react-redux";


function GuardianshipListItem({ guardianship }) {
    const dispatch = useDispatch();
    const handleDelete = (guardianshipId) => {
    console.log(`Delete ${guardianshipId}`)
    
    dispatch({ type: 'DELETE_GUARDIANSHIP', payload: guardianshipId });

    }
    return (
        <li>
            <h3>Guardianship Details:</h3>
            <p>Court Order Number: {guardianship.court_order_number}</p>
            <p>CPS Worker Name: {guardianship.cps_worker_name}</p>
            <p>CPS Worker Phone: {guardianship.cps_worker_phone}</p>
            <p>CPS Worker Email: {guardianship.cps_worker_email}</p>
            <p>Date Created: {new Date(guardianship.date_created).toLocaleDateString()}</p>
            <button onClick={() => handleDelete(guardianship.guardianship_id)}>Delete</button>
        </li>
    );
}

export default GuardianshipListItem;
