import {
    GET_ITEM_ORDER_REQUEST,
    GET_ITEM_ORDER_ERROR,
    GET_ITEM_ORDER_SUCCESS,
} from "../types/itemOrderType";

const INITIAL_STATE = {
    listItemOrders: "",
    isLoadingPaginationItemOrder: false,
};

const itemOrderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ITEM_ORDER_REQUEST:
            return {
                ...state,
                isLoadingPaginationItemOrder: true,
            };
        case GET_ITEM_ORDER_ERROR:
            return {
                ...state,
                isLoadingPaginationItemOrder: false,
                listItemOrders: "",
            };
        case GET_ITEM_ORDER_SUCCESS:
            return {
                ...state,
                isLoadingPaginationItemOrder: false,
                listItemOrders: action.payload,
            };
        default:
            return state;
    }
};

export default itemOrderReducer;
