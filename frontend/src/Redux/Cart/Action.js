import api from "../../Config/axiosApi";
import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./ActionType"


export const addItemTOCart = (reqData) => async (dispatch) =>{
    dispatch({type:ADD_ITEM_TO_CART_REQUEST});

    try {
        const {data} = await api.post(`/api/cart/addItem`,reqData.data)
        console.log(data+'------- Inside Cart Updating Item')
        dispatch({type:ADD_ITEM_TO_CART_SUCCESS,payload : data});
    } catch (error) {
        dispatch({type:ADD_ITEM_TO_CART_FAILURE,payload : error});
    }
}


export const removeItemFromCart = (reqData) =>async (dispatch) =>{
    dispatch({type:REMOVE_CART_ITEM_REQUEST});

    try {
        const {data} = await api.delete(`/api/cart/remove/cartItem/${reqData.cartItemId}`)
        console.log("Removing Item from cart" , data)
        dispatch({type:REMOVE_CART_ITEM_SUCCESS,payload : data});
    } catch (error) {
        dispatch({type:REMOVE_CART_ITEM_FAILURE,payload : error});
    }
}


export const updateItemInCart = (reqData) => async (dispatch) =>{
    dispatch({type:UPDATE_CART_ITEM_REQUEST});

    try {
        const {data} = await api.put(`/api/cart_items/${reqData.cartItemId}`,reqData)
        dispatch({type:UPDATE_CART_ITEM_SUCCESS,payload : data});
    } catch (error) {
        dispatch({type:UPDATE_CART_ITEM_FAILURE,payload : error});
    }
}

export const getCart = () =>async (dispatch) =>{
    dispatch({type:GET_CART_REQUEST});

    try {
        const {data} = await api.get(`/api/cart/`)
        dispatch({type:GET_CART_SUCCESS,payload : data});
    } catch (error) {
        dispatch({type:GET_CART_FAILURE,payload : error});
    }
}