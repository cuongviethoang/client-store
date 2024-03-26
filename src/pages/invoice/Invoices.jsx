import React, { useEffect, useState } from "react"
import "./css/invoices.css"
import PageIndex from "./PageIndex"
import InvoiceDetail from "./InvoiceDetail"
import { toast } from "react-toastify"
import { format } from "date-fns"
import {
    getAllNumberPro,
    getProductWithPagination
} from "../../services/productService"

import {
    getAllOrder,
    getOrderById
} from "../../services/orderService"

let orders_default = []
function Invoices() {

    const [orders, setOrders] = useState([])
    const [orderSelected, setOrderSelected] = useState()
    const [openOrderDialog, setOpenOrderDialog] = useState(false)
    const [pageIndex, setPageIndex] = useState(1)

    async function readAllOrder() {
        try {
            const response = await getAllOrder()
            if (response.status === 200) {
                const data = response.data
                console.log(data)
                setOrders(data)
                orders_default = [...data]
            }
        } catch (error) {
        }
    }
    useEffect(() => {
        // orders_default = [
        //     {
        //         id: 1,
        //         code: "HD0000001",
        //         createTime: "18/08/2024 18:19",
        //         customer: {
        //             id: 1,
        //             username: "kien",
        //             phoneNumber: "0961016881"
        //         },
        //         itemOrders: [
        //             {
        //                 id: 1,
        //                 product: {
        //                     id: 1,
        //                     productName: "Coca cola",
        //                     productImage: "",
        //                     qrCode: "",
        //                     price: 20000,
        //                     total: 100
        //                 },
        //                 quantity: 2,
        //                 price: 20000
        //             }
        //         ],
        //         payment: {
        //             id: 1,
        //             discount: 0,
        //             total: 99000,
        //             customerPaid: 100000,
        //             refunds: 1000
        //         },
        //         user: {
        //             id: 1,
        //             email: "svvew",
        //             phoneNumber: "0123456789",
        //             username: "kienlv"
        //         }
        //     },
        //     {
        //         id: 2,
        //         code: "HD0000002",
        //         createTime: "18/08/2024 18:19",
        //         customer: {
        //             id: 1,
        //             username: "hieu",
        //             phoneNumber: "0961016881"
        //         },
        //         itemOrders: [
        //             {
        //                 id: 1,
        //                 product: {
        //                     id: 1,
        //                     productName: "pepsi",
        //                     productImage: "",
        //                     qrCode: "",
        //                     price: 17000,
        //                     total: 100
        //                 },
        //                 quantity: 2,
        //                 price: 17000
        //             }
        //         ],
        //         payment: {
        //             id: 1,
        //             discount: 0,
        //             total: 98000,
        //             customerPaid: 100000,
        //             refunds: 2000
        //         },
        //         user: {
        //             id: 1,
        //             email: "svvew",
        //             phoneNumber: "0123456789",
        //             username: "kienlv"
        //         }
        //     }

        // ]
        // setOrders(orders_default)
        readAllOrder()
    }, [])

    const moneyForm = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
    });

    const handleSearchOrders = (e) => {
        setOrders(orders_default.filter(order => {
            return order.code.toLowerCase().includes(e.target.value.toLowerCase()) ||
                order.customer.username.toLowerCase().includes(e.target.value.toLowerCase())
        }))
        setPageIndex(1)
    }

    const [timeStart, setTimeStart] = useState("")
    const [timeEnd, setTimeEnd] = useState("")
    const handleFilterTime = () => {
        setOrders(orders_default.filter(order => {
            var orderTime = new Date(order.createTime);
            var startTime = new Date(timeStart);
            var endTime = new Date(timeEnd);

            if (timeStart != "" && timeEnd == "") {
                if (orderTime >= startTime) {
                    return true
                } else {
                    return false
                }
            } else if (timeStart == "" && timeEnd != "") {
                if (orderTime <= endTime) {
                    return true
                } else {
                    return false
                }
            } else if (timeStart != "" && timeEnd != "") {
                if (orderTime >= startTime && orderTime <= endTime) {
                    return true
                } else {
                    return false
                }
            } else {
                return true
            }
        }))
        setPageIndex(1)
    }

    return (
        <React.Fragment>
            <div className="grid">
                <div style={{ height: '50px' }} className="grid-row"></div>
                <div className="grid-row">
                    <div className="grid-column-2">
                        <div className="sidebar">
                            <div className="side-bar__header">Hoá đơn</div>
                            <div className="order-filter__time">
                                <div className="filter-time__header">Lọc theo thời gian</div>
                                <div className="time-start">
                                    <label>Từ:</label>
                                    <input onChange={(e) => setTimeStart(e.target.value)} type="datetime-local" />
                                </div>
                                <div className="time-end">
                                    <label>Đến:</label>
                                    <input onChange={(e) => setTimeEnd(e.target.value)} type="datetime-local" />
                                </div>
                                <div onClick={handleFilterTime} className="btnFitlerTime btn btn-primary">Tìm kiếm</div>
                            </div>
                            <div className="order-filter__status">

                            </div>
                        </div>
                    </div>
                    <div className="grid-column-8">
                        <div className="wrapper-invoice">
                            <div className="order-searching__wrapper">
                                <i style={{ color: 'gray' }} className="fa-solid fa-magnifying-glass"></i>
                                <input onChange={(e) => handleSearchOrders(e)} type="text" placeholder="Tìm kiếm theo mã hoá đơn, tên khách hàng" name="" className="order-searching__input" />
                            </div>
                            <div className="table-invoice">
                                <ul className="invoice-list">
                                    <li className="invoice-line table-invoice-header">
                                        <div className="invoice-id">Mã hoá đơn</div>
                                        <div className="invoice-time">Thời gian</div>
                                        <div className="invoice-cust">Khách hàng</div>
                                        <div className="invoice-total">Tổng tiền hàng</div>
                                        <div className="invoice-sale">Giảm giá</div>
                                        <div className="invoice-paid">Khách đã trả</div>
                                    </li>
                                    <li style={{ backgroundColor: '#faf3ea' }} className="invoice-line">
                                        <div className="invoice-id"></div>
                                        <div className="invoice-time"></div>
                                        <div className="invoice-cust"></div>
                                        <div className="invoice-total">{
                                            moneyForm.format(
                                                orders.reduce((total, order) =>
                                                    total + order.payment.total
                                                    , 0))
                                        }</div>
                                        <div className="invoice-sale">{
                                            moneyForm.format(
                                                orders.reduce((total, order) =>
                                                    total + order.payment.discount
                                                    , 0))
                                        }</div>
                                        <div className="invoice-paid">{
                                            moneyForm.format(
                                                orders.reduce((total, order) =>
                                                    total + order.payment.total
                                                    , 0))
                                        }</div>
                                    </li>
                                    {
                                        orders?.map((order, index) => {
                                            return (
                                                (index + 1) <= pageIndex * 10 && (index + 1) > (pageIndex - 1) * 10 ?
                                                    <React.Fragment key={order.id}>
                                                        <li style={index % 2 == 0 ? { backgroundColor: '#f3f3f3' } : {}}
                                                            className="invoice-line"
                                                            onClick={() => {
                                                                setOpenOrderDialog(true)
                                                                setOrderSelected(order)
                                                            }}>
                                                            <div className="invoice-id">{order.code}</div>
                                                            <div className="invoice-time">{format(new Date(order.createTime), 'dd/MM/yyyy HH:mm')}</div>
                                                            <div className="invoice-cust">{order.customer.username + " " + order.customer.phoneNumber}</div>
                                                            <div className="invoice-total">{moneyForm.format(order.payment.total)}</div>
                                                            <div className="invoice-sale">{moneyForm.format(order.payment.discount)}</div>
                                                            <div className="invoice-paid">{moneyForm.format(order.payment.total)}</div>
                                                        </li>
                                                    </React.Fragment> : ""
                                            )
                                        })
                                    }
                                </ul>
                                <PageIndex
                                    pageIndex={pageIndex}
                                    setPageIndex={setPageIndex}
                                    orders={orders}
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
            />
        </React.Fragment>
    )
}
export default Invoices