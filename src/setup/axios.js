import axios from "axios";
import { toast } from "react-toastify";

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
});

instance.defaults.withCredentials = true; // config axios : mỗi khi gửi req lên server nodejs sẽ luôn mặc định đính kèm cookie

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error

        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const status =
            (error && error.response && error.response.status) || 500;

        switch (status) {
            case 401: {
                if (
                    window.location.pathname !== "/" &&
                    window.location.pathname !== "/login" &&
                    window.location.pathname !== "/register"
                ) {
                    toast.error(
                        "Vui lòng đăng nhập đúng vai trò để thực hiện chức năng này"
                    );
                }
                return error.response.data;
            }
            case 403: {
                return error.response.data;
            }

            case 400: {
                return error.response.data;
            }

            case 404: {
                return error.response.data;
            }
            case 409: {
                return error.response.data;
            }
            case 422: {
                return error.response.data;
            }
            case 500: {
                return error.response.data;
            }
            default: {
                return;
            }
        }
    }
);

export default instance;
