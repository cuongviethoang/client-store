import axios from "../setup/axios";

const refreshUser = () => {
    return axios.post("/api/user/account");
};

const getUserWithPagination = (page, limit) => {
    return axios.get("/api/user/read", {
        params: {
            page,
            limit,
        },
    });
};

const addNewUser = (data) => {
    return axios.post("/api/user/create", {
        user: data,
    });
};

const deleteUser = (userId) => {
    return axios.delete(`/api/user/delete/` + userId);
};

export { refreshUser, addNewUser, getUserWithPagination, deleteUser };
