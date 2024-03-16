import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import {
    readProPaginationRedux,
    AllProRedux,
} from "../../redux/actions/productAction";
import ReactPaginate from "react-paginate";

import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import "./Home.scss";
const Home = () => {
    const dispatch = useDispatch();
    const listPros = useSelector((state) => state.product.listPros);
    const page = useSelector((state) => state.product.page);
    const limit = useSelector((state) => state.product.limit);
    const isLoadingPagination = useSelector(
        (state) => state.product.isLoadingPagination
    );
    const prosNum = Math.ceil(
        useSelector((state) => state.product.prosNum) / limit
    );

    const [currentPage, setCurrentPage] = useState(page);

    useEffect(() => {
        dispatch(AllProRedux());
    }, []);

    useEffect(() => {
        dispatch(readProPaginationRedux(currentPage, limit));
    }, [currentPage]);

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    return (
        <>
            <Container>
                <h2 className="mt-3">List product</h2>
                <div className="product-container">
                    {isLoadingPagination === true ? (
                        <p>Vui lòng chờ trong giây lát</p>
                    ) : (
                        <>
                            {listPros &&
                                listPros.length > 0 &&
                                listPros.map((pro, index) => (
                                    <Card
                                        style={{ width: "19rem" }}
                                        key={`pro-${index}`}
                                    >
                                        <Card.Img
                                            className="img-product"
                                            variant="top"
                                            src={`data:image/jpeg;base64,${pro?.productImage}`}
                                        />
                                        <Card.Body>
                                            <Card.Title>
                                                {pro?.productName}
                                            </Card.Title>
                                            <Card.Text>
                                                Giá thành: {pro?.price}
                                            </Card.Text>
                                            <Card.Text>
                                                Số lượng: {pro?.total}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                ))}
                        </>
                    )}
                </div>
                {prosNum > 0 && (
                    <div className="user-footer d-flex justify-content-center mt-3">
                        <ReactPaginate
                            forcePage={page - 1}
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={4}
                            marginPagesDisplayed={2}
                            pageCount={prosNum}
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
            </Container>
        </>
    );
};

export default Home;
