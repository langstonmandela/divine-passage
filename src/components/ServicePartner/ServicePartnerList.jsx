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
                className="w3-button w3-tiny w3-blue-grey w3-round"
            >
                Add Service Partner
            </button>
            {servicePartners?.length > 0 ? (
                <table className="w3-table-all w3-margin-top">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Nickname</th>
                            <th>Date Placed</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {servicePartners?.map((partner) => (
                        <ServicePartnerListItem
                            key={partner.service_partner_id}
                            partner={partner}
                        />
                    ))}
                    </tbody>
                </table>
            ) : (
                <p className="w3-text-grey">Loading...</p>
            )}
        </div>
    );
}

export default ServicePartnerList;
