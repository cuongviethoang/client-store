import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useEffect, useState } from "react";
import {
    updateCusRedux,
    readCusPaginationRedux,
} from "../../redux/actions/customerAction";

import "./ManageCustomer.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ModalEditCustomer = (props) => {
    const { showModalEdit, handleCloseModalEdit, customer } = props;

    const dispatch = useDispatch();

    const isLoadingUpdateCus = useSelector(
        (state) => state.cus.isLoadingUpdateCus
    );

    const isUpdateCusSuccess = useSelector(
        (state) => state.cus.isUpdateCusSuccess
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
    const [confirmEdit, setConfirmEdit] = useState(false);

    useEffect(() => {
        setUsername(customer?.username);
        setPhoneNumber(customer?.phoneNumber);
    }, [customer]);

    // regex phone
    const isValidPhone = (phone) =>
        /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(
            phone
        );

    const checkValueEdit = (username, phoneNumber) => {
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
        if (
            phoneNumber.trim() === customer?.phoneNumber &&
            username.trim() === customer?.username
        ) {
            toast.info("Không có bất kỳ sự thay đổi nào!");
            return false;
        }
        if (!isValidPhone(phoneNumber)) {
            toast.info("Đây không phải số điện thoại hợp lệ");
            return false;
        }
        return true;
    };

    const handleOpenConfirmEdit = () => {
        const isCheck = checkValueEdit(username, phoneNumber);

        if (isCheck === true) {
            setConfirmEdit(true);
        }
    };

    useEffect(() => {
        if (isUpdateCusSuccess === true) {
            setConfirmEdit(false);
            handleCloseModalEdit();
            dispatch(readCusPaginationRedux(pageCus, limitCus));
            setUsername("");
            setPhoneNumber("");
        }
    }, [isUpdateCusSuccess]);

    const handleConfirmEdit = async () => {
        const cus = {
            id: customer?.id,
            username: username.trim(),
            phoneNumber: phoneNumber.trim(),
        };
        dispatch(updateCusRedux(cus));
    };

    const handleCloseConfirmEdit = () => setConfirmEdit(false);

    return (
        <>
            <Modal
                show={showModalEdit}
                onHide={handleCloseModalEdit}
                className={confirmEdit ? "disable" : ""}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Sửa thông tin khách hàng</Modal.Title>
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
                    <Button variant="secondary" onClick={handleCloseModalEdit}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleOpenConfirmEdit}>
                        Sửa thông tin
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={confirmEdit} onHide={handleCloseConfirmEdit} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Xác nhận cập nhật thông tin khách hàng
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn sẽ cập nhật thông tin khách hàng này vào hệ
                    thống không
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleCloseConfirmEdit}
                    >
                        Đóng
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleConfirmEdit}
                        disabled={isLoadingUpdateCus}
                    >
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalEditCustomer;
