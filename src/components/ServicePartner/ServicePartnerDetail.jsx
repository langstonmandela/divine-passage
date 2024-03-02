/*
   Take in a partner (like the form)
   Show the partner in a card
*/
import { dateStrip } from '../../utils/helper';
import { useHistory, useParams } from 'react-router-dom';

function ServicePartnerDetail({ partner }) {
    const { partnerId } = useParams();
    const history = useHistory();
    return (
        <div className="w3-card-4 w3-round w3-col m12 l8">
            <header className="w3-container w3-light-grey">
                <h3>
                    Alias: {partner.nick_name}
                    <button
                        className="w3-button w3-small w3-light-grey w3-border w3-border-blue-grey w3-right w3-round"
                        onClick={() => history.push(`/service_partner/edit/${partnerId}`)}
                    >
                        Edit
                    </button>
                </h3>
            </header>

            <div className="w3-container">
                <table className="w3-table">
                    <tbody>
                        <tr>
                            <td>First Name:</td>
                            <td>{partner.first_name}</td>
                        </tr>
                        <tr>
                            <td>Last Name:</td>
                            <td>{partner.last_name}</td>
                        </tr>
                        <tr>
                            <td>Date of Birth:</td>
                            <td>{dateStrip(partner.date_of_birth)}</td>
                        </tr>
                        <tr>
                            <td>Gender:</td>
                            <td>{partner.gender}</td>
                        </tr>
                        <tr>
                            <td> Added by Team Member: </td>
                            <td> {partner.team_member} </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <button className="w3-button w3-block w3-teal w3-round"
                onClick={() => history.push(`/intake/${partnerId}`)}>
                Start an Intake packet for {partner?.first_name}
            </button>
        </div>
    )
}

export default ServicePartnerDetail;