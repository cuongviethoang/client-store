import {
    CREATE_PRO_REQUEST,
    CREATE_PRO_ERROR,
    CREATE_PRO_SUCCESS,
    READ_PRO_REQUEST,
    READ_PRO_ERROR,
    READ_PRO_SUCCESS,
    DETAIL_PRO_REQUEST,
    DETAIL_PRO_ERROR,
    DETAIL_PRO_SUCCESS,
} from "../types/productType";
import { toast } from "react-toastify";
import {
    addNewProduct,
    getProductWithPagination,
    getDetailProduct,
} from "../../services/productService";

const createProRedux = (productName, productImage, qrCode, price, total) => {
    return async (dispatch, getState) => {
        dispatch(createProRequest());
        try {
            const res = await addNewProduct(
                productName,
                productImage,
                qrCode,
                price,
                total
            );
            console.log(">> check response add product: ", res);
            toast.success("Tạo sản phẩm thành công.");
            dispatch(createProSuccess(res));
        } catch (e) {
            toast.error(
                "Tạo sản phẩm thất bại, vui lòng kiểm tra lại thông tin."
            );
            dispatch(createProError());
        }
    };
};

const createProRequest = () => {
    return {
        type: CREATE_PRO_REQUEST,
    };
};
const createProError = () => {
    return {
        type: CREATE_PRO_ERROR,
    };
};
const createProSuccess = (payload) => {
    return {
        type: CREATE_PRO_SUCCESS,
        payload,
    };
};

const readProPaginationRedux = (page, limit) => {
    return async (dispatch, getState) => {
        dispatch(readProRequest());
        try {
            const res = await getProductWithPagination(page, limit);
            console.log(">> check response read pro: ", res);
            const data = {
                page: page,
                limit: limit,
                res: res,
            };
            dispatch(readProSuccess(data));
        } catch (e) {
            toast.error("Tải thông tin sản phẩm thất bại");
            dispatch(readProError());
        }
    };
};

const readProRequest = () => {
    return {
        type: READ_PRO_REQUEST,
    };
};
const readProError = () => {
    return {
        type: READ_PRO_ERROR,
    };
};
const readProSuccess = (payload) => {
    return {
        type: READ_PRO_SUCCESS,
        payload,
    };
};

const detailProRedux = (proId) => {
    return async (dispatch, getState) => {
        dispatch(detailProRequest());
        try {
            const res = await getDetailProduct(proId);
            console.log(">> check response detail pro: ", res);

            if (res && +res?.EC !== 0) {
                toast.error(res?.EM);
                dispatch(detailProError(res));
            } else if (res) {
                dispatch(detailProSuccess(res));
            }
        } catch (e) {
            toast.error("Tải thông tin chi tiết thất bại, vui lòng thử lại!");
            dispatch(detailProError());
        }
    };
};

const detailProRequest = () => {
    return {
        type: DETAIL_PRO_REQUEST,
    };
};
const detailProError = (payload) => {
    return {
        type: DETAIL_PRO_ERROR,
        payload,
    };
};
const detailProSuccess = (payload) => {
    return {
        type: DETAIL_PRO_SUCCESS,
        payload,
    };
};

export { createProRedux, readProPaginationRedux, detailProRedux };
