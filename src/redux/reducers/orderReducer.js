import {
    GET_ORDERS_CUS_REQUEST,
    GET_ORDERS_CUS_ERROR,
    GET_ORDERS_CUS_SUCCESS,
} from "../types/orderType";

const INITIAL_STATE = {
    listOrder: "",
    isLoadingPaginationOrder: false,
    pageOrder: 1,
};

const orderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ORDERS_CUS_REQUEST:
            return {
                ...state,
                isLoadingPaginationOrder: true,
            };
        case GET_ORDERS_CUS_ERROR:
            return {
                ...state,
                isLoadingPaginationOrder: false,
                listOrder: "",
            };
        case GET_ORDERS_CUS_SUCCESS:
            return {
                ...state,
                isLoadingPaginationOrder: false,
                listOrder: action.payload,
                pageOrder: action.payload?.current_page,
            };
        default:
            return state;
    }
};

export default orderReducer;
