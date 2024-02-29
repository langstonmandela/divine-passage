import IntakeListItem from './IntakeListItem';

function IntakeList ({ intakeForms, myPartner }) {
    return (
        <div>
            <h2>Intake Forms List</h2>
            {intakeForms?.length > 0 ? (
                <ul>
                    {intakeForms?.filter((k) => Number(k.service_partner_id) === Number(myPartner.service_partner_id)).map((intakeForm) => (
                        <IntakeListItem
                            key={intakeForm.forms_aggregator_id}
                            intakeForm={intakeForm} myPartner={myPartner}
                        />
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default IntakeList;