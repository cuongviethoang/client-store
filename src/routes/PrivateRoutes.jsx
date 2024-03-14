import { useSelector } from "react-redux";

const PrivateRoutes = (props) => {
    const auth = useSelector((state) => state.auth?.data?.isAuthentication);

    const content = auth === true ? <>{props.children}</> : null;

    return content;
};

export default PrivateRoutes;
