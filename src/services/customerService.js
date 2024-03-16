import axios from "../setup/axios";

const addNewCustomer = (username, phoneNumber) => {
    return axios.post("/api/customer/create", {
        username,
        phoneNumber,
    });
};

const getCustomerWithPagination = (page, limit) => {
    return axios.get("/api/customer/read", {
        params: {
            page,
            limit,
        },
    });
};

const getCustomerDetail = (cusId) => {
    return axios.get(`/api/customer/` + cusId);
};

const updateCustomer = (id, username, phoneNumber) => {
    return axios.put("/api/customer/update", {
        id,
        username,
        phoneNumber,
    });
};

const getAllCusNum = () => {
    return axios.get("api/customer/read-all-number");
};

const searchAllCusByValue = (q, currentPage) => {
    return axios.get("api/customer/search", {
        params: {
            q,
            currentPage,
        },
    });
};

export {
    addNewCustomer,
    getCustomerWithPagination,
    getCustomerDetail,
    updateCustomer,
    getAllCusNum,
    searchAllCusByValue,
};
