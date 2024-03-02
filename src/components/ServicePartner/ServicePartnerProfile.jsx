import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ServicePartnerForm from './ServicePartnerForm';
import ServicePartnerDetail from './ServicePartnerDetail';

function ServicePartnerProfile() {
    const history = useHistory();
    const { partnerId } = useParams();
    const partners = useSelector((store) => store.servicePartners);
    const partner = partners.find(
        (partner) => Number(partner.service_partner_id) === Number(partnerId)
    );

    return (
        (partner) ?
            <div className="w3-container w3-margin">
                <h1>Service Partner Details</h1>
                <p>
                    <button className="w3-button w3-khaki w3-margin-bottom w3-round" onClick={() => history.push('/service_partner')}>
                        Back to Service Partners
                    </button>
                </p>
                <ServicePartnerDetail partner={partner} />
                {/* <hr className="w3-margin" /> */}
                {/* <ServicePartnerForm partner={partner} /> */}
            </div>
            : <h2>Loading...</h2>
    );
}

export default ServicePartnerProfile;
