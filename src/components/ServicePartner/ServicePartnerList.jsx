import React from 'react';
import ServicePartnerListItem from './ServicePartnerListItem';

function ServicePartnerList({ servicePartners }) {
    return (
        <div className="w3-container">
            <h2 className="w3-text-teal">Service Partners List</h2>
            {servicePartners?.length > 0 ? (
                <ul className="w3-ul w3-card-4 w3-margin-top">
                    {servicePartners.map((partner) => (
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
