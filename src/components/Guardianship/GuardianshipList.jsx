import React from 'react';
import GuardianshipListItem from './GuardianshipListItem';

function GuardianshipList({ guardianships }) {
    return (
        <div className="w3-container w3-margin">
            <h2 className="w3-text-teal">Guardianships List</h2>
            {guardianships?.length > 0 ? (
                <ul className="w3-ul">
                    {guardianships.map((guardianship) => (
                        <GuardianshipListItem
                            key={guardianship.guardianship_id}
                            guardianship={guardianship}
                        />
                    ))}
                </ul>
            ) : (
                <p className="w3-text-grey">Loading...</p>
            )}
        </div>
    );
}

export default GuardianshipList;
