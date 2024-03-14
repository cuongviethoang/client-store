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
    REFRESH_USER_REQUEST,
    REFRESH_USER_ERROR,
    REFRESH_USER_SUCCESS,
    LOGOUT_AUTH_ERROR,
} from "../types/authType";
import { useNavigate } from "react-router-dom";

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
            if (res && +res?.status === 200) {
                toast.success(res?.data?.em);
                dispatch(fetchRegisterSuccess(res?.data));
            } else {
                toast.error(res?.data.em);
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
            if (res && +res.status === 200) {
                toast.success("Đăng nhập thành công");
                dispatch(fetchLoginSuccess(res?.data));
            } else {
                toast.error(res?.em);
                dispatch(fetchLoginError());
            }
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
            if (res && +res.status === 200) {
                toast.success(res?.em);
                dispatch(fetchLogoutSuccess(res));
            } else {
                dispatch(fetchLogoutError());
            }
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

const fetchLogoutError = () => {
    return {
        type: LOGOUT_AUTH_ERROR,
    };
};

const refreshUserRedux = () => {
    return async (dispatch, getState) => {
        dispatch(refreshUserRequest());
        try {
            const res = await refreshUser();
            console.log(">> check response refresh user: ", res);
            if (res && +res?.status === 200) {
                dispatch(refreshUserSuccess(res?.data));
            } else {
                dispatch(refreshUserError());
            }
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
