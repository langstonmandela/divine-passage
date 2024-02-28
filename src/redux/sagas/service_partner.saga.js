import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_SERVICE_PARTNER" actions
function* fetchServicePartner() {
    try {
        const response = yield axios.get('/api/service_partner');
        yield put({ type: 'SET_SERVICE_PARTNER', payload: response.data});
    } catch (error) {
        console.log('Service Partner get request failed', error);
    }
}

function* createServicePartner(action) {
    try {
        yield axios.post('/api/service_partner', action.payload);
        yield put({ type: 'FETCH_SERVICE_PARTNER' });
    } catch (error) {
        console.log('Service Partner post request failed', error);
    }
}

function* updateServicePartner(action) {
    try {
        yield axios.put(
            `/api/service_partner/${action.payload.service_partner_id}`,
            action.payload
        );
        yield put({ type: 'FETCH_SERVICE_PARTNER' });
    } catch (error) {
        console.log('Service Partner update request failed', error);
    }
}

function* servicePartnerSaga() {
    yield takeEvery('FETCH_SERVICE_PARTNER', fetchServicePartner);
    yield takeLatest('CREATE_SERVICE_PARTNER', createServicePartner);
    yield takeLatest('UPDATE_SERVICE_PARTNER', updateServicePartner);
}

export default servicePartnerSaga;
