import React, { useEffect, useState } from "react"
import "./css/invoices.css"
import PageIndex from "./PageIndex"
import InvoiceDetail from "./InvoiceDetail"

let orders_default=[]
function Invoices(){

    const [orders,setOrders]=useState([])
    const [orderSelected,setOrderSelected]=useState({id:"", time:"", cust:"", total:"",sale:"",paid:""})
    const [openOrderDialog,setOpenOrderDialog]=useState(false)
    const [pageIndex,setPageIndex]=useState(1)
    useEffect(()=>{
        orders_default=[
            {id:"HD0000001", time:"18/08/2024 18:19", cust:"Le Van Kien 0961016881", total:"22,200",sale:"1,234",paid:"21,500"},
            {id:"HD0000002", time:"18/08/2024 18:19", cust:"Le Van Kien 0961016881", total:"22,200",sale:"1,234",paid:"21,500"},
            {id:"HD0000003", time:"18/08/2024 18:19", cust:"Le Van Kien 0961016881", total:"22,200",sale:"1,234",paid:"21,500"},
            {id:"HD0000004", time:"18/08/2024 18:19", cust:"Le Van Kien 0961016881", total:"22,200",sale:"1,234",paid:"21,500"},
            {id:"HD0000005", time:"18/08/2024 18:19", cust:"Le Van Kien 0961016881", total:"22,200",sale:"1,234",paid:"21,500"},
            {id:"HD0000006", time:"18/01/2024 18:19", cust:"Le Van Kien 0961016881", total:"22,200",sale:"1,234",paid:"21,500"},
            {id:"HD0000007", time:"18/08/2024 18:19", cust:"Le Van Kien 0961016881", total:"22,200",sale:"1,234",paid:"21,500"},
            {id:"HD0000008", time:"18/08/2024 18:19", cust:"Le Van Kien 0961016881", total:"22,200",sale:"1,234",paid:"21,500"},
            {id:"HD0000009", time:"18/08/2024 18:19", cust:"Le Van Kien 0961016881", total:"22,200",sale:"1,234",paid:"21,500"},
            {id:"HD0000010", time:"18/01/2024 18:20", cust:"Le Van Kien 0961016881", total:"22,200",sale:"1,234",paid:"21,500"},  
            {id:"HD0000011", time:"18/08/2024 18:19", cust:"Le Van Kien 0961016881", total:"22,200",sale:"1,234",paid:"21,500"},
            {id:"HD0000012", time:"18/08/2024 18:19", cust:"Le Van Kien 0961016881", total:"22,200",sale:"1,234",paid:"21,500"},
            {id:"HD0000013", time:"18/08/2024 18:19", cust:"Le Van Kien 0961016881", total:"22,200",sale:"1,234",paid:"21,500"},
            {id:"HD0000014", time:"18/08/2024 18:19", cust:"Le Van Kien 0961016881", total:"22,200",sale:"1,234",paid:"21,500"},
            {id:"HD0000015", time:"18/08/2024 18:19", cust:"Le Van Kien 0961016881", total:"22,200",sale:"1,234",paid:"21,500"},
            {id:"HD0000016", time:"18/01/2024 18:19", cust:"Le Van Kien 0961016881", total:"22,200",sale:"1,234",paid:"21,500"},
            {id:"HD0000017", time:"18/08/2024 18:19", cust:"Le Van Kien 0961016881", total:"22,200",sale:"1,234",paid:"21,500"},
            {id:"HD0000018", time:"18/08/2024 18:19", cust:"Le Van Kien 0961016881", total:"22,200",sale:"1,234",paid:"21,500"},
            {id:"HD0000019", time:"18/08/2024 18:19", cust:"Le Van Kien 0961016881", total:"22,200",sale:"1,234",paid:"21,500"},
            {id:"HD0000020", time:"18/01/2024 18:20", cust:"Le Van Kien 0961016881", total:"22,200",sale:"1,234",paid:"21,500"},
            {id:"HD0000021", time:"18/08/2024 18:19", cust:"Le Van Kien 0961016881", total:"22,200",sale:"1,234",paid:"21,500"},
           
        ]
        setOrders(orders_default)

    },[])

    const handleSearchOrders=(e)=>{
        setOrders(orders_default.filter(order=>{
            return order.id.toLowerCase().includes(e.target.value.toLowerCase()) ||
            order.cust.toLowerCase().includes(e.target.value.toLowerCase())
        }))
        setPageIndex(1)
    }

    const [timeStart,setTimeStart]=useState("")
    const [timeEnd,setTimeEnd]=useState("")
    const handleFilterTime=()=>{
        setOrders(orders_default.filter(order=>{
            var parts = order.time.split(' ');
            var dateParts = parts[0].split('/');
            var timeParts = parts[1].split(':');

            var orderTime = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1]);
            var startTime = new Date(timeStart);
            var endTime = new Date(timeEnd);
           
            if(timeStart!="" && timeEnd==""){
                if(orderTime>=startTime){
                    return true
                }else{
                    return false
                }
            }else if(timeStart=="" && timeEnd!=""){
                if(orderTime<=endTime){
                    return true
                }else{
                    return false
                }
            }else if(timeStart!="" && timeEnd!=""){
                if(orderTime>=startTime && orderTime<=endTime){
                    return true
                }else{
                    return false
                }
            }else{
                return true
            }
        }))
        setPageIndex(1)
    }

    return(
        <React.Fragment>
        <div className="grid">
            <div style={{height:'50px'}} className="grid-row"></div>
            <div className="grid-row">
                <div className="grid-column-2">
                    <div className="sidebar">
                        <div className="side-bar__header">Hoá đơn</div>
                        <div className="order-filter__time">
                            <div className="filter-time__header">Thời gian</div>
                            <div className="time-start">
                                <label>Từ:</label>
                                <input onChange={(e)=>setTimeStart(e.target.value)} type="datetime-local" />
                            </div>
                            <div className="time-end">
                                <label>Đến:</label>
                                <input onChange={(e)=>setTimeEnd(e.target.value)} type="datetime-local" />
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
                            <i style={{color:'gray'}} className="fa-solid fa-magnifying-glass"></i>
                            <input onChange={(e)=>handleSearchOrders(e)} type="text" placeholder="Theo mã hoá đơn, tên khách hàng" name="" className="order-searching__input" />
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
                                <li style={{backgroundColor:'#faf3ea'}} className="invoice-line">
                                    <div className="invoice-id"></div>
                                    <div className="invoice-time"></div>
                                    <div className="invoice-cust"></div>
                                    <div className="invoice-total">215,000,000</div>
                                    <div className="invoice-sale">0</div>
                                    <div className="invoice-paid">215,000,000</div>
                                </li>
                                {
                                    orders.map((order,index)=>{
                                        return(
                                            (index+1) <= pageIndex*10 && (index+1) > (pageIndex-1)*10 ?
                                            <React.Fragment  key={order.id}>
                                            <li style={ index%2==0 ? {backgroundColor:'#f3f3f3'}:{}} 
                                            className="invoice-line"
                                            onClick={()=>{
                                                setOpenOrderDialog(true)
                                                setOrderSelected(order)
                                            }}>
                                                <div className="invoice-id">{order.id}</div>
                                                <div className="invoice-time">{order.time}</div>
                                                <div className="invoice-cust">{order.cust}</div>
                                                <div className="invoice-total">{order.total}</div>
                                                <div className="invoice-sale">{order.sale}</div>
                                                <div className="invoice-paid">{order.paid}</div>
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
        />
        </React.Fragment>
    )
}
export default Invoices