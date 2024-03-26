import { useDispatch, useSelector } from "react-redux";
import { readUserPaginationRedux } from "../redux/actions/userAction";
import { useEffect } from "react";

const ManageUser = () => {
    const listUsers = useSelector((state) => state.user.listUsers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(readUserPaginationRedux(1, 100));
    }, []);

    console.log(listUsers);

    return <>ManageUser</>;
};

export default ManageUser;
