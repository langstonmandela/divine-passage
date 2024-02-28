import React from 'react';
import { useHistory } from 'react-router-dom';
//component that has more details about the service partner
// action to create a form aggregation record
// action to add a guardianship form to the form aggregation table
function ServicePartnerListItem({ partner }) {
  const history = useHistory();
  const handleProfile = () => {
    console.log(`goto ${partner.service_partner_id} profile page`);
    history.push(`/service_partner/${partner.service_partner_id}`);
  };
  return (
    <div>
      <p>
        {partner.last_name}, {partner.first_name}
      </p>
      <button onClick={handleProfile}>Profile</button>
    </div>
  );
}

export default ServicePartnerListItem;
