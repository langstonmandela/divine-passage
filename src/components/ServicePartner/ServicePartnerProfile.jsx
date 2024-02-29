import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ServicePartnerForm from './ServicePartnerForm';

function ServicePartnerProfile() {
    const history = useHistory();
    const { partnerId } = useParams();
    const partners = useSelector((store) => store.servicePartners);
    const partner = partners.find(
        (partner) => Number(partner.service_partner_id) === Number(partnerId)
    );

    return (
        <div className="w3-container w3-margin">
            <button className="w3-button w3-teal w3-margin-bottom" onClick={() => history.push('/service_partner')}>
                Back to Service Partners
            </button>
            <p className="w3-large">Profile: <strong>{partner?.first_name}</strong></p>
            <ServicePartnerForm partner={partner} />
            <hr className="w3-margin" />
            <div>
                <button className="w3-button w3-blue w3-margin-top" onClick={() => history.push(`/intake/${partnerId}`)}>
                    Start an Intake packet for {partner?.first_name}
                </button>
            </div>
        </div>
    );
}

export default ServicePartnerProfile;
