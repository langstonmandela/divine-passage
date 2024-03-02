import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ServicePartnerList from './ServicePartnerList';
import ServicePartnerForm from './ServicePartnerForm';

function ServicePartnerPage() {
    const dispatch = useDispatch();
    const servicePartners = useSelector((store) => store.servicePartners);

    return (
        <div className="w3-container w3-margin-top">
            <h1 className="w3-text-teal">My Dashboard</h1>
            <p>Welcome! Here are your Service Partners</p>
            {/* Wrapper for form and list could be added here if needed for layout purposes */}
            <ServicePartnerList servicePartners={servicePartners} />
            {/* <ServicePartnerForm partner={undefined} /> */}
        </div>
    );
}

export default ServicePartnerPage;
