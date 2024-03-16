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
    ALL_CUS_REQUEST,
    ALL_CUS_ERROR,
    ALL_CUS_SUCCESS,
    SEARCH_CUS_REQUEST,
    SEARCH_CUS_ERROR,
    SEARCH_CUS_SUCCESS,
} from "../types/customerType";
import {
    addNewCustomer,
    getCustomerWithPagination,
    getCustomerDetail,
    updateCustomer,
    getAllCusNum,
    searchAllCusByValue,
} from "../../services/customerService";
import { toast } from "react-toastify";

const createCusRedux = (username, phoneNumber) => {
    return async (dispatch, getState) => {
        dispatch(createCusRequest());
        try {
            const res = await addNewCustomer(username, phoneNumber);
            console.log(">> check res add customer: ", res);
            if (res && +res?.status === 200) {
                toast.success(res?.data?.em);
                dispatch(createCusSuccess());
            } else {
                toast.error(res?.data?.em);
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
            if (res && +res?.status === 200) {
                const data = {
                    page: page,
                    limit: limit,
                    res: res.data,
                };
                dispatch(readCusSuccess(data));
            } else {
                toast.error(res?.data?.em);
                dispatch(readCusError());
            }
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
            if (res && +res?.status === 200) {
                dispatch(detailCusSuccess(res));
            } else {
                toast.error(res?.data?.em);
                dispatch(detailCusError());
            }
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

const updateCusRedux = (customer) => {
    return async (dispatch, getState) => {
        dispatch(updateCusRequest());
        try {
            const res = await updateCustomer(
                customer?.id,
                customer?.username,
                customer?.phoneNumber
            );
            console.log(">> check response update user: ", res);
            if (res && +res?.status === 200) {
                toast.success(res?.data?.em);
                dispatch(updateCusSuccess());
            } else {
                toast.error(res?.data?.em);
                dispatch(updateCusError());
            }
        } catch (e) {
            toast.error("Cập nhật thất bại, vui long thử lại!");
            dispatch(updateCusError());
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

const allCusRedux = () => {
    return async (dispatch, getState) => {
        dispatch(allCusRequest());
        try {
            const res = await getAllCusNum();
            console.log(">> check response all cus: ", res);
            if (res && +res?.status === 200) {
                dispatch(allCusSuccess(res?.data));
            } else {
                dispatch(allCusError());
            }
        } catch (e) {
            dispatch(allCusError());
        }
    };
};

const allCusRequest = () => {
    return {
        type: ALL_CUS_REQUEST,
    };
};
const allCusError = () => {
    return {
        type: ALL_CUS_ERROR,
    };
};
const allCusSuccess = (payload) => {
    return {
        type: ALL_CUS_SUCCESS,
        payload,
    };
};

const searchCusRedux = (q, currentPage) => {
    return async (dispatch, getState) => {
        dispatch(searchCusRequest());
        try {
            const res = await searchAllCusByValue(q, currentPage);
            console.log(">> check response search cus: ", res);
            if (res && +res?.status === 200) {
                dispatch(searchCusSuccess(res?.data));
            } else {
                toast.error("Không tìm thấy khách hàng");
                dispatch(searchCusError());
            }
        } catch (e) {
            toast.error("Lỗi tìm kiếm");
            dispatch(searchCusError());
        }
    };
};

const searchCusRequest = () => {
    return {
        type: SEARCH_CUS_REQUEST,
    };
};
const searchCusError = () => {
    return {
        type: SEARCH_CUS_ERROR,
    };
};
const searchCusSuccess = (payload) => {
    return {
        type: SEARCH_CUS_SUCCESS,
        payload,
    };
};

export {
    createCusRedux,
    detailCusRedux,
    readCusPaginationRedux,
    updateCusRedux,
    allCusRedux,
    searchCusRedux,
};
