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
    ALL_PRO_REQUEST,
    ALL_PRO_ERROR,
    ALL_PRO_SUCCESS,
} from "../types/productType";

const INITIAL_ACTION = {
    prosNum: "",
    listPros: "",
    page: "",
    limit: "",
    isLoadingCreatePro: false,
    isLoadingPagination: false,
    isErrorLoadingDetailPro: false,
    product: "",
};

const productReducer = (state = INITIAL_ACTION, action) => {
    switch (action.type) {
        case CREATE_PRO_REQUEST:
            return {
                ...state,
                isLoadingCreatePro: true,
                isLoadingPagination: false,
                isErrorLoadingDetailPro: false,
                product: "",
            };
        case CREATE_PRO_ERROR:
            return {
                ...state,
                isLoadingCreatePro: false,
                isLoadingPagination: false,
                isErrorLoadingDetailPro: false,
                product: "",
            };
        case CREATE_PRO_SUCCESS:
            return {
                ...state,
                isLoadingCreatePro: false,
                isLoadingPagination: false,
                isErrorLoadingDetailPro: false,
                product: "",
            };
        case ALL_PRO_REQUEST:
            return {
                ...state,
                prosNum: "",
                isLoadingCreatePro: false,
                isLoadingPagination: false,
                isErrorLoadingDetailPro: false,
                product: "",
            };
        case ALL_PRO_ERROR:
            return {
                ...state,
                prosNum: "",
                isLoadingCreatePro: false,
                isLoadingPagination: false,
                isErrorLoadingDetailPro: false,
                product: "",
            };
        case ALL_PRO_SUCCESS:
            return {
                ...state,
                prosNum: action.payload,
                isLoadingCreatePro: false,
                isLoadingPagination: false,
                isErrorLoadingDetailPro: false,
                product: "",
            };
        case READ_PRO_REQUEST:
            return {
                ...state,
                isLoadingCreatePro: false,
                isLoadingPagination: true,
                isErrorLoadingDetailPro: false,
                product: "",
            };
        case READ_PRO_ERROR:
            return {
                ...state,
                isLoadingCreatePro: false,
                isLoadingPagination: false,
                isErrorLoadingDetailPro: false,
                product: "",
            };
        case READ_PRO_SUCCESS:
            return {
                ...state,
                page: action.payload?.page,
                limit: action.payload?.limit,
                listPros: action.payload?.res,
                isLoadingCreatePro: false,
                isLoadingPagination: false,
                isErrorLoadingDetailPro: false,
                product: "",
            };
        case DETAIL_PRO_REQUEST:
            return {
                ...state,
                isLoadingCreatePro: false,
                isLoadingPagination: false,
                isErrorLoadingDetailPro: false,
                product: "",
            };
        case DETAIL_PRO_ERROR:
            return {
                ...state,
                isLoadingCreatePro: false,
                isLoadingPagination: false,
                isErrorLoadingDetailPro: true,
                product: "",
            };
        case DETAIL_PRO_SUCCESS:
            return {
                ...state,
                isLoadingCreatePro: false,
                isLoadingPagination: false,
                isErrorLoadingDetailPro: false,
                product: "",
            };
        default:
            return state;
    }
};

export default productReducer;
