import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/header/Header";
import { refreshUserRedux } from "./redux/actions/authAction";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(refreshUserRedux());
    }, []);

    return (
        <>
            <Router>
                <div className="app-header">
                    <Header />
                </div>
                <div className="app-container">
                    <AppRoutes />
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Router>
        </>
    );
}

export default App;
