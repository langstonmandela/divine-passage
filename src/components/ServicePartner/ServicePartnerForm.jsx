import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { dateStrip } from '../../utils/helper';

function ServicePartnerForm({ partner }) {
    console.log('Partner', partner);
    const dispatch = useDispatch();

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
                <p>
                    <input
                        className="w3-input w3-border"
                        required
                        id="firstName"
                        type="text"
                        placeholder="First Name"
                        value={profile.firstName}
                        onChange={(event) =>
                            setProfile({ ...profile, firstName: event.target.value })
                        }
                    />
                </p>
                <p>
                    <input
                        className="w3-input w3-border"
                        required
                        id="nick_name"
                        type="text"
                        placeholder="Nick Name"
                        value={profile.nick_name}
                        onChange={(event) =>
                            setProfile({ ...profile, nick_name: event.target.value })
                        }
                    />
                </p>
                <p>
                    <input
                        className="w3-input w3-border"
                        required
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={profile.lastName}
                        onChange={(event) =>
                            setProfile({ ...profile, lastName: event.target.value })
                        }
                    />
                </p>
                <p>
                    <input
                        className="w3-input w3-border"
                        required
                        id="dateOfBirth"
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(event) =>
                            setProfile({ ...profile, dateOfBirth: event.target.value })
                        }
                    />
                </p>
                <p>
                    <input
                        className="w3-input w3-border"
                        required
                        id="gender"
                        type="text"
                        placeholder="Gender"
                        value={profile.gender}
                        onChange={(event) =>
                            setProfile({ ...profile, gender: event.target.value })
                        }
                    />
                </p>
                <p>
                    <input
                        className="w3-input w3-border"
                        required
                        id="dateOfPlacement"
                        type="date"
                        value={profile.dateOfPlacement}
                        onChange={(event) =>
                            setProfile({ ...profile, dateOfPlacement: event.target.value })
                        }
                    />
                </p>
                <p>
                    <button className="w3-btn w3-teal">{partner ? 'Update' : 'Create'}</button>
                </p>
            </form>
        </div>
    );
}

export default ServicePartnerForm;
