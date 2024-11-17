import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import AuthReducer from './Auth/AuthReducer'
import {thunk} from 'redux-thunk'
import  ProductReducer  from './Product/Reducer';
import cartReducer from './Cart/Reducer';
import { orderReducer } from './Order/Reducer';


const rootReducers=combineReducers({

    auth : AuthReducer,
    customersProduct : ProductReducer,
    cart : cartReducer,
    order : orderReducer,

});


const store = legacy_createStore(rootReducers,applyMiddleware(thunk));

export default store;
