import {
    CREATE_CUS_REQUEST,
    CREATE_CUS_SUCCESS,
    CREATE_CUS_ERROR,
    READ_CUS_REQUEST,
    READ_CUS_SUCCESS,
    READ_CUS_ERROR,
    DETAIL_CUS_REQUEST,
    DETAIL_CUS_SUCCESS,
    DETAIL_CUS_ERROR,
    UPDATE_CUS_REQUEST,
    UPDATE_CUS_SUCCESS,
    UPDATE_CUS_ERROR,
    ALL_CUS_REQUEST,
    ALL_CUS_ERROR,
    ALL_CUS_SUCCESS,
    SEARCH_CUS_REQUEST,
    SEARCH_CUS_ERROR,
    SEARCH_CUS_SUCCESS,
} from "../types/customerType";

const INITIAL_STATE = {
    listCus: "",
    cus: "",
    isLoadingAllCusNumber: false,
    isLoadingPagination: false,
    isLoadingCreateCus: false,
    isCreateCusSuccess: false,
    isLoadingUpdateCus: false,
    isUpdateCusSuccess: false,
    isLoadingDetailCus: false,
    isSearchLoading: false,
    dataCusSearch: "",
    pageCus: 1,
    limitCus: 10,
    totalCus: "",
};

const customerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case READ_CUS_REQUEST: // yêu cầu phân trang
            return {
                ...state,
                listCus: "",
                isLoadingAllCusNumber: false,
                isLoadingPagination: true,
                isLoadingCreateCus: false,
                isCreateCusSuccess: false,
                isLoadingUpdateCus: false,
                isUpdateCusSuccess: false,
                cus: "",
            };
        case READ_CUS_SUCCESS: // phân trang thành công
            return {
                ...state,
                listCus: action.payload?.res,
                pageCus: action.payload?.page,
                limitCus: action.payload?.limit,
                isLoadingAllCusNumber: false,
                isLoadingPagination: false,
                isLoadingCreateCus: false,
                isCreateCusSuccess: false,
                isLoadingUpdateCus: false,
                isUpdateCusSuccess: false,
                cus: "",
            };
        case READ_CUS_ERROR: // phân trang thất bại
            return {
                ...state,
                isLoadingAllCusNumber: false,
                isLoadingPagination: false,
                isLoadingCreateCus: false,
                isCreateCusSuccess: false,
                cus: "",
            };
        case ALL_CUS_REQUEST: // yêu cầu lấy số lượng khách hàng
            return {
                ...state,
                totalCus: "",
                isLoadingAllCusNumber: true,
                isLoadingPagination: false,
                isLoadingCreateCus: false,
                isCreateCusSuccess: false,
                cus: "",
            };
        case ALL_CUS_SUCCESS: // lấy số lượng khách hàng thành công
            return {
                ...state,
                totalCus: action?.payload,
                isLoadingAllCusNumber: false,
                isLoadingPagination: false,
                isLoadingCreateCus: false,
                isCreateCusSuccess: false,
                cus: "",
            };
        case ALL_CUS_ERROR: // lấy số lượng khách hàng thất bại
            return {
                ...state,
                totalCus: "",
                isLoadingAllCusNumber: false,
                isLoadingPagination: false,
                isLoadingCreateCus: false,
                isCreateCusSuccess: false,
                cus: "",
            };
        case CREATE_CUS_REQUEST: // yêu cầu tạo mới người dùng
            return {
                ...state,
                isLoadingAllCusNumber: false,
                isLoadingPagination: false,
                isLoadingCreateCus: true,
                isCreateCusSuccess: false,
                cus: "",
            };
        case CREATE_CUS_SUCCESS:
            return {
                ...state,
                isLoadingAllCusNumber: false,
                isLoadingPagination: false,
                isLoadingCreateCus: false,
                isCreateCusSuccess: true,
                cus: "",
            };
        case CREATE_CUS_ERROR:
            return {
                ...state,
                isLoadingAllCusNumber: false,
                isLoadingPagination: false,
                isLoadingCreateCus: false,
                isCreateCusSuccess: false,
                cus: "",
            };
        case DETAIL_CUS_REQUEST:
            return {
                ...state,
                isLoadingAllCusNumber: false,
                isLoadingPagination: false,
                isLoadingDetailCus: true,
                cus: "",
            };
        case DETAIL_CUS_SUCCESS:
            return {
                ...state,
                cus: action.payload,
                isLoadingAllCusNumber: false,
                isLoadingPagination: false,
                isLoadingDetailCus: false,
            };
        case DETAIL_CUS_ERROR:
            return {
                ...state,
                isLoadingAllCusNumber: false,
                isLoadingPagination: false,
                isLoadingDetailCus: false,
                cus: "",
            };
        case UPDATE_CUS_REQUEST:
            return {
                ...state,
                isLoadingAllCusNumber: false,
                isLoadingPagination: false,
                isLoadingUpdateCus: true,
                isUpdateCusSuccess: false,
                cus: "",
            };
        case UPDATE_CUS_SUCCESS:
            return {
                ...state,
                isLoadingAllCusNumber: false,
                isLoadingPagination: false,
                isLoadingUpdateCus: false,
                isUpdateCusSuccess: true,
                cus: "",
            };
        case UPDATE_CUS_ERROR:
            return {
                ...state,
                isLoadingAllCusNumber: false,
                isLoadingPagination: false,
                isLoadingUpdateCus: false,
                isUpdateCusSuccess: false,
                cus: "",
            };
        case SEARCH_CUS_REQUEST:
            return {
                ...state,
                isSearchLoading: true,
                dataCusSearch: "",
                cus: "",
            };
        case SEARCH_CUS_ERROR:
            return {
                ...state,
                isSearchLoading: false,
                dataCusSearch: "",
                cus: "",
            };
        case SEARCH_CUS_SUCCESS:
            return {
                ...state,
                isSearchLoading: false,
                dataCusSearch: action.payload,
                cus: "",
            };
        default:
            return state;
    }
};

export default customerReducer;
