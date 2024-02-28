// Action Types
export const FETCH_SERVICE_PARTNERS = 'FETCH_SERVICE_PARTNERS';
export const CREATE_SERVICE_PARTNER = 'CREATE_SERVICE_PARTNER';
export const UPDATE_SERVICE_PARTNER = 'UPDATE_SERVICE_PARTNER';

// Fetch Service Partners Action
export const fetchServicePartners = () => ({
    type: FETCH_SERVICE_PARTNERS,
});

// Create Service Partner Action
export const createServicePartner = (servicePartnerData) => ({
    type: CREATE_SERVICE_PARTNER,
    payload: servicePartnerData,
});

// Update Service Partner Action
export const updateServicePartner = (id, servicePartnerData) => ({
    type: UPDATE_SERVICE_PARTNER,
    payload: { id, servicePartnerData },
});
