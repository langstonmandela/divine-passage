import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { dateStrip } from '../../utils/helper';

function RelatedForm({ partnerForm }) {
    const guardianships = useSelector((store) => store.guardianships);

    
    const [guardianshipRecords, setGuardianshipRecords] = useState([]);

    useEffect(() => {
        
        const formId = partnerForm?.id; 

        console.log('Partner Form:', partnerForm);

        // Filters guardianship records to include only those that have a matching forms_aggregator_id
        // with the partnerForm. This ensures that the displayed guardianship records are relevant
        // to the specific aggregator form being viewed.
        const filteredGuardianships = guardianships.filter(
            (guardianship) => guardianship.forms_aggregator_id === partnerForm.forms_aggregator_id
        ).map(guardianship => ({
            courtOrderNumber: guardianship.court_order_number ?? '',
            cpsWorkerEmail: guardianship.cps_worker_email ?? '',
            cpsWorkerName: guardianship.cps_worker_name ?? '',
            cpsWorkerPhone: guardianship.cps_worker_phone ?? '',
            dateCreated: dateStrip(guardianship.date_created) ?? '',
        }));

        console.log('Filtered Guardianship Records:', filteredGuardianships);

        
        setGuardianshipRecords(filteredGuardianships);
    }, [guardianships, partnerForm]); 

    console.log('Guardianships from store:', guardianships);
    console.log('Guardianship Records State:', guardianshipRecords);

    
    return (
        <div className="w3-card w3-round w3-col m12 l8 w3-margin">
            <header className="w3-container w3-light-grey">
                <h3>Form Type: {partnerForm?.form_type}</h3>
            </header>

            <h3>Guardianship Records</h3>

            <div className="w3-container">
                <table className="w3-table-all">
                    <thead>
                        <tr>
                            <th>Court Order Number</th>
                            <th>CPS Worker Details</th>
                            <th>Date Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {guardianshipRecords.length > 0 ? (
                            guardianshipRecords.map((record, index) => (
                                <tr key={index}>
                                    <td>{record.courtOrderNumber}</td>
                                    <td>
                                        Name: {record.cpsWorkerName}<br />
                                        Email: {record.cpsWorkerEmail}<br />
                                        Phone: {record.cpsWorkerPhone}
                                    </td>
                                    <td>{record.dateCreated}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No guardianship records found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RelatedForm;
