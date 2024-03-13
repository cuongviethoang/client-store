import {
    READ_USER_REQUEST,
    READ_USER_ERROR,
    READ_USER_SUCCESS,
    CREATE_USER_REQUEST,
    CREATE_USER_ERROR,
    CREATE_USER_SUCCESS,
    DELETE_USER_REQUEST,
    DELETE_USER_ERROR,
    DELETE_USER_SUCCESS,
} from "../types/userType";
import { toast } from "react-toastify";
import {
    addNewUser,
    getUserWithPagination,
    deleteUser,
} from "../../services/userService";

const readUserPaginationRedux = (page, limit) => {
    return async (dispatch, getState) => {
        dispatch(readUserRequest());
        try {
            const res = await getUserWithPagination(page, limit);
            console.log(">> check response read user: ", res);
            const data = {
                page: page,
                limit: limit,
                res: res,
            };
            dispatch(readUserSuccess(data));
        } catch (e) {
            toast.error("Tải nhân viên thất bại");
            dispatch(readUserError());
        }
    };
};

const readUserRequest = () => {
    return {
        type: READ_USER_REQUEST,
    };
};
const readUserError = () => {
    return {
        type: READ_USER_ERROR,
    };
};
const readUserSuccess = (payload) => {
    return {
        type: READ_USER_SUCCESS,
        payload,
    };
};

const createUserRedux = (data) => {
    return async (dispatch, getState) => {
        dispatch(createUserRequest());
        try {
            const res = await addNewUser(data);
            console.log(">> check response add user: ", res);

            if (res && +res?.EC === 0) {
                toast.success(res?.EM);
                dispatch(createUserSuccess());
            } else {
                toast.error(res?.EM);
                dispatch(createUserError());
            }
        } catch (e) {
            toast.error("Thất bại. Vui lòng thử lại!");
            dispatch(createUserError());
        }
    };
};

const createUserRequest = () => {
    return {
        type: CREATE_USER_REQUEST,
    };
};
const createUserError = () => {
    return {
        type: CREATE_USER_ERROR,
        payload,
    };
};
const createUserSuccess = () => {
    return {
        type: CREATE_USER_SUCCESS,
        payload,
    };
};

const deleteUserRedux = (userId) => {
    return async (dispatch, getState) => {
        dispatch(deleteUserRequest());
        try {
            const res = await deleteUser(userId);
            console.log(">> check response delete user: ", res);
            if (res && +res?.EC === 0) {
                toast.success(res?.EM);
                dispatch(deleteUserSuccess());
            } else {
                toast.error(res?.EM);
                dispatch(deleteUserError());
            }
        } catch (e) {
            toast.error("Thất bại, Vui lòng thử lại!");
        }
    };
};

const deleteUserRequest = () => {
    return {
        type: DELETE_USER_REQUEST,
    };
};
const deleteUserError = () => {
    return {
        type: DELETE_USER_ERROR,
    };
};
const deleteUserSuccess = () => {
    return {
        type: DELETE_USER_SUCCESS,
    };
};

export { readUserPaginationRedux, deleteUserRedux, createUserRedux };
