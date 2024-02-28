// redux/sagas/servicePartnerSagas.js
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Worker saga: Fetch service partners
function* fetchServicePartners() {
    try {
        const response = yield axios.get('/api/servicePartner');
        yield put({ type: 'FETCH_SERVICE_PARTNERS_SUCCESS', payload: response.data });
    } catch (error) {
        console.log('Error with fetching service partners:', error);
        yield put({ type: 'FETCH_SERVICE_PARTNERS_FAILED' });
    }
}

// Worker saga: Create a new service partner
function* createServicePartner(action) {
    try {
        yield axios.post('/api/servicePartner', action.payload);
        yield put({ type: 'CREATE_SERVICE_PARTNER_SUCCESS' });
        // Optionally, refetch the service partners list to update the UI
        yield put({ type: 'FETCH_SERVICE_PARTNERS' });
    } catch (error) {
        console.log('Error with creating service partner:', error);
        yield put({ type: 'CREATE_SERVICE_PARTNER_FAILED' });
    }
}

function* servicePartnerSagas() {
    yield takeLatest('FETCH_SERVICE_PARTNERS', fetchServicePartners);
    yield takeLatest('CREATE_SERVICE_PARTNER', createServicePartner);
}

export default servicePartnerSagas;
