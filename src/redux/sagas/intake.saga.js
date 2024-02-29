import axios from 'axios';
import {put, takeEvery, takeLatest} from 'redux-saga/effects';

function* fetchIntake(action) {
    try{

        const response = yield axios.get(`api/intake`);
        console.log(response.data);
        yield put ({type: 'SET_INTAKE', payload: response.data })
    } catch (error)  {
        console.log('Intake GET request failed', error);
    }
}

function* createIntake(action) {
    try{
        console.log('Payload: Service Partner ID', action.payload);
        yield axios.post('api/intake', action.payload);
        yield put({type: 'FETCH_INTAKE'}); 
    } catch (error) {
        console.log('Intake post request failed', error);
    }
}

function* intakeSaga(){
    yield takeEvery  ('FETCH_INTAKE', fetchIntake);
    yield takeEvery  ('CREATE_INTAKE', createIntake);
}

export default intakeSaga;