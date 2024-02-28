import GuardianshipListItem from './GuardianshipListItem';

function GuardianshipList({ guardianships }) {
    return (
        <div>
            <h2>Guardianships List</h2>
            {guardianships?.length > 0 ? (
                <ul>
                    {guardianships?.map((guardianship) => (
                        <GuardianshipListItem
                            key={guardianship.guardianship_id}
                            guardianship={guardianship}
                        />
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default GuardianshipList;
