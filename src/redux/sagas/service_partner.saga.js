import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_SERVICE_PARTNER" actions
function* fetchServicePartner() {
  try {
    const response = yield axios.get('/api/service_partner');
    yield put({ type: 'SET_SERVICE_PARTNER', payload: response.data });
  } catch (error) {
    console.log('Service Partner get request failed', error);
  }
}

function* servicePartnerSaga() {
  yield takeLatest('FETCH_SERVICE_PARTNER', fetchServicePartner);
}

export default servicePartnerSaga;
