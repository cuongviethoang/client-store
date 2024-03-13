import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchLoginRedux } from "../redux/actions/authAction";
const Login = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth.isAuthentication);
    const isLoadingLogin = useSelector((state) => state.auth.isLoadingLogin);

    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");

    const defaultObjValidInput = {
        isValidValueLogin: true,
        isValidPassword: true,
    };
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

    const [hiddenPassword, setHiddenPassword] = useState(false);

    useEffect(() => {
        if (auth === true) {
            navigation("/");
        }
    }, [auth]);

    const handleLogin = async () => {
        setObjValidInput(defaultObjValidInput);
        if (!valueLogin) {
            setObjValidInput({
                ...defaultObjValidInput,
                isValidValueLogin: false,
            });
            toast.error("Please enter your email or phone number ");
            return;
        }
        if (!password) {
            setObjValidInput({
                ...defaultObjValidInput,
                isValidPassword: false,
            });
            toast.error("Please enter your password");
            return;
        }
        dispatch(fetchLoginRedux(valueLogin, password));
    };

    const handlePressEnter = (e) => {
        if (e.keyCode === 13 && e.code === "Enter") {
            handleLogin();
        }
    };

    return (
        <div className="login-container">
            <div className="container ">
                <div className="row px-sm-0 px-3">
                    <div className="content-left col-12 d-none d-none col-sm-5  d-sm-flex justify-content-center align-items-center">
                        <div className="brand">Login</div>
                    </div>
                    <div className="content-right col-12 col-sm-7 d-flex flex-column gap-3 py-3">
                        <div className="brand d-sm-none brand">Login</div>
                        <div className="form-group">
                            <input
                                className={
                                    objValidInput.isValidValueLogin
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                type="text"
                                placeholder="Email address or phone number"
                                value={valueLogin}
                                onChange={(e) => setValueLogin(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className={
                                    objValidInput.isValidPassword
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                type={hiddenPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => handlePressEnter(e)}
                            />
                            <i
                                className={
                                    hiddenPassword
                                        ? "fa fa-eye icon-eye"
                                        : "fa fa-eye-slash icon-eye"
                                }
                                onClick={() =>
                                    setHiddenPassword(!hiddenPassword)
                                }
                            ></i>
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={handleLogin}
                            disabled={isLoadingLogin}
                        >
                            Login
                        </button>
                        <hr />
                        <Link to="/" className="text-center">
                            Return to home page
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
