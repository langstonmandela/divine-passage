import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import GuardianshipForm from './GuardianshipForm';

function GuardianshipDetails() {
  const history = useHistory();
  const { guardianshipId } = useParams();
  console.log(`${guardianshipId} id page`);
  const guardianships = useSelector((store) => store.guardianships);
  console.log('Guardianship Details', guardianships);
  const guardianship = guardianships.find(
    (guardianship) =>
      Number(guardianship.guardianship_id) === Number(guardianshipId)
  );
  console.log(`Profile Page for ${guardianship?.guardianship_id}`);

  // useEffect(() => {
  //   console.log('load the profile page');
  // }, []);

  return (
    <div>
      <p>Edit Guardiaship Form {guardianship?.guardianship_id}</p>
      <button onClick={() => history.push('/service_partner')}>
        Back to Service Partners
      </button>
      <p> Profile {guardianship?.guardianship_id}</p>
      <GuardianshipForm
        guardianship={guardianship}
        partnerId={undefined}
        intakeId={undefined}
      />
      <hr />
      <div>
        {/* <button onClick={() => console.log(`Update Guardianship Form ${guardianship?.guardianship_id}`)}>
                    Update {guardianship?.guardianship_id}
                </button> */}
      </div>
    </div>
  );
}

export default GuardianshipDetails;
