/*
   Take in a partner (like the form)
   Show the partner in a card
*/
import { dateStrip } from '../../utils/helper';

function ServicePartnerDetail({ partner }) {
    return (
        <div class="w3-card-4 w3-round w3-col m12 l4">
            <header class="w3-container w3-light-grey">
                <h3>
                     Alias: {partner.nick_name}
                    <button class="w3-button w3-small w3-light-grey w3-border w3-border-blue-grey w3-right w3-round">Edit</button>
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
                            <td>Date of Birth</td>
                            <td>{dateStrip(partner.date_of_birth)}</td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td>{partner.gender}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <button className="w3-button w3-block w3-teal w3-round" onClick={() => history.push(`/intake/${partnerId}`)}>
                Start an Intake packet for {partner?.first_name}
            </button>
        </div>
    )
}

export default ServicePartnerDetail;