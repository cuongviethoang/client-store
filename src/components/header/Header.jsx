import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useLocation } from "react-router-dom";
import { fetchLogoutRedux } from "../../redux/actions/authAction";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import "./Header.scss";

import "./Header.scss";
const Header = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector((state) => state.auth.data);

    const handleLogoutUser = async () => {
        dispatch(fetchLogoutRedux());
    };

    if (user.isAuthentication || location.pathname === "/") {
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
                                        Home
                                    </NavLink>
                                    {/* <NavLink className="nav-link" to="/user">
                                        User
                                    </NavLink>
                                    <NavLink className="nav-link" to="/roles">
                                        Roles
                                    </NavLink>
                                    <NavLink
                                        className="nav-link"
                                        to="/group-role"
                                    >
                                        GroupRoles
                                    </NavLink> */}
                                </Nav>
                                <Nav>
                                    {user?.isAuthentication ? (
                                        <>
                                            <Nav.Item
                                                href="#deets"
                                                className="nav-link"
                                            >
                                                Welcome{" "}
                                                {user?.dataLogin?.username} !
                                            </Nav.Item>
                                            <Link
                                                className="nav-link"
                                                onClick={() =>
                                                    handleLogoutUser()
                                                }
                                            >
                                                Logout
                                            </Link>
                                        </>
                                    ) : (
                                        <NavLink
                                            to="/login"
                                            exact="true"
                                            className="nav-link"
                                        >
                                            Login
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
