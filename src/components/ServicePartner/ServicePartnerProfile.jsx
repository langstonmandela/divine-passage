import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ServicePartnerForm from './ServicePartnerForm';

function ServicePartnerProfile() {
  const history = useHistory();
  const { partnerId } = useParams();
  console.log(`${partnerId} id page`);
  const partners = useSelector((store) => store.service_partner);
  console.log('Profile', partners);
  const partner = partners.find(
    (partner) => Number(partner.service_partner_id) === Number(partnerId)
  );
  console.log(`Profile Page for ${partner?.first_name}`);

  // useEffect(() => {
  //   console.log('load the profile page');
  // }, []);

  return (
    <div>
      <button onClick={() => history.push('/service_partner')}>
        Back to Service Partners
      </button>
      <p> Profile {partner?.first_name}</p>
      <ServicePartnerForm partner={partner} />
      <hr />
      <div>
        <button onClick={() => history.push(`/form_aggregator/${partnerId}`)}>
          Start Form Aggregator for {partner?.first_name}
        </button>
        <button onClick={() => history.push(`/guardianship/${partnerId}`)}>
          Add Guardianship +
        </button>
      </div>
    </div>
  );
}

export default ServicePartnerProfile;
