import React from 'react';
import { useHistory } from 'react-router-dom';
import { dateStrip } from '../../utils/helper';

function ServicePartnerListItem({ partner }) {
    const history = useHistory();

    const handleProfile = () => {
        history.push(`/service_partner/${partner.service_partner_id}`);
    };

    return (
        <div className="w3-container">
            <p className="w3-large">
                {partner?.last_name}, {partner?.first_name} - 
                <span className="w3-text-grey"> Date Placed {dateStrip(partner?.date_of_placement)}</span>
            </p>
            <button className="w3-button w3-teal" onClick={handleProfile}>Open Profile</button>
        </div>
    );
}

export default ServicePartnerListItem;
