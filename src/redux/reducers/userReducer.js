import {
    READ_USER_REQUEST,
    READ_USER_SUCCESS,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
} from "../types/userType";

const INITIAL_STATE = {
    listUsers: "",
    page: "",
    limit: "",
    isLoadingPagination: false,
    isLoadingCreateUser: false,
    isLoadingDeleteUser: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case READ_USER_REQUEST:
            return {
                ...state,
                listUsers: "",
                isLoadingPagination: true,
                isLoadingCreateUser: false,
                isLoadingDeleteUser: false,
            };
        case READ_USER_SUCCESS:
            return {
                ...state,
                listUsers: action.payload?.res,
                page: action.payload?.page,
                limit: action.payload?.limit,
                isLoadingPagination: false,
                isLoadingCreateUser: false,
                isLoadingDeleteUser: false,
            };
        case CREATE_USER_REQUEST:
            return {
                ...state,
                listUsers: action.payload,
                isLoadingPagination: false,
                isLoadingCreateUser: true,
                isLoadingDeleteUser: false,
            };
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                listUsers: action.payload,
                isLoadingPagination: false,
                isLoadingCreateUser: false,
                isLoadingDeleteUser: false,
            };
        case DELETE_USER_REQUEST:
            return {
                ...state,
                listUsers: action.payload,
                isLoadingPagination: false,
                isLoadingCreateUser: false,
                isLoadingDeleteUser: true,
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                listUsers: action.payload,
                isLoadingPagination: false,
                isLoadingCreateUser: false,
                isLoadingDeleteUser: true,
            };
        default:
            return state;
    }
};

export default userReducer;
