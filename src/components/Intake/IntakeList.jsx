import React from 'react';
import IntakeListItem from './IntakeListItem';

function IntakeList({ intakeForms, myPartner }) {
    return (
        <div className="w3-container w3-margin">
            <h2 className="w3-text-teal">Intake Forms List</h2>
            {(intakeForms?.length > 0 && myPartner) ? (
                <ul className="w3-ul">
                    {intakeForms.filter((k) => Number(k.service_partner_id) === Number(myPartner.service_partner_id)).map((intakeForm) => (
                        <IntakeListItem
                            key={intakeForm.forms_aggregator_id}
                            intakeForm={intakeForm} myPartner={myPartner}
                        />
                    ))}
                </ul>
            ) : (
                <p className="w3-text-grey">Loading...</p>
            )}
        </div>
    );
}

export default IntakeList;
