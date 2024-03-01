import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { dateStrip } from '../../utils/helper';

function GuardianshipForm({ guardianship, partnerId, intakeId }) {
  const dispatch = useDispatch();

  const initialGuardianship = {
    courtOrderNumber: guardianship?.court_order_number ?? '',
    cpsWorkerName: guardianship?.cps_worker_name ?? '',
    cpsWorkerPhone: guardianship?.cps_worker_phone ?? '',
    cpsWorkerEmail: guardianship?.cps_worker_email ?? '',
    servicePartnerId: guardianship?.service_partner_id ?? partnerId,
    formId: guardianship?.forms_aggregator_id ?? intakeId,
  };
  const [guardianshipData, setGuardianshipData] = useState(initialGuardianship);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (guardianship) {
      dispatch({
        type: 'UPDATE_GUARDIANSHIP',
        payload: {
          ...guardianshipData,
          guardianshipId: guardianship.guardianship_id,
        },
      });
    } else {
      dispatch({ type: 'CREATE_GUARDIANSHIP', payload: guardianshipData });
      setGuardianshipData(initialGuardianship);
    }
    alert(`${guardianshipData.servicePartnerId}'s Guardianship form to /guardianship`);
  };

  return (
    <div className="w3-container w3-margin">
      <h2 className="w3-text-teal">Guardianship Form</h2>
      <form className="w3-container" onSubmit={handleSubmit}>
        <label htmlFor="courtOrderNumber" className="w3-text-teal">Court Order Number</label>
        <input
          className="w3-input w3-border"
          required
          id="courtOrderNumber"
          type="text"
          placeholder="Court Order Number"
          value={guardianshipData.courtOrderNumber}
          onChange={(event) => setGuardianshipData({ ...guardianshipData, courtOrderNumber: event.target.value })}
        />

        <label htmlFor="cpsWorkerName" className="w3-text-teal">CPS Worker Name</label>
        <input
          className="w3-input w3-border"
          required
          id="cpsWorkerName"
          type="text"
          placeholder="CPS Worker Name"
          value={guardianshipData.cpsWorkerName}
          onChange={(event) => setGuardianshipData({ ...guardianshipData, cpsWorkerName: event.target.value })}
        />

        <label htmlFor="cpsWorkerPhone" className="w3-text-teal">CPS Worker Phone</label>
        <input
          className="w3-input w3-border"
          required
          id="cpsWorkerPhone"
          type="text"
          placeholder="CPS Worker Phone"
          value={guardianshipData.cpsWorkerPhone}
          onChange={(event) => setGuardianshipData({ ...guardianshipData, cpsWorkerPhone: event.target.value })}
        />

        <label htmlFor="cpsWorkerEmail" className="w3-text-teal">CPS Worker Email</label>
        <input
          className="w3-input w3-border"
          required
          id="cpsWorkerEmail"
          type="email"
          placeholder="CPS Worker Email"
          value={guardianshipData.cpsWorkerEmail}
          onChange={(event) => setGuardianshipData({ ...guardianshipData, cpsWorkerEmail: event.target.value })}
        />

        <button className="w3-btn w3-teal w3-margin-top" type="submit">{guardianship ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
}

export default GuardianshipForm;
