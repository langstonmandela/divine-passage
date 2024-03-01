import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { dateStrip } from '../../utils/helper';
import { useHistory } from 'react-router-dom';

function ServicePartnerForm({ partner }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const initialProfile = {
        firstName: partner?.first_name ?? '',
        nick_name: partner?.nick_name ?? '',
        lastName: partner?.last_name ?? '',
        dateOfBirth: dateStrip(partner?.date_of_birth) ?? '',
        gender: partner?.gender ?? '',
        dateOfPlacement: dateStrip(partner?.date_of_placement) ?? '',
    };
    const [profile, setProfile] = useState(initialProfile);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (partner) {
            dispatch({
                type: 'UPDATE_SERVICE_PARTNER',
                payload: { ...profile, service_partner_id: partner.service_partner_id },
            });
        } else {
            dispatch({ type: 'CREATE_SERVICE_PARTNER', payload: profile });
            setProfile(initialProfile);
        }
        alert(`${profile.firstName}'s form to /service_partner`);
    };

    return (
        <div className="w3-container w3-margin">
            <h2 className="w3-text-teal">Service Partner Form</h2>
            <form className="w3-container" onSubmit={handleSubmit}>
                <label htmlFor="firstName" className="w3-text-teal">First Name</label>
                <input
                    className="w3-input w3-border"
                    required
                    id="firstName"
                    type="text"
                    value={profile.firstName}
                    onChange={(event) => setProfile({ ...profile, firstName: event.target.value })}
                />

                <label htmlFor="nick_name" className="w3-text-teal">Nick Name</label>
                <input
                    className="w3-input w3-border"
                    required
                    id="nick_name"
                    type="text"
                    value={profile.nick_name}
                    onChange={(event) => setProfile({ ...profile, nick_name: event.target.value })}
                />

                <label htmlFor="lastName" className="w3-text-teal">Last Name</label>
                <input
                    className="w3-input w3-border"
                    required
                    id="lastName"
                    type="text"
                    value={profile.lastName}
                    onChange={(event) => setProfile({ ...profile, lastName: event.target.value })}
                />

                <label htmlFor="dateOfBirth" className="w3-text-teal">Date of Birth</label>
                <input
                    className="w3-input w3-border"
                    required
                    id="dateOfBirth"
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(event) => setProfile({ ...profile, dateOfBirth: event.target.value })}
                />

                <label htmlFor="gender" className="w3-text-teal">Gender</label>
                <input
                    className="w3-input w3-border"
                    required
                    id="gender"
                    type="text"
                    value={profile.gender}
                    onChange={(event) => setProfile({ ...profile, gender: event.target.value })}
                />

                <label htmlFor="dateOfPlacement" className="w3-text-teal">Date of Placement</label>
                <input
                    className="w3-input w3-border"
                    required
                    id="dateOfPlacement"
                    type="date"
                    value={profile.dateOfPlacement}
                    onChange={(event) => setProfile({ ...profile, dateOfPlacement: event.target.value })}
                />

                <button className="w3-btn w3-teal w3-margin-top">{partner ? 'Update' : 'Create'}</button>
                <button
                    className="w3-button w3-khaki w3-margin-top w3-margin-left"
                    style={{ marginTop: '16px' }}
                    onClick={() => history.push('/service_partner/')}>Back to Provider List</button>
            </form>
        </div>
    );
}

export default ServicePartnerForm;
