import {
    REGISTER_AUTH_REQUEST,
    REGISTER_AUTH_SUCCESS,
    LOGIN_AUTH_REQUEST,
    LOGIN_AUTH_SUCCESS,
    LOGOUT_AUTH_REQUEST,
    LOGOUT_AUTH_SUCCESS,
} from "../types/authType";

import { REFRESH_USER_REQUEST, REFRESH_USER_SUCCESS } from "../types/userType";

const INITIAL_STATE = {
    data: {
        isAuthentication: false,
        dataLogin: "",
    },
    isLoadingRegister: false,
    isLoadingLogin: false,
    isLoadingLogout: false,
    isLoadingRefresh: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REFRESH_USER_REQUEST:
            return {
                ...state,
                data: {
                    isAuthentication: false,
                    dataLogin: "",
                },
                isLoadingRegister: true,
                isLoadingLogin: false,
                isLoadingLogout: false,
                isLoadingRefresh: true,
            };
        case REFRESH_USER_SUCCESS:
            return {
                ...state,
                data: {
                    isAuthentication: true,
                    dataLogin: action.payload,
                },
                isLoadingRegister: true,
                isLoadingLogin: false,
                isLoadingLogout: false,
                isLoadingRefresh: false,
            };
        case REGISTER_AUTH_REQUEST:
            return {
                ...state,
                data: {
                    isAuthentication: false,
                    dataLogin: "",
                },
                isLoadingRegister: true,
                isLoadingLogin: false,
                isLoadingLogout: false,
                isLoadingRefresh: false,
            };
        case REGISTER_AUTH_SUCCESS:
            return {
                ...state,
                data: {
                    isAuthentication: false,
                    dataLogin: "",
                },
                isLoadingRegister: false,
                isLoadingLogin: false,
                isLoadingLogout: false,
                isLoadingRefresh: false,
            };
        case LOGIN_AUTH_REQUEST:
            return {
                ...state,
                data: {
                    isAuthentication: false,
                    dataLogin: "",
                },
                isLoadingRegister: false,
                isLoadingLogin: true,
                isLoadingLogout: false,
                isLoadingRefresh: false,
            };
        case LOGIN_AUTH_SUCCESS:
            return {
                ...state,
                data: {
                    isAuthentication: true,
                    dataLogin: action.payload,
                },
                isLoadingRegister: false,
                isLoadingLogin: false,
                isLoadingLogout: false,
                isLoadingRefresh: false,
            };
        case LOGOUT_AUTH_REQUEST:
            return {
                ...state,
                data: {
                    isAuthentication: true,
                    dataLogin: action.payload,
                },
                isLoadingRegister: false,
                isLoadingLogin: false,
                isLoadingLogout: true,
                isLoadingRefresh: false,
            };
        case LOGOUT_AUTH_SUCCESS:
            return {
                ...state,
                data: {
                    isAuthentication: false,
                    dataLogin: "",
                },
                isLoadingRegister: false,
                isLoadingLogin: false,
                isLoadingLogout: false,
                isLoadingRefresh: false,
            };
        default:
            return state;
    }
};

export default authReducer;
