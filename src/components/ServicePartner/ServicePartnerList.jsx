import React from 'react';
import ServicePartnerListItem from './ServicePartnerListItem';
import { useHistory } from 'react-router-dom';

function ServicePartnerList({ servicePartners }) {
    const history = useHistory();
    return (
        <div className="w3-container">
            <h2 className="w3-text-teal">Service Partners List</h2>
            <button 
                onClick={() => history.push('/service_partner/new')}
                className="w3-button w3-teal"
            >
                    Add Service Partner
            </button>
            {servicePartners?.length > 0 ? (
                <ul className="w3-ul w3-card-4 w3-margin-top">
                    {servicePartners?.map((partner) => (
                        <ServicePartnerListItem
                            key={partner.service_partner_id}
                            partner={partner}
                        />
                    ))}
                </ul>
            ) : (
                <p className="w3-text-grey">Loading...</p>
            )}
        </div>
    );
}

export default ServicePartnerList;
