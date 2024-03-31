import axios from "../setup/axios";

const getAllOrder = () => {
    return axios.get("/api/order-all");
};

const getOrderById = (orderId) => {
    return axios.get(`/api/order/get/${orderId}`);
};

const getOrdersOfCusWithPagination = (cusId, currentPage) => {
    return axios.get(`api/customer/list-order/${cusId}`, {
        params: {
            currentPage,
        },
    });
};

const getItemOrdersOfOrderWithPagination = (orderId, limit) => {
    return axios.get(`/api/order/list-item-order/${orderId}`, {
        params: {
            limit,
        },
    });
};

export {
    getAllOrder,
    getOrderById,
    getOrdersOfCusWithPagination,
    getItemOrdersOfOrderWithPagination,
};
