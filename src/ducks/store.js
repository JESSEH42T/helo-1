import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import promiseMiddleWare from 'redux-promise-middleware';

const middleWare = applyMiddleware(promiseMiddleWare());
export default createStore(reducer, middleWare,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());