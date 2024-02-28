import React from 'react';
import PropTypes from 'prop-types';

function ServicePartnerListItem({ servicePartner }) {
    return (
        <div className="service-partner-list-item">
            <h3>{servicePartner.name}</h3>
            <p>{servicePartner.description}</p>
        </div>
    );
}

ServicePartnerListItem.propTypes = {
    servicePartner: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
    }).isRequired,
};

export default ServicePartnerListItem;
