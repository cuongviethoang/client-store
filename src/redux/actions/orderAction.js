import {
    GET_ORDERS_CUS_REQUEST,
    GET_ORDERS_CUS_ERROR,
    GET_ORDERS_CUS_SUCCESS,
} from "../types/orderType";
import { getOrdersOfCusWithPagination } from "../../services/orderService";
import { toast } from "react-toastify";

const getListOrderOfUserWithPagination = (cusId, currentPage) => {
    return async (dispatch, getState) => {
        dispatch(getListOrderOfCusRequest());
        try {
            const res = await getOrdersOfCusWithPagination(cusId, currentPage);
            console.log(">> check response list order of customer: ", res);
            if (res && +res?.status === 200) {
                dispatch(getListOrderOfCusSuccess(res?.data));
            } else {
                toast.error("Không tìm thấy danh sách hóa đơn của khách hàng.");
                dispatch(getListOrderOfCusError());
            }
        } catch (e) {
            toast.error("Lỗi tìm kiếm");
            dispatch(getListOrderOfCusError());
        }
    };
};

const getListOrderOfCusRequest = () => {
    return {
        type: GET_ORDERS_CUS_REQUEST,
    };
};
const getListOrderOfCusError = () => {
    return {
        type: GET_ORDERS_CUS_ERROR,
    };
};
const getListOrderOfCusSuccess = (payload) => {
    return {
        type: GET_ORDERS_CUS_SUCCESS,
        payload,
    };
};

export { getListOrderOfUserWithPagination };
