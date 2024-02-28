import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// this component is to create a new service partner
function ServicePartnerForm({ partner }) {
  console.log('Partner', partner);
  const dispatch = useDispatch();
  //endpoint post /server_partner
  const dateStrip = (str) => {
    // '2024-02-27T06:00:00.000Z' strip off T -> end
    // the input cannot read the date w/ the time
    return str?.slice(0, str.indexOf('T'));
  };
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
    //dispatch a saga
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
    <div>
      <h2>Service Partner Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          required
          id='firstName'
          type='text'
          placeholder='First Name'
          value={profile.firstName}
          onChange={(event) =>
            setProfile({ ...profile, firstName: event.target.value })
          }
        />
        <input
          required
          id='nick_name'
          type='text'
          placeholder='Nick Name'
          value={profile.nick_name}
          onChange={(event) =>
            setProfile({ ...profile, nick_name: event.target.value })
          }
        />
        <input
          required
          id='lastName'
          type='text'
          placeholder='Last Name'
          value={profile.lastName}
          onChange={(event) =>
            setProfile({ ...profile, lastName: event.target.value })
          }
        />
        <input
          required
          id='dateOfBirth'
          type='date'
          placeholder='Date of Birth'
          value={profile.dateOfBirth}
          onChange={(event) =>
            setProfile({ ...profile, dateOfBirth: event.target.value })
          }
        />
        <input
          required
          id='gender'
          type='text'
          placeholder='Gender'
          value={profile.gender}
          onChange={(event) =>
            setProfile({ ...profile, gender: event.target.value })
          }
        />
        <input
          required
          id='dateOfPlacement'
          type='date'
          placeholder='Date of Placement'
          value={profile.dateOfPlacement}
          onChange={(event) =>
            setProfile({ ...profile, dateOfPlacement: event.target.value })
          }
        />

        <button>{partner ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
}

export default ServicePartnerForm;
