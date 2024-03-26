import "./css/invoice.css"
import { useState } from "react";
import React from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { format } from "date-fns"


const InvoiceDetail = ({ openOrderDialog, setOpenOrderDialog, orderSelected, moneyForm }) => {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div className="modal" style={openOrderDialog ? { display: 'flex' } : { display: 'none' }}>
            <div className="modal-body">
                <div className="order-detail">
                    <div onClick={() => setOpenOrderDialog(false)} className="btnClose">
                        <i className="fa-regular fa-circle-xmark"></i>
                    </div>
                    <div>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="Thông tin" value="1" />
                                        <Tab label="Danh sách sản phẩm" value="2" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <div className="order-information">
                                        <div style={{ flex: 1, marginRight: '50px' }}>
                                            <div className="order-information-code-wrapper order-information_item">
                                                <div className="order-information_item-label">Mã hoá đơn</div>
                                                <div className="order-information_item-content">{orderSelected?.code}</div>
                                            </div>
                                            <div className="order-information-time-wrapper order-information_item">
                                                <div className="order-information_item-label">Thời gian</div>
                                                <div className="order-information_item-content">{orderSelected && format(new Date(orderSelected.createTime), 'dd/MM/yyyy HH:mm')}</div>
                                            </div>
                                            <div className="order-information-cust-wrapper order-information_item">
                                                <div className="order-information_item-label">Khách hàng</div>
                                                <div className="order-information_item-content">{orderSelected?.customer.username + " " + orderSelected?.customer.phoneNumber}</div>
                                            </div>
                                            <div className="order-information-pricelist-wrapper order-information_item">
                                                <div className="order-information_item-label">Bảng giá</div>
                                                <div className="order-information_item-content">Bảng giá chung</div>
                                            </div>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div className="order-information-status-wrapper order-information_item">
                                                <div className="order-information_item-label">Trạng thái</div>
                                                <div className="order-information_item-content">Đã hoàn thành</div>
                                            </div>
                                            <div className="order-information-branch-wrapper order-information_item">
                                                <div className="order-information_item-label">Chi nhánh</div>
                                                <div className="order-information_item-content">Chi nhánh trung tâm</div>
                                            </div>
                                            <div className="order-information-seller-wrapper order-information_item">
                                                <div className="order-information_item-label">Người tạo đơn</div>
                                                <div className="order-information_item-content">{orderSelected?.user.username}</div>
                                            </div>
                                            <div className="order-information-paymenmethod-wrapper order-information_item">
                                                <div className="order-information_item-label">Hình thức thanh toán</div>
                                                <div className="order-information_item-content">Tiền mặt</div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel value="2">
                                    <div className="table-item_orders">
                                        <ul className="item_order-list">
                                            <li className="item_order-line table-item_order-header">
                                                <div className="item_order-product_code">Mã hàng</div>
                                                <div className="item_order-product_image">Hình ảnh</div>
                                                <div className="item_order-product_name">Tên hàng</div>
                                                <div className="item_order-quantity">Số Lượng</div>
                                                <div className="item_order-product_price">Đơn giá</div>
                                                <div className="item_order-discount">Giảm giá</div>
                                                <div className="item_order-price">Giá bán</div>
                                                <div className="item_order-total">Thành tiền</div>
                                            </li>
                                            {
                                                orderSelected?.itemOrders.map((item, index) => {
                                                    return (
                                                        <React.Fragment key={item.id}>
                                                            <li style={index % 2 != 0 ? { backgroundColor: '#f3f3f3' } : {}}
                                                                className="item_order-line">
                                                                <div className="item_order-product_code">{item.product.id}</div>
                                                                <div className="item_order-product_image">
                                                                    {item.product.productImage && (
                                                                        <img width={100} src={`data:image/jpeg;base64,${item.product.productImage}`} alt="Base64 Image" />
                                                                    )}
                                                                </div>
                                                                <div className="item_order-product_name">{item.product.productName}</div>
                                                                <div className="item_order-quantity">{item.quantity}</div>
                                                                <div className="item_order-product_price">{moneyForm.format(item.product.price)}</div>
                                                                <div className="item_order-discount">{moneyForm.format(0)}</div>
                                                                <div className="item_order-price">{moneyForm.format(item.price)}</div>
                                                                <div className="item_order-total">{moneyForm.format(item.price * item.quantity)}</div>
                                                            </li>
                                                        </React.Fragment>
                                                    )
                                                })
                                            }
                                        </ul>
                                        <div className="item_orders-total-wrapper">
                                            <div className="item_orders-total_quantity">
                                                <div className="label">Tổng số lượng:</div>
                                                <div>{
                                                    orderSelected?.itemOrders.reduce((totalQuantity, item) => {
                                                        return totalQuantity + item.quantity
                                                    }, 0)
                                                }</div>
                                            </div>
                                            <div className="item_orders-total_price">
                                                <div className="label">Tổng tiền hàng:</div>
                                                <div>{
                                                    moneyForm.format(
                                                        orderSelected?.itemOrders.reduce((totalPrice, item) => {
                                                            return totalPrice + item.price * item.quantity
                                                        }, 0))
                                                }</div>
                                            </div>
                                            <div className="item_orders-discount">
                                                <div className="label">Giảm giá:</div>
                                                <div>{moneyForm.format(orderSelected?.payment.discount)}</div>
                                            </div>
                                            <div className="item_orders-needed_pay">
                                                <div className="label">Khách cần trả:</div>
                                                <div>{moneyForm.format(orderSelected?.payment.total)}</div>
                                            </div>
                                            <div className="item_orders-cust_paid">
                                                <div className="label">Khách đã trả:</div>
                                                <div>{moneyForm.format(orderSelected?.payment.customerPaid)}</div>
                                            </div>
                                            <div className="item_orders-refunds">
                                                <div className="label">Trả lại khách:</div>
                                                <div>{moneyForm.format(orderSelected?.payment.refunds)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default InvoiceDetail
