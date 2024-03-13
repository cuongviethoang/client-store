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

const updateCustomer = (cus) => {
    return axios.update("/api/customer/update", {
        customer: cus,
    });
};

export {
    addNewCustomer,
    getCustomerWithPagination,
    getCustomerDetail,
    updateCustomer,
};
