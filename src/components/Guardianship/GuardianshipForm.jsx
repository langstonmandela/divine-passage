import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { dateStrip } from '../../utils/helper';

function GuardianshipForm({ guardianship }) {
    const dispatch = useDispatch();
    const [servicePartners, setServicePartners] = useState([]);
    const initialGuardianship = {
        courtOrderNumber: guardianship?.court_order_number ?? '',
        cpsWorkerName: guardianship?.cps_worker_name ?? '',
        cpsWorkerPhone: guardianship?.cps_worker_phone ?? '',
        cpsWorkerEmail: guardianship?.cps_worker_email ?? '',
        servicePartnerId: guardianship?.service_partner_id ?? '',
    };
    const [guardianshipData, setGuardianshipData] = useState(initialGuardianship);


    const handleSubmit = (event) => {
        event.preventDefault();
        // dispatch saga
        if (guardianship) {
            dispatch({
                type: 'UPDATE_GUARDIANSHIP',
                payload: { ...guardianshipData, guardianship_id: guardianship.guardianship_id },
            });
        } else {
            dispatch({ type: 'CREATE_GUARDIANSHIP', payload: guardianshipData });
            setGuardianshipData(initialGuardianship);
        }
        alert(`${guardianshipData.servicePartnerId}'s Guardianship form to /guardianship`)
    };


    return (
        <div>
            <h2>Guardianship Form</h2>
            <form onSubmit={handleSubmit}>
            <input
                    required
                    id="courtOrderNumber"
                    type="text"
                    placeholder="Court Order Number"
                    value={guardianshipData.courtOrderNumber}
                    onChange={(event) => setGuardianshipData({ ...guardianshipData, courtOrderNumber: event.target.value })}
                />
                <input
                    required
                    id="cpsWorkerName"
                    type="text"
                    placeholder="CPS Worker Name"
                    value={guardianshipData.cpsWorkerName}
                    onChange={(event) => setGuardianshipData({ ...guardianshipData, cpsWorkerName: event.target.value })}
                />
                <input
                    required
                    id="cpsWorkerPhone"
                    type="text"
                    placeholder="CPS Worker Phone"
                    value={guardianshipData.cpsWorkerPhone}
                    onChange={(event) => setGuardianshipData({ ...guardianshipData, cpsWorkerPhone: event.target.value })}
                />
                <input
                    required
                    id="cpsWorkerEmail"
                    type="email"
                    placeholder="CPS Worker Email"
                    value={guardianshipData.cpsWorkerEmail}
                    onChange={(event) => setGuardianshipData({ ...guardianshipData, cpsWorkerEmail: event.target.value })}
                />
                <select
                    required
                    id="servicePartnerId"
                    value={guardianshipData.servicePartnerId}
                    onChange={(event) => setGuardianshipData({ ...guardianshipData, servicePartnerId: event.target.value })}
                >
                    <option value="">Select Service Partner</option>
                    {servicePartners.map((partner) => (
                        <option key={partner.id} value={partner.id}>
                            {partner.name}
                        </option>
                    ))}
                </select>
                
                <button type="submit">{guardianship ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
}

export default GuardianshipForm;
