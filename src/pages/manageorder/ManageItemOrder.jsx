import { Link, useParams } from "react-router-dom";
import { getItemOrderOfOrderWithPagination } from "../../redux/actions/itemOrderAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Container } from "react-bootstrap";

const ManageItemOrder = () => {
    const { cusId, orderId } = useParams();
    const dispatch = useDispatch();
    const listItemOrders = useSelector(
        (state) => state.itemOrder.listItemOrders
    );
    const isLoadingPaginationItemOrder = useSelector(
        (state) => state.itemOrder.isLoadingPaginationItemOrder
    );

    const [curPage, setCurPage] = useState(1);

    useEffect(() => {
        dispatch(getItemOrderOfOrderWithPagination(orderId, curPage));
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
                            <h3>Các mặt hàng trong đã mua trong 1 đơn hàng</h3>
                        </div>

                        <div className="action">
                            <Link to={`/manage-order-of-customer/${cusId}`}>
                                <button className="btn btn-primary">
                                    Quay về trang quản lí các đơn hàng của khách
                                    hàng
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="user-body overflow-auto">
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Tên mặt hàng</th>
                                    <th scope="col">Giá tiền 1 sản phẩm</th>
                                    <th scope="col">Tổng sản phẩm</th>
                                    <th scope="col">Số tiền phải trả</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {isLoadingPaginationItemOrder ? (
                                    <tr>
                                        <td>Vui lòng đợi trong giây lát</td>
                                    </tr>
                                ) : (
                                    <>
                                        {listItemOrders &&
                                        listItemOrders?.data.length > 0 ? (
                                            <>
                                                {listItemOrders.data.map(
                                                    (item, index) => (
                                                        <tr
                                                            key={`row-${index}`}
                                                        >
                                                            <td>
                                                                {(curPage - 1) *
                                                                    10 +
                                                                    index +
                                                                    1}
                                                            </td>
                                                            <td>
                                                                {
                                                                    item
                                                                        ?.product
                                                                        ?.productName
                                                                }
                                                            </td>
                                                            <td>
                                                                {moneyForm.format(
                                                                    item
                                                                        ?.product
                                                                        ?.price
                                                                )}
                                                            </td>
                                                            <td>
                                                                {item?.quantity}
                                                            </td>
                                                            <td>
                                                                {moneyForm.format(
                                                                    item?.quantity *
                                                                        item
                                                                            ?.product
                                                                            ?.price
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <tr>
                                                    <td colSpan={5}>
                                                        Không tìm thấy các mặt
                                                        hàng trong đơn hàng của
                                                        khách hàng
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {listItemOrders && listItemOrders?.total_page > 0 && (
                        <div className="user-footer d-flex justify-content-center">
                            <ReactPaginate
                                forcePage={curPage - 1}
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={4}
                                marginPagesDisplayed={2}
                                pageCount={listItemOrders?.total_page}
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

export default ManageItemOrder;
