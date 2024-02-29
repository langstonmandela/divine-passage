import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ServicePartnerList from './ServicePartnerList';
import ServicePartnerForm from './ServicePartnerForm';

function ServicePartnerPage() {
    const dispatch = useDispatch();
    const servicePartners = useSelector((store) => store.servicePartners);

    useEffect(() => {
        dispatch({ type: 'FETCH_SERVICE_PARTNER' }); // Ensuring action type is consistent with expected Redux action
    }, [dispatch]); // Adding dispatch to dependency array as a best practice

    return (
        <div className="w3-container w3-margin-top">
            <h2 className="w3-text-teal">Service Partners</h2>
            {/* Wrapper for form and list could be added here if needed for layout purposes */}
            <ServicePartnerForm partner={undefined} />
            <ServicePartnerList servicePartners={servicePartners} />
        </div>
    );
}

export default ServicePartnerPage;
