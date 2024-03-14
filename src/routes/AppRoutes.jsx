import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import DetailCustomer from "../pages/DetailCustomer";
import DetailProduct from "../pages/DetailProduct";
import ManageCustomer from "../pages/managecustomer/ManageCustomers";
import ManageUser from "../pages/ManageUser";
import ManageProduct from "../pages/ManageProduct";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = (props) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route
                    path="/detail-product/:id"
                    element={<DetailProduct />}
                ></Route>
                <Route
                    path="/manage-customer"
                    element={
                        <PrivateRoutes>{<ManageCustomer />}</PrivateRoutes>
                    }
                />
                <Route
                    path="/manage-user"
                    element={<PrivateRoutes>{<ManageUser />}</PrivateRoutes>}
                />
                <Route
                    path="/manage-product"
                    element={<PrivateRoutes>{<ManageProduct />}</PrivateRoutes>}
                />
                <Route
                    path="/detail-customer/:userId"
                    element={
                        <PrivateRoutes>{<DetailCustomer />}</PrivateRoutes>
                    }
                />
                <Route path="/*" element={<NotFoundPage />}></Route>
            </Routes>
        </>
    );
};

export default AppRoutes;
