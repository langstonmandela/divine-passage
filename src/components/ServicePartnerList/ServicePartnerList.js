import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ServicePartnerList = () => {
    const dispatch = useDispatch();
    const servicePartners = useSelector(state => state.servicePartnerReducer.servicePartners);
    const isLoading = useSelector(state => state.servicePartnerReducer.isLoading);
    const error = useSelector(state => state.servicePartnerReducer.error);

    useEffect(() => {
        // Dispatch an action to fetch service partners when component mounts
        dispatch({ type: 'FETCH_SERVICE_PARTNERS' });
    }, [dispatch]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Service Partners</h2>
            <ul>
                {servicePartners.map(partner => (
                    <li key={partner.id}>{partner.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ServicePartnerList;
