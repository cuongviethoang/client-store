import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { fetchLogoutRedux } from "../../redux/actions/authAction";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import "./Header.scss";

import "./Header.scss";
const Header = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector((state) => state.auth.data);
    const isLogoutSuccess = useSelector((state) => state.auth.isLogoutSuccess);

    const handleLogoutUser = async () => {
        dispatch(fetchLogoutRedux());
        if (isLogoutSuccess) {
            navigation("/");
        }
    };

    if (location.pathname !== "/login" && location.pathname !== "/register") {
        return (
            <>
                <div className="nav-header">
                    <Navbar
                        bg="dark"
                        data-bs-theme="dark"
                        expand="lg"
                        className="bg-body-tertiary"
                    >
                        <Container>
                            <Navbar.Brand href="/">FullStack</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink
                                        to="/"
                                        exact="true"
                                        className="nav-link"
                                    >
                                        Trang chủ
                                    </NavLink>
                                    {user?.isAuthentication ? (
                                        <>
                                            <NavLink
                                                className="nav-link"
                                                to="/manage-user"
                                            >
                                                Quản lí nhân viên
                                            </NavLink>
                                            <NavLink
                                                className="nav-link"
                                                to="/manage-customer"
                                            >
                                                Quản lí khách hàng
                                            </NavLink>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </Nav>
                                <Nav>
                                    {user?.isAuthentication ? (
                                        <>
                                            <Nav.Item
                                                href="#deets"
                                                className="nav-link"
                                            >
                                                Xin chào{" "}
                                                {user?.dataLogin?.username} !
                                            </Nav.Item>
                                            <Link
                                                className="nav-link"
                                                onClick={() =>
                                                    handleLogoutUser()
                                                }
                                            >
                                                Đăng xuất
                                            </Link>
                                        </>
                                    ) : (
                                        <NavLink
                                            to="/login"
                                            exact="true"
                                            className="nav-link"
                                        >
                                            Đăng nhập
                                        </NavLink>
                                    )}
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </>
        );
    } else {
        return <></>;
    }
};

export default Header;
