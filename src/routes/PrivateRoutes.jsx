import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const PrivateRoutes = (props) => {
    const auth = useSelector((state) => state.auth?.data?.isAuthentication);

    const content = auth === true ? <>{props.children}</> : null;
    const isLoadingRefresh = useSelector(
        (state) => state.auth.isLoadingRefresh
    );

    useEffect(() => {
        if (!content && isLoadingRefresh === false) {
            toast.info("Bạn không thể dùng chức nằng");
        }
    }, [content]);

    return content;
};

export default PrivateRoutes;
