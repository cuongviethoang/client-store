import React, { useEffect, useRef, useState } from "react";
import "./css/invoices.css";
import PageIndex from "./PageIndex";
import InvoiceDetail from "./InvoiceDetail";
import { format } from "date-fns";
import {
    getOrderWithPagination,
    getOrderWithPaginationNum,
} from "../../services/orderService";
import InvoiceExportPdf from "./InvoiceExportPdf";
import { useReactToPrint } from "react-to-print";

function Invoices() {
    const [orders, setOrders] = useState([]);
    const [orderSelected, setOrderSelected] = useState();
    const [openOrderDialog, setOpenOrderDialog] = useState(false);
    const [key, setKey] = useState("");
    const [timeStart, setTimeStart] = useState("");
    const [timeEnd, setTimeEnd] = useState("");
    const [length, setLength] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);
    const componentPDF = useRef();

    async function readOrders() {
        var startTime = timeStart;
        var endTime = timeEnd;
        if (timeStart == "") {
            startTime = "2023-01-01T00:00";
        }
        if (timeEnd == "") {
            endTime = "2030-01-01T00:00";
        }
        try {
            const response = await getOrderWithPagination(
                pageIndex,
                10,
                key,
                startTime,
                endTime
            );
            if (response.status === 200) {
                const data = response.data;
                setOrders(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function getLength() {
        var startTime = timeStart;
        var endTime = timeEnd;
        if (timeStart == "") {
            startTime = "2023-01-01T00:00";
        }
        if (timeEnd == "") {
            endTime = "2030-01-01T00:00";
        }
        try {
            const response = await getOrderWithPaginationNum(
                key,
                startTime,
                endTime
            );
            if (response.status === 200) {
                const data = response.data;
                setLength(parseInt(data));
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        setPageIndex(1);
        if (pageIndex == 1) {
            readOrders();
        }
        getLength();
    }, [timeStart, timeEnd, key]);

    useEffect(() => {
        readOrders();
    }, [pageIndex]);

    const moneyForm = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
    });

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Hoá đơn",
    });

    return (
        <React.Fragment>
            <div className="grid">
                <div style={{ height: "50px" }} className="grid-row"></div>
                <div className="grid-row">
                    <div className="grid-column-2">
                        <div className="sidebar">
                            <div className="side-bar__header">Hoá đơn</div>
                            <div className="order-filter__time">
                                <div className="filter-time__header">
                                    Lọc theo thời gian
                                </div>
                                <div className="time-start">
                                    <label>Từ:</label>
                                    <input
                                        onChange={(e) =>
                                            setTimeStart(e.target.value)
                                        }
                                        type="datetime-local"
                                    />
                                </div>
                                <div className="time-end">
                                    <label>Đến:</label>
                                    <input
                                        onChange={(e) =>
                                            setTimeEnd(e.target.value)
                                        }
                                        type="datetime-local"
                                    />
                                </div>
                            </div>
                            <div className="order-filter__status"></div>
                        </div>
                    </div>
                    <div className="grid-column-8">
                        <div className="wrapper-invoice">
                            <div className="order-searching__wrapper">
                                <i
                                    style={{ color: "gray" }}
                                    className="fa-solid fa-magnifying-glass"
                                ></i>
                                <input
                                    onChange={(e) => setKey(e.target.value)}
                                    type="text"
                                    placeholder="Tìm kiếm theo mã hoá đơn, tên khách hàng, tên sản phẩm"
                                    name=""
                                    className="order-searching__input"
                                />
                            </div>
                            <div className="table-invoice">
                                <ul className="invoice-list">
                                    <li className="invoice-line table-invoice-header">
                                        <div className="invoice-id">
                                            Mã hoá đơn
                                        </div>
                                        <div className="invoice-time">
                                            Thời gian
                                        </div>
                                        <div className="invoice-cust">
                                            Khách hàng
                                        </div>
                                        <div className="invoice-total">
                                            Tổng tiền hàng
                                        </div>
                                        <div className="invoice-sale">
                                            Giảm giá
                                        </div>
                                        <div className="invoice-paid">
                                            Khách đã trả
                                        </div>
                                    </li>
                                    <li
                                        style={{ backgroundColor: "#faf3ea" }}
                                        className="invoice-line"
                                    >
                                        <div className="invoice-id"></div>
                                        <div className="invoice-time"></div>
                                        <div className="invoice-cust"></div>
                                        <div className="invoice-total">
                                            {moneyForm.format(
                                                orders.reduce(
                                                    (total, order) =>
                                                        total +
                                                        order.payment.total,
                                                    0
                                                )
                                            )}
                                        </div>
                                        <div className="invoice-sale">
                                            {moneyForm.format(
                                                orders.reduce(
                                                    (total, order) =>
                                                        total +
                                                        order.payment.discount,
                                                    0
                                                )
                                            )}
                                        </div>
                                        <div className="invoice-paid">
                                            {moneyForm.format(
                                                orders.reduce(
                                                    (total, order) =>
                                                        total +
                                                        order.payment.total,
                                                    0
                                                )
                                            )}
                                        </div>
                                    </li>
                                    {orders?.map((order, index) => {
                                        return (
                                            <React.Fragment key={order.id}>
                                                <li
                                                    style={
                                                        index % 2 == 0
                                                            ? {
                                                                  backgroundColor:
                                                                      "#f3f3f3",
                                                              }
                                                            : {}
                                                    }
                                                    className="invoice-line"
                                                    onClick={() => {
                                                        setOpenOrderDialog(
                                                            true
                                                        );
                                                        setOrderSelected(order);
                                                    }}
                                                >
                                                    <div className="invoice-id">
                                                        {order.code}
                                                    </div>
                                                    <div className="invoice-time">
                                                        {format(
                                                            new Date(
                                                                order.createTime
                                                            ),
                                                            "dd/MM/yyyy HH:mm"
                                                        )}
                                                    </div>
                                                    <div className="invoice-cust">
                                                        {order.customer
                                                            .username +
                                                            " " +
                                                            order.customer
                                                                .phoneNumber}
                                                    </div>
                                                    <div className="invoice-total">
                                                        {moneyForm.format(
                                                            order.payment.total
                                                        )}
                                                    </div>
                                                    <div className="invoice-sale">
                                                        {moneyForm.format(
                                                            order.payment
                                                                .discount
                                                        )}
                                                    </div>
                                                    <div className="invoice-paid">
                                                        {moneyForm.format(
                                                            order.payment
                                                                .customerPaid
                                                        )}
                                                    </div>
                                                </li>
                                            </React.Fragment>
                                        );
                                    })}
                                </ul>
                                <PageIndex
                                    pageIndex={pageIndex}
                                    setPageIndex={setPageIndex}
                                    length={length}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <InvoiceDetail
                openOrderDialog={openOrderDialog}
                setOpenOrderDialog={setOpenOrderDialog}
                orderSelected={orderSelected}
                moneyForm={moneyForm}
                generatePDF={generatePDF}
            />
            <div style={{ display: "none" }}>
                <div ref={componentPDF}>
                    <InvoiceExportPdf
                        orderSelected={orderSelected}
                        moneyForm={moneyForm}
                    />
                </div>
            </div>
        </React.Fragment>
    );
}
export default Invoices;
