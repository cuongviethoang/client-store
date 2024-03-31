import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useEffect, useState } from "react";
import {
    createCusRedux,
    readCusPaginationRedux,
} from "../../redux/actions/customerAction";

import "./ManageCustomer.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ModalCreateCustomer = ({ showModalCreate, handleCloseModalCreate }) => {
    const dispatch = useDispatch();

    const isCreateCusSuccess = useSelector(
        (state) => state.cus.isCreateCusSuccess
    );
    const isLoadingCreateCus = useSelector(
        (state) => state.cus.isLoadingCreateCus
    );
    const pageCus = useSelector((state) => state.cus.pageCus);
    const limitCus = useSelector((state) => state.cus.limitCus);

    const defaultValue = {
        isValidUsername: true,
        isValidPhoneNumber: true,
    };

    const [checkValid, setCheckValid] = useState(defaultValue);
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [confirmCreate, setConfirmCreate] = useState(false);

    // regex phone
    const isValidPhone = (phone) =>
        /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(
            phone
        );

    const checkValueCreate = (username, phoneNumber) => {
        setCheckValid(defaultValue);
        if (!phoneNumber.trim()) {
            setCheckValid({
                ...checkValid,
                isValidPhoneNumber: false,
            });
            return false;
        }
        if (phoneNumber.trim().length !== 10) {
            setCheckValid({
                ...checkValid,
                isValidPhoneNumber: false,
            });
            return false;
        }
        if (!isValidPhone(phoneNumber)) {
            toast.info("Đây không phải số điện thoại hợp lệ");
            return false;
        }
        return true;
    };

    const handleOpenConfirmCreate = () => {
        const isCheck = checkValueCreate(username, phoneNumber);

        if (isCheck === true) {
            setConfirmCreate(true);
        }
    };

    useEffect(() => {
        if (isCreateCusSuccess === true) {
            setConfirmCreate(false);
            handleCloseModalCreate();
            dispatch(readCusPaginationRedux(pageCus, limitCus));
            setUsername("");
            setPhoneNumber("");
        }
    }, [isCreateCusSuccess]);

    const handleConfirmCreate = async () => {
        dispatch(createCusRedux(username.trim(), phoneNumber.trim()));
    };

    const handleCloseConfirmCreate = () => setConfirmCreate(false);

    const handleCloseCreate = () => {
        handleCloseModalCreate();
        setUsername("");
        setPhoneNumber("");
    };

    return (
        <>
            <Modal
                show={showModalCreate}
                onHide={handleCloseCreate}
                className={confirmCreate ? "disable" : ""}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Tạo mới khách hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Tên</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Tên khách hàng"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Form.Control.Feedback>
                                Looks good!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group md="4">
                            <Form.Label>Số điện thoại</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    placeholder="Số điện thoại khách hàng"
                                    value={phoneNumber}
                                    onChange={(e) =>
                                        setPhoneNumber(e.target.value)
                                    }
                                    required
                                    className={
                                        checkValid.isValidPhoneNumber === false
                                            ? "is-invalid"
                                            : ""
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng điền đúng đinh dạng số điện thoại
                                    có đủ 10 chữ số.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCreate}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleOpenConfirmCreate}>
                        Thêm khách hàng
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={confirmCreate}
                onHide={handleCloseConfirmCreate}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận thêm khách hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn sẽ thêm khách hàng này vào hệ thống không
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleCloseConfirmCreate}
                    >
                        Đóng
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleConfirmCreate}
                        disabled={isLoadingCreateCus}
                    >
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalCreateCustomer;
