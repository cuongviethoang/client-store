import {
    CREATE_CUS_REQUEST,
    CREATE_CUS_ERROR,
    CREATE_CUS_SUCCESS,
    READ_CUS_REQUEST,
    READ_CUS_ERROR,
    READ_CUS_SUCCESS,
    DETAIL_CUS_REQUEST,
    DETAIL_CUS_ERROR,
    DETAIL_CUS_SUCCESS,
    UPDATE_CUS_REQUEST,
    UPDATE_CUS_ERROR,
    UPDATE_CUS_SUCCESS,
} from "../types/customerType";
import {
    addNewCustomer,
    getCustomerWithPagination,
    getCustomerDetail,
    updateCustomer,
} from "../../services/customerService";
import { toast } from "react-toastify";

const createCusRedux = (username, phoneNumber) => {
    return async (dispatch, getState) => {
        dispatch(createCusRequest());
        try {
            const res = await addNewCustomer(username, phoneNumber);
            console.log(">> check res add customer: ", res);
            if (res && +res?.EC === 0) {
                toast.success(res?.EM);
                dispatch(createCusSuccess());
            } else {
                toast.error(res?.EM);
                dispatch(createCusError());
            }
        } catch (e) {
            toast.error("Thất bại, vui long thử lại!");
            dispatch(createCusError());
        }
    };
};

const createCusRequest = () => {
    return {
        type: CREATE_CUS_REQUEST,
    };
};
const createCusError = () => {
    return {
        type: CREATE_CUS_ERROR,
    };
};
const createCusSuccess = () => {
    return {
        type: CREATE_CUS_SUCCESS,
    };
};

const readCusPaginationRedux = (page, limit) => {
    return async (dispatch, getState) => {
        dispatch(readCusRequest());
        try {
            const res = await getCustomerWithPagination(page, limit);
            console.log(">> check response cus: ", res);
            const data = {
                page: page,
                limit: limit,
                res: res,
            };
            dispatch(readCusSuccess(data));
        } catch (e) {
            toast.error("Tải thông tin khách hàng thất bại, vui lòng thử lại!");
            dispatch(readCusError());
        }
    };
};

const readCusRequest = () => {
    return {
        type: READ_CUS_REQUEST,
    };
};
const readCusError = () => {
    return {
        type: READ_CUS_ERROR,
    };
};
const readCusSuccess = (payload) => {
    return {
        type: READ_CUS_SUCCESS,
        payload,
    };
};

const detailCusRedux = (cusId) => {
    return async (dispatch, getState) => {
        dispatch(detailCusRequest());
        try {
            const res = await getCustomerDetail(cusId);
            console.log(">> check response cus detail: ", res);
            dispatch(detailCusSuccess(res));
        } catch (e) {
            toast.error(
                "Tải thông tin chi tiết người dùng thấy bại, vui lòng thử lại!"
            );
            dispatch(detailCusError());
        }
    };
};

const detailCusRequest = () => {
    return {
        type: DETAIL_CUS_REQUEST,
    };
};
const detailCusError = () => {
    return {
        type: DETAIL_CUS_ERROR,
    };
};
const detailCusSuccess = (payload) => {
    return {
        type: DETAIL_CUS_SUCCESS,
        payload,
    };
};

const updateCusRedux = (user) => {
    return async (dispatch, getState) => {
        dispatch(updateCusRequest());
        try {
            const res = await updateCustomer(user);
            console.log(">> check response update user: ", res);
            if (res && +res?.EC === 0) {
                toast.success(res?.EM);
                dispatch(updateCusSuccess());
            } else {
                toast.error(res?.EM);
                dispatch(updateCusError());
            }
        } catch (e) {
            toast.error("Cập nhật thất bại, vui long thử lại!");
            dispatch.error(updateCusError());
        }
    };
};

const updateCusRequest = () => {
    return {
        type: UPDATE_CUS_REQUEST,
    };
};
const updateCusError = () => {
    return {
        type: UPDATE_CUS_ERROR,
    };
};
const updateCusSuccess = () => {
    return {
        type: UPDATE_CUS_SUCCESS,
    };
};

export {
    createCusRedux,
    detailCusRedux,
    readCusPaginationRedux,
    updateCusRedux,
};
