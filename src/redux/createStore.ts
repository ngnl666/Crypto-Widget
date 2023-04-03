import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import alertReducer from './reducers/alert';
import userReducer from './reducers/user';
import { watcherSaga } from './sagas/rootSaga';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
	alert: alertReducer,
	user: userReducer,
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(rootReducer, {}, applyMiddleware(...middleware));

sagaMiddleware.run(watcherSaga);

export default store;
