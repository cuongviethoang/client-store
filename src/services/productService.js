import axios from "../setup/axios";

const addNewProduct = (productName, productImage, qrCode, price, total) => {
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productImage", productImage);
    formData.append("qrCode", qrCode);
    formData.append("price", price);
    formData.append("total", total);

    return axios.post("/api/product/create", formData);
};

const getAllNumberPro = () => {
    return axios.get("/api/product/read-all-number");
};

const getProductWithPagination = (page, limit) => {
    return axios.get("/api/product/read-all", {
        params: {
            page,
            limit,
        },
    });
};

const getDetailProduct = (proId) => {
    return axios.get(`/api/product/` + proId);
};

export {
    addNewProduct,
    getProductWithPagination,
    getDetailProduct,
    getAllNumberPro,
};
