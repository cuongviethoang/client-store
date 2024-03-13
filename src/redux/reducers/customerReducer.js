import {
    CREATE_CUS_REQUEST,
    CREATE_CUS_SUCCESS,
    READ_CUS_REQUEST,
    READ_CUS_SUCCESS,
    DETAIL_CUS_REQUEST,
    DETAIL_CUS_SUCCESS,
    UPDATE_CUS_REQUEST,
    UPDATE_CUS_SUCCESS,
} from "../types/customerType";

const INITIAL_STATE = {
    listCus: "",
    cus: "",
    isLoadingPagination: false,
    isLoadingCreateCus: false,
    isLoadingUpdateCus: false,
    isLoadingDetailCus: false,
    pageCus: 0,
    limitCus: 0,
};

const customerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case READ_CUS_REQUEST:
            return {
                ...state,
                listCus: "",
                isLoadingPagination: true,
                isLoadingCreateCus: false,
                isLoadingUpdateCus: false,
                isLoadingDetailCus: false,
            };
        case READ_CUS_SUCCESS:
            return {
                ...state,
                listCus: action.payload?.res,
                pageCus: action.payload?.page,
                limitCus: action.payload?.limit,
                isLoadingPagination: false,
                isLoadingCreateCus: false,
                isLoadingUpdateCus: false,
                isLoadingDetailCus: false,
            };
        case CREATE_CUS_REQUEST:
            return {
                ...state,
                isLoadingPagination: false,
                isLoadingCreateCus: true,
                isLoadingUpdateCus: false,
                isLoadingDetailCus: false,
            };
        case CREATE_CUS_SUCCESS:
            return {
                ...state,
                isLoadingPagination: false,
                isLoadingCreateCus: false,
                isLoadingUpdateCus: false,
                isLoadingDetailCus: false,
            };
        case DETAIL_CUS_REQUEST:
            return {
                ...state,
                isLoadingPagination: false,
                isLoadingCreateCus: false,
                isLoadingUpdateCus: false,
                isLoadingDetailCus: true,
            };
        case DETAIL_CUS_SUCCESS:
            return {
                ...state,
                cus: action.payload,
                isLoadingPagination: false,
                isLoadingCreateCus: false,
                isLoadingUpdateCus: false,
                isLoadingDetailCus: false,
            };
        case UPDATE_CUS_REQUEST:
            return {
                ...state,
                isLoadingPagination: false,
                isLoadingCreateCus: false,
                isLoadingUpdateCus: true,
                isLoadingDetailCus: false,
            };
        case UPDATE_CUS_SUCCESS:
            return {
                ...state,
                isLoadingPagination: false,
                isLoadingCreateCus: false,
                isLoadingUpdateCus: false,
                isLoadingDetailCus: false,
            };
        default:
            return state;
    }
};

export default customerReducer;
