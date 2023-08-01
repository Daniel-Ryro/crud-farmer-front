import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import producerReducer from './reducers';

const store = createStore(producerReducer, applyMiddleware(thunk));

export default store;
