import axios from "../setup/axios";


const getAllOrder = () => {
    return axios.get("/api/order-all");
};

const getOrderById = (orderId) => {
    return axios.get(`/api/order/get/${orderId}`)
}

export {
    getAllOrder,
    getOrderById
}