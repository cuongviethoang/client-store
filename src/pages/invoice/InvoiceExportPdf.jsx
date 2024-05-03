import logo from "../../../public/ecommerce.png" 
import "./css/export.css"
import { format } from "date-fns"
import React from "react"
const InvoiceExportPdf=({orderSelected,moneyForm})=>{
    return(
        <div className="invoiceexport-wrapper">
            <div className="invoiceexport-wrapper-header">
                <img className="logo" src={logo} alt="" />
                <div className="store-info">
                    CoOp Mart
                </div>
            </div>
            <div style={{fontSize:'25px', textAlign:'center', marginTop:'15px'}}>
                Hoá đơn bán hàng
            </div>
            <div className="invoice-info">
                <div className="invoice-info-time">
                {orderSelected && "Ngày tạo:" + format(new Date(orderSelected?.createTime), 'dd/MM/yyyy HH:mm')}
                </div>
                <div className="invoice-info-staff">
                    <div>{"HD:"+orderSelected?.code}</div>
                    <div>{"NVBH:"+orderSelected?.user.username}</div>
                </div>
            </div>
            <div className="dash-line"></div>
            <div className="invoice-listitem">
                <div style={{fontWeight:'bold'}} className="listitem-wrap">
                    <div className="listitem-item">Mặt hàng</div>
                    <div className="listitem-item">Đơn giá</div>
                    <div className="listitem-item">SL</div>
                    <div style={{textAlign:'right'}} className="listitem-item">T.Tiền</div>
                </div>
                {
                    orderSelected?.itemOrders.map((item, index) => {
                        return (
                            <React.Fragment key={item.id}>
                                <div className="listitem-wrap">
                                    <div className="listitem-item">{item.product.productName}</div>
                                    <div className="listitem-item">{moneyForm.format(item.product.price)}</div>
                                    <div className="listitem-item">{item.quantity}</div>
                                    <div style={{textAlign:'right'}} className="listitem-item">{moneyForm.format(item.price * item.quantity)}</div>
                                </div>
                            </React.Fragment>
                        )
                    })
                }
            </div>
            <div className="dash-line"></div>
            <div className="item_orders-total">
                <div className="item_orders-total-item">
                    <div className="label">Tổng tiền hàng:</div>
                    <div>{
                        moneyForm.format(
                            orderSelected?.itemOrders.reduce((totalPrice, item) => {
                                return totalPrice + item.price * item.quantity
                            }, 0))
                    }</div>
                </div>
                <div className="item_orders-total-item">
                    <div className="label">Giảm giá:</div>
                    <div>{moneyForm.format(orderSelected?.payment.discount)}</div>
                </div>
                <div className="item_orders-total-item">
                    <div className="label">Khách cần trả:</div>
                    <div>{moneyForm.format(orderSelected?.payment.total)}</div>
                </div>
                <div className="item_orders-total-item">
                    <div className="label">Khách đã trả:</div>
                    <div>{moneyForm.format(orderSelected?.payment.customerPaid)}</div>
                </div>
                <div className="item_orders-total-item">
                    <div className="label">Trả lại khách:</div>
                    <div>{moneyForm.format(orderSelected?.payment.refunds)}</div>
                </div>
            </div>
            <div className="customer-info">
                <div>
                    {'Khách hàng:' + orderSelected?.customer.username+ " " + orderSelected?.customer.phoneNumber}
                </div>
            </div>
        </div>
    )
}
export default InvoiceExportPdf