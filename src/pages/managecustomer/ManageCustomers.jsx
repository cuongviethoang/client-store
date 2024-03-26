import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
import {
    allCusRedux,
    readCusPaginationRedux,
} from "../../redux/actions/customerAction";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import ModalCreateCustomer from "./ModalCreateCustomer";
import ModalEditCustomer from "./ModalEditCustomer";
import ModalSearchCustomer from "./ModalSearchCustomer";
const ManageCustomers = () => {
    const dispatch = useDispatch();
    const listCus = useSelector((state) => state.cus.listCus);
    const isLoadingAllCusNumber = useSelector(
        (state) => state.cus.isLoadingAllCusNumber
    );
    const isLoadingPagination = useSelector(
        (state) => state.cus.isLoadingPagination
    );
    const isCreateCusSuccess = useSelector(
        (state) => state.cus.isCreateCusSuccess
    );
    const pageCus = useSelector((state) => state.cus.pageCus);
    const limitCus = useSelector((state) => state.cus.limitCus);

    const cusNum = Math.ceil(
        useSelector((state) => state.cus.totalCus) / limitCus
    );

    const [currentPageCus, setCurrentPageCus] = useState(pageCus);

    useEffect(() => {
        dispatch(allCusRedux());
    }, [isCreateCusSuccess]);

    useEffect(() => {
        dispatch(readCusPaginationRedux(currentPageCus, limitCus));
    }, [currentPageCus]);

    const handlePageClick = async (event) => {
        setCurrentPageCus(+event.selected + 1);
    };

    const handleRefresh = async () => {
        dispatch(readCusPaginationRedux(currentPageCus, limitCus));
    };

    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [dataModal, setDataModal] = useState({});

    const handleOpenModalCreateCustomer = () => {
        setShowModalCreate(true);
    };

    const handleCloseModalCreate = () => {
        setShowModalCreate(false);
    };

    const handleOpenModalEditCustomer = (customer) => {
        setShowModalEdit(true);
        setDataModal(customer);
    };

    const handleCloseModalEdit = () => {
        setShowModalEdit(false);
        setDataModal({});
    };

    // ModalSearchCustomer
    const [modalSearchShow, setModalSearchShow] = useState(false);

    return (
        <>
            <Container>
                <div className="manage-users-container">
                    <div className="user-header my-3">
                        <div className="title">
                            <h3>Manager user</h3>
                        </div>
                        <div className="action">
                            <button
                                className="btn btn-success me-3"
                                onClick={() => handleRefresh()}
                            >
                                Refresh
                            </button>
                            <button
                                className="btn btn-info me-3"
                                onClick={() => handleOpenModalCreateCustomer()}
                            >
                                Thêm mới khách hàng
                            </button>
                            <button
                                className="btn btn-info"
                                onClick={() => setModalSearchShow(true)}
                            >
                                Tìm kiếm khách hàng
                            </button>
                        </div>
                    </div>
                    <div className="user-body overflow-auto">
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Tên</th>
                                    <th scope="col">Số điện thoại</th>
                                    <th scope="col">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {isLoadingAllCusNumber &&
                                isLoadingPagination ? (
                                    <p>Vui lòng đợi trong giây lát</p>
                                ) : (
                                    <>
                                        {listCus && listCus.length > 0 ? (
                                            <>
                                                {listCus.map((item, index) => (
                                                    <tr key={`row-${index}`}>
                                                        <td>
                                                            {(currentPageCus -
                                                                1) *
                                                                limitCus +
                                                                index +
                                                                1}
                                                        </td>
                                                        <td>{item.username}</td>
                                                        <td>
                                                            {item.phoneNumber}
                                                        </td>
                                                        <td className="d-flex justify-content-center gap-3">
                                                            <button className="btn btn-success">
                                                                Xem các đơn hàng
                                                            </button>
                                                            <button
                                                                className="btn btn-warning"
                                                                onClick={() =>
                                                                    handleOpenModalEditCustomer(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                Sửa
                                                            </button>
                                                            <button className="btn btn-danger">
                                                                Xóa
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </>
                                        ) : (
                                            <>
                                                <tr>
                                                    <td>
                                                        Không tìm thấy khách
                                                        hàng
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {cusNum > 0 && (
                        <div className="user-footer d-flex justify-content-center">
                            <ReactPaginate
                                forcePage={pageCus - 1}
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={4}
                                marginPagesDisplayed={2}
                                pageCount={cusNum}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    )}
                </div>
                <ModalCreateCustomer
                    showModalCreate={showModalCreate}
                    handleCloseModalCreate={handleCloseModalCreate}
                />
                <ModalEditCustomer
                    showModalEdit={showModalEdit}
                    handleCloseModalEdit={handleCloseModalEdit}
                    customer={dataModal}
                />
                <ModalSearchCustomer
                    show={modalSearchShow}
                    onHide={() => setModalSearchShow(false)}
                />
            </Container>
        </>
    );
};

export default ManageCustomers;
