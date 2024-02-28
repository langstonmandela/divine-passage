import React from 'react';
import { useHistory } from 'react-router-dom';
import { dateStrip } from '../../utils/helper';
//component that has more details about the service partner
// action to create a form aggregation record
// action to add a guardianship form to the form aggregation table
function ServicePartnerListItem({ partner }) {
    const history = useHistory();
    const handleProfile = () => {
        history.push(`/service_partner/${partner.service_partner_id}`);
    };
    return (
        <div>
            <p>
                {partner?.last_name}, {partner?.first_name} -
                <span> Date Placed {dateStrip(partner?.date_of_placement)}</span>
            </p>
            <button onClick={handleProfile}>Open Profile</button>
        </div>
    );
}

export default ServicePartnerListItem;
