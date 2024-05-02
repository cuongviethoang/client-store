import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getListOrderOfUserWithPagination } from "../../redux/actions/orderAction";
import { Container } from "react-bootstrap";
import ReactPaginate from "react-paginate";

const ManageOder = () => {
    const { cusId } = useParams();
    const dispatch = useDispatch();
    const listOrders = useSelector((state) => state.order.listOrder);
    const isLoadingPaginationOrder = useSelector(
        (state) => state.order.isLoadingPaginationOrder
    );
    const [curPage, setCurPage] = useState(1);

    useEffect(() => {
        dispatch(getListOrderOfUserWithPagination(cusId, curPage));
    }, [curPage]);

    const handlePageClick = async (event) => {
        setCurPage(+event.selected + 1);
    };

    const moneyForm = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
    });

    return (
        <>
            <Container>
                <div className="manage-users-container">
                    <div className="user-header my-3">
                        <div className="title">
                            <h3>Quản lí các đơn hàng của khách hàng</h3>
                        </div>

                        <div className="action">
                            <Link to={`/manage-customer`}>
                                <button className="btn btn-primary">
                                    Quay về trang quản lí khách hàng
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="user-body overflow-auto">
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Thời gian mua</th>
                                    <th scope="col">Số tiền phải trả</th>
                                    <th scope="col">Số tiền khách trả</th>
                                    <th scope="col">Số tiền hoàn lại</th>
                                    <th scope="col">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {isLoadingPaginationOrder ? (
                                    <tr>
                                        <td>Vui lòng đợi trong giây lát</td>
                                    </tr>
                                ) : (
                                    <>
                                        {listOrders &&
                                        listOrders?.data.length > 0 ? (
                                            <>
                                                {listOrders.data.map(
                                                    (item, index) => (
                                                        <tr
                                                            key={`row-${index}`}
                                                        >
                                                            <td className="text-left">
                                                                {(curPage - 1) *
                                                                    8 +
                                                                    index +
                                                                    1}
                                                            </td>
                                                            <td className="text-left">
                                                                {
                                                                    item.createTime
                                                                }
                                                            </td>
                                                            <td className="text-right">
                                                                {moneyForm.format(
                                                                    item.payment
                                                                        .total
                                                                )}
                                                            </td>
                                                            <td className="text-right">
                                                                {moneyForm.format(
                                                                    item.payment
                                                                        .customerPaid
                                                                )}
                                                            </td>
                                                            <td className="text-right">
                                                                {moneyForm.format(
                                                                    item.payment
                                                                        .refunds
                                                                )}
                                                            </td>
                                                            <td className="d-flex justify-content-center gap-3">
                                                                <Link
                                                                    to={`/manage-item-order-of-order/${cusId}/${item.id}`}
                                                                >
                                                                    <button className="btn btn-success">
                                                                        Xem các
                                                                        mặt hàng
                                                                    </button>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <tr>
                                                    <td colSpan={6}>
                                                        Không tìm thấy các đơn
                                                        hàng của khách hàng
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {listOrders && listOrders?.total_page > 0 && (
                        <div className="user-footer d-flex justify-content-center">
                            <ReactPaginate
                                forcePage={curPage - 1}
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={4}
                                marginPagesDisplayed={2}
                                pageCount={listOrders?.total_page}
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
            </Container>
        </>
    );
};

export default ManageOder;
