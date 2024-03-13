import { toast } from "react-toastify";
import {
    REGISTER_AUTH_REQUEST,
    REGISTER_AUTH_SUCCESS,
    REGISTER_AUTH_ERROR,
    LOGIN_AUTH_REQUEST,
    LOGIN_AUTH_ERROR,
    LOGIN_AUTH_SUCCESS,
    LOGOUT_AUTH_REQUEST,
    LOGOUT_AUTH_SUCCESS,
} from "../types/authType";
import {
    REFRESH_USER_REQUEST,
    REFRESH_USER_ERROR,
    REFRESH_USER_SUCCESS,
} from "../types/userType";

import {
    authRegister,
    authLogin,
    authLogout,
} from "../../services/authService";
import { refreshUser } from "../../services/userService";

const fetchRegisterRedux = (email, phoneNumber, username, password) => {
    return async (dispatch, getState) => {
        dispatch(fetchRegisterRequest());
        try {
            const res = await authRegister(
                email,
                phoneNumber,
                username,
                password
            );

            console.log(">> check response register: ", res);
            if (res && +res?.EC === 0) {
                toast.success(res?.EM);
                dispatch(fetchRegisterSuccess(res));
            } else {
                toast.error(res?.EM);
                dispatch(fetchRegisterError(res));
            }
        } catch (e) {
            toast.error("Đăng kí thất bại");
            dispatch(fetchRegisterError("Đăng kí thất bại"));
        }
    };
};

const fetchRegisterRequest = () => {
    return {
        type: REGISTER_AUTH_REQUEST,
    };
};

const fetchRegisterError = (payload) => {
    return {
        type: REGISTER_AUTH_ERROR,
        payload,
    };
};

const fetchRegisterSuccess = (payload) => {
    return {
        type: REGISTER_AUTH_SUCCESS,
        payload,
    };
};

const fetchLoginRedux = (valueLogin, password) => {
    return async (dispatch, getState) => {
        dispatch(fetchLoginRequest());
        try {
            const res = await authLogin(valueLogin, password);
            console.log(">> check response login: ", res);
            toast.success("Đăng nhập thành công");
            dispatch(fetchLoginSuccess(res));
        } catch (e) {
            toast.error("Đăng nhập thất bại");
            dispatch(fetchLoginError());
        }
    };
};

const fetchLoginRequest = () => {
    return {
        type: LOGIN_AUTH_REQUEST,
    };
};

const fetchLoginError = (payload) => {
    return {
        type: LOGIN_AUTH_ERROR,
        payload,
    };
};

const fetchLoginSuccess = (payload) => {
    return {
        type: LOGIN_AUTH_SUCCESS,
        payload,
    };
};

const fetchLogoutRedux = () => {
    return async (dispatch, getState) => {
        dispatch(fetchLogoutRequest());
        try {
            const res = await authLogout();
            console.log(">> check response logout: ", res);
            toast.success("Đăng xuất thành công");
            dispatch(fetchLogoutSuccess(res));
        } catch (e) {
            toast.error("Đăng xuất thất bại!");
        }
    };
};

const fetchLogoutRequest = () => {
    return {
        type: LOGOUT_AUTH_REQUEST,
    };
};

const fetchLogoutSuccess = (payload) => {
    return {
        type: LOGOUT_AUTH_SUCCESS,
        payload,
    };
};

const refreshUserRedux = () => {
    return async (dispatch, getState) => {
        dispatch(refreshUserRequest());
        try {
            const res = await refreshUser();
            console.log(">> check response refresh user: ", res);
            dispatch(refreshUserSuccess(res));
        } catch (e) {
            toast.error("Tải thông tin thất bại!");
            dispatch(refreshUserError());
        }
    };
};

const refreshUserRequest = () => {
    return {
        type: REFRESH_USER_REQUEST,
    };
};
const refreshUserError = () => {
    return {
        type: REFRESH_USER_ERROR,
    };
};
const refreshUserSuccess = (payload) => {
    return {
        type: REFRESH_USER_SUCCESS,
        payload,
    };
};

export {
    fetchRegisterRedux,
    fetchLoginRedux,
    fetchLogoutRedux,
    refreshUserRedux,
};
