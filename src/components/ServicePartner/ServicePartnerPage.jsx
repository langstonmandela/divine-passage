import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ServicePartnerList from './ServicePartnerList';
import ServicePartnerForm from './ServicePartnerForm';
import { useEffect } from 'react';

function ServicePartnerPage() {
  const dispatch = useDispatch();
  const servicePartners = useSelector((store) => store.service_partner);

  useEffect(() => {
    dispatch({ type: 'FETCH_SERVICE_PARTNER' });
  }, []);

  return (
    <>
      <ServicePartnerForm partner={undefined} />
      <ServicePartnerList servicePartners={servicePartners} />
    </>
  );
}

export default ServicePartnerPage;
