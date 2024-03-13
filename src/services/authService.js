import axios from "../setup/axios";

const authRegister = (email, phoneNumber, username, password) => {
    return axios.post("/api/auth/signup", {
        email,
        phoneNumber,
        username,
        password,
    });
};

const authLogin = (valueLogin, password) => {
    return axios.post("/api/auth/signin", {
        valueLogin,
        password,
    });
};

const authLogout = () => {
    return axios.post("/api/auth/logout");
};

export { authLogin, authRegister, authLogout };
