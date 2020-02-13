import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState={};
const middleware =[thunk];

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
    //this is only for the pluging redux in browser
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store;