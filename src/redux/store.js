import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import rootReducer from './reducers/_root.reducer'; // imports ./redux/reducers/index.js
import rootSaga from './sagas/_root.saga'; // imports ./redux/sagas/index.js

const sagaMiddleware = createSagaMiddleware();

// This line creates an array of all of the Redux middleware you want to use.
// We don't want a whole ton of console logs in our production code,
// so logger will only be added to your project if you're in development mode.
const middlewareList = process.env.NODE_ENV === 'development' ?
    [sagaMiddleware, logger] :
    [sagaMiddleware];

const store = createStore(
    // Tells the saga middleware to use the rootReducer.
    // rootReducer contains all of our other reducers.
    rootReducer,
    // Adds all middleware to our project including saga and logger.
    applyMiddleware(...middlewareList),
);

// Tells the saga middleware to use the rootSaga.
// rootSaga contains all of our other sagas.
sagaMiddleware.run(rootSaga);

export default store;
