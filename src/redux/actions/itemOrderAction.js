import {
    GET_ITEM_ORDER_REQUEST,
    GET_ITEM_ORDER_ERROR,
    GET_ITEM_ORDER_SUCCESS,
} from "../types/itemOrderType";
import { toast } from "react-toastify";
import { getItemOrdersOfOrderWithPagination } from "../../services/orderService";

const getItemOrderOfOrderWithPagination = (orderId, currentPage) => {
    return async (dispatch, getState) => {
        dispatch(getItemOrderOfOrderRequest());
        try {
            const res = await getItemOrdersOfOrderWithPagination(
                orderId,
                currentPage
            );
            console.log(">> check get item order of order: ", res);
            if (res && +res?.status === 200) {
                dispatch(getItemOrderOfOrderSuccess(res?.data));
            } else {
                toast.error("Lỗi. Không tìm thấy các mặt hành đã được mua.");
                dispatch(getItemOrderOfOrderError());
            }
        } catch (e) {
            toast.error("Thất bại, vui long thử lại!");
            dispatch(getItemOrderOfOrderError());
        }
    };
};

const getItemOrderOfOrderRequest = () => {
    return {
        type: GET_ITEM_ORDER_REQUEST,
    };
};

const getItemOrderOfOrderError = () => {
    return {
        type: GET_ITEM_ORDER_ERROR,
    };
};

const getItemOrderOfOrderSuccess = (payload) => {
    return {
        type: GET_ITEM_ORDER_SUCCESS,
        payload,
    };
};

export { getItemOrderOfOrderWithPagination };
