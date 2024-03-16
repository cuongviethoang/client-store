import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { searchCusRedux } from "../../redux/actions/customerAction";
import ReactPaginate from "react-paginate";

const ModalSearchCustomer = (props) => {
    const dispatch = useDispatch();
    const dataCusSearch = useSelector((state) => state.cus.dataCusSearch);
    const isSearchLoading = useSelector((state) => state.cus.isSearchLoading);
    const [currentPage, setCurrentPage] = useState(1);

    const [searchValue, setSearchValue] = useState("");
    const debouncedValue = useDebounce(searchValue, 1000);

    useEffect(() => {
        if (props.show === false) {
            setSearchValue("");
        }
    }, [props.show]);

    useEffect(() => {
        dispatch(searchCusRedux(debouncedValue, 1));
    }, [debouncedValue]);

    useEffect(() => {
        dispatch(searchCusRedux(debouncedValue, currentPage));
    }, [currentPage]);

    const handleChangeInput = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(" ")) {
            setSearchValue(searchValue);
        }
    };

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Tìm kiếm khách hàng
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">
                            Tìm khách hàng
                        </InputGroup.Text>
                        <Form.Control
                            onChange={(e) => handleChangeInput(e)}
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        />
                        <button className="btn btn-info">
                            Thêm khách hàng
                        </button>
                    </InputGroup>
                    <br />
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Username</th>
                                <th>Last Name</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isSearchLoading ? (
                                <tr>
                                    <td colSpan={4}>
                                        Vui lòng chờ trong giây lát
                                    </td>
                                </tr>
                            ) : (
                                dataCusSearch &&
                                dataCusSearch?.data.length > 0 &&
                                dataCusSearch?.data.map((item, index) => (
                                    <tr key={`search-${index}`}>
                                        <td>
                                            {(dataCusSearch?.current_page - 1) *
                                                dataCusSearch?.per_page +
                                                index +
                                                1}
                                        </td>
                                        <td>{item?.username}</td>
                                        <td>{item?.phoneNumber}</td>
                                        <td>
                                            <button className="btn btn-warning">
                                                Sửa
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                    {dataCusSearch && +dataCusSearch?.total_page > 0 && (
                        <div className="user-footer d-flex justify-content-center">
                            <ReactPaginate
                                forcePage={+dataCusSearch?.current_page - 1}
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={4}
                                marginPagesDisplayed={2}
                                pageCount={+dataCusSearch?.total_page}
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
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalSearchCustomer;
