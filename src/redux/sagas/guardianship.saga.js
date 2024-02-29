import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

function* fetchGuardianship(action) {
    try {
        
        const response = yield axios.get(`/api/guardianship`);
        console.log(response.data);
        yield put({ type: 'SET_GUARDIANSHIP', payload: response.data });
    } catch (error) {
        console.log('Guardianship GET request failed', error);
    }
}

function* createGuardianship(action) {
    try {
        yield axios.post('/api/guardianship', action.payload);
        yield put({ type: 'FETCH_GUARDIANSHIP'});
    } catch (error) {
        console.log('Guardianship post request failed', error);
    }
}

function* updateGuardianship(action) {
    try {
        yield axios.put(`/api/guardianship/${action.payload.guardianshipId}`, action.payload);
        yield put({ type: 'FETCH_GUARDIANSHIP', payload: { userId: action.payload.userId } });
    } catch (error) {
        console.log('Guardianship update request failed', error);
    }
}

function* deleteGuardianship(action) {
    try {
        yield axios.delete(`/api/guardianship/${action.payload.guardianshipId}`);
        yield put({ type: 'FETCH_GUARDIANSHIP', payload: { userId: action.payload.userId } });
    } catch (error) {
        console.log('Guardianship delete request failed', error);
    }
}


function* guardianshipSaga() {
    yield takeEvery('FETCH_GUARDIANSHIP', fetchGuardianship);
    yield takeLatest('CREATE_GUARDIANSHIP', createGuardianship);
    yield takeLatest('UPDATE_GUARDIANSHIP', updateGuardianship);
    yield takeLatest('DELETE_GUARDIANSHIP', deleteGuardianship);
}

export default guardianshipSaga;
