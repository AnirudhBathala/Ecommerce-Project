import { FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS } from "./ActionType"

const initialState = {
    products: [],
    product: null,
    loading: false,
    error: null,
};

const ProductReducer = (state = initialState, action) => {

    switch (action.type) {
        case FIND_PRODUCTS_REQUEST:
            return { ...state, loading: true, products: [] };
        case FIND_PRODUCTS_SUCCESS:
            return { ...state, products: action.payload, loading: false };
        case FIND_PRODUCTS_FAILURE:
            return { ...state, products: [], loading: false, error: action.payload };
        case FIND_PRODUCT_BY_ID_REQUEST:
            return { ...state, loading: true};
        case FIND_PRODUCT_BY_ID_SUCCESS:
            return { ...state, product: action.payload, loading: false };
        case FIND_PRODUCT_BY_ID_FAILURE:
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};

export default ProductReducer;