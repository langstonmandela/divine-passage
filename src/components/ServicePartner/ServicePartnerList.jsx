import ServicePartnerListItem from './ServicePartnerListItem';
function ServicePartnerList({ servicePartners }) {
  return (
    <div>
      <h2>Service Partners List</h2>
      {servicePartners?.length > 0 ? (
        <ul>
          {servicePartners?.map((partner) => (
            <ServicePartnerListItem
              key={partner.service_partner_id}
              partner={partner}
            />
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ServicePartnerList;
