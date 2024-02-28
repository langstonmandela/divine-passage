import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// Worker saga: will be fired on "FETCH_GUARDIANSHIP" actions
function* fetchGuardianship(action) {
    try {
        const response = yield axios.get(`/api/guardianship/${action.payload.userId}`);
        yield put({ type: 'SET_GUARDIANSHIP', payload: response.data });
    } catch (error) {
        console.log('Guardianship get request failed', error);
    }
}

// Worker saga: will be fired on "CREATE_GUARDIANSHIP" actions
function* createGuardianship(action) {
    try {
        yield axios.post('/api/guardianship', action.payload);
        yield put({ type: 'FETCH_GUARDIANSHIP', payload: action.payload });
    } catch (error) {
        console.log('Guardianship post request failed', error);
    }
}

// Worker saga: will be fired on "UPDATE_GUARDIANSHIP" actions
function* updateGuardianship(action) {
    try {
        yield axios.put(`/api/guardianship/${action.payload.guardianshipId}`, action.payload);
        yield put({ type: 'FETCH_GUARDIANSHIP', payload: { userId: action.payload.userId } });
    } catch (error) {
        console.log('Guardianship update request failed', error);
    }
}

// Worker saga: will be fired on "DELETE_GUARDIANSHIP" actions
function* deleteGuardianship(action) {
    try {
        yield axios.delete(`/api/guardianship/${action.payload.guardianshipId}`);
        yield put({ type: 'FETCH_GUARDIANSHIP', payload: { userId: action.payload.userId } });
    } catch (error) {
        console.log('Guardianship delete request failed', error);
    }
}


// Root saga combines all guardianship-related sagas
function* guardianshipSaga() {
    yield takeEvery('FETCH_GUARDIANSHIP', fetchGuardianship);
    yield takeLatest('CREATE_GUARDIANSHIP', createGuardianship);
    yield takeLatest('UPDATE_GUARDIANSHIP', updateGuardianship);
    yield takeLatest('DELETE_GUARDIANSHIP', deleteGuardianship);
}

export default guardianshipSaga;
