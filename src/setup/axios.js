import axios from "axios";
import { toast } from "react-toastify";

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

instance.defaults.withCredentials = true; // config axios : mỗi khi gửi req lên server nodejs sẽ luôn mặc định đính kèm cookie

// Alter defaults after instance has been created
instance.defaults.headers.common[
    "Authorization"
] = `Bearer ${localStorage.getItem("jwt")}`;

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
        return response.data;
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
                toast.error("Error 400");
                return error.response.data;
            }

            case 404: {
                toast.error("Error 404");

                return error.response.data;
            }
            case 409: {
                toast.error("Error 409");

                return error.response.data;
            }
            case 422: {
                toast.error("Error 422");

                return error.response.data;
            }
            default: {
                return;
            }
        }
    }
);

export default instance;
