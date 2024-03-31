import { useState, useEffect } from "react";
import ModalSearchCustomer from "../managecustomer/ModalSearchCustomer";

import "./CreateOrder.scss";
import { useSelector } from "react-redux";

function CreateOrder() {
    const dataUser = useSelector((state) => state.auth.data.dataLogin);
    const customer = useSelector((state) => state.cus.cus);

    // const [employees, setEmployees] = useState([]);
    // const [customers, setCustomers] = useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState("");
    const [selectedUserId, setSelectedUserId] = useState("");
    // const [customerName, setCustomerName] = useState("");
    const [items, setItems] = useState([]);
    const [cashAmount, setCashAmount] = useState(0);
    // const [currentTime, setCurrentTime] = useState(new Date());
    const [showPopup, setShowPopup] = useState(false);
    const [products, setProducts] = useState([]);
    const [productQuantities, setProductQuantities] = useState({});
    const [searchKeyword, setSearchKeyword] = useState("");

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCurrentTime(new Date());
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, []);

    // search khach hang
    const [modalSearchShow, setModalSearchShow] = useState(false);

    const fetchProducts = () => {
        // fetch("http://localhost:8080/api/product/read-all?page=1&limit=10", {
        //     method: "GET",
        //     credentials: "include",
        // })
        //     .then((response) => response.json())
        //     .then((data) => setProducts(data))
        //     .catch((error) =>
        //         console.error("Error fetching products: ", error)
        //     );
    };

    const fetchEmployees = () => {
        // fetch(`http://localhost:8080/api/user/read?page=${1}&limit=${10}`, {
        //     method: "GET",
        //     credentials: "include", // This is equivalent to withCredentials: true
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setEmployees(data);
        //     })
        //     .catch((error) =>
        //         console.error("Error fetching employees: ", error)
        //     );
    };

    const fetchCustomer = () => {
        // fetch(
        //     `http://localhost:8080/api/customer/read?page=${1}&limit=${100}`,
        //     {
        //         method: "GET",
        //         credentials: "include", // This is equivalent to withCredentials: true
        //     }
        // )
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setCustomers(data);
        //     })
        //     .catch((error) =>
        //         console.error("Error fetching employees: ", error)
        //     );
    };

    useEffect(() => {
        fetchProducts();
        fetchEmployees();
        fetchCustomer();
    }, []);

    const handleAddProduct = () => {
        setShowPopup(true);
        fetchProducts();
    };

    const calculateTotal = () => {
        return items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    };

    const handleQuantityChange = (productId, newQuantity) => {
        setProductQuantities({
            ...productQuantities,
            [productId]: newQuantity,
        });
    };

    const handleAddToOrder = (product, quantity) => {
        const newItem = {
            code: product.id,
            name: product.productName,
            price: product.price,
            quantity: quantity,
        };
        setItems([...items, newItem]);
    };

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const filteredProducts = products.filter((product) =>
        product.productName.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const sendItemOder = (initialOrder) => {
        fetch("http://localhost:8080/api/order/create", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(initialOrder),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Payment success:", data);
            })
            .catch((error) => {
                console.error("Error sending payment:", error);
            });
    };

    const handleConfirmOrder = () => {
        const itemOrdersData = items.map((item) => ({
            product: {
                id: item.code,
            },
            quantity: item.quantity,
            price: item.price,
        }));

        const initialOrder = {
            code: "",
            customer: {
                id: selectedCustomerId,
            },
            itemOrders: itemOrdersData,
            payment: {
                total: calculateTotal(),
                customerPaid: cashAmount,
                refunds: cashAmount - calculateTotal(),
            },
            user: {
                id: selectedUserId,
            },
        };

        console.log(initialOrder);
        sendItemOder(initialOrder);
    };

    const handleCustomerSelect = (e) => {
        const selectedId = e.target.value;
        setSelectedCustomerId(selectedId);
    };

    const handleUserSelect = (e) => {
        const selectedId = e.target.value;
        setSelectedUserId(selectedId);
    };

    return (
        <div className="create-order-container">
            {/* Phần bên trái */}
            <div className="left-section">
                <div>
                    <h3>Nhân viên trực: </h3>
                    <h6>Tên nhân viên: {dataUser?.username}</h6>
                    {/* <select value={selectedUserId} onChange={handleUserSelect}>
                        <option value="">Chọn nhân viên</option>
                        {employees.map((employee) => (
                            <option key={employee.id} value={employee.id}>
                                {employee.username}
                            </option>
                        ))}
                    </select> */}
                </div>
                {/* <div>
                    <h3>Thời gian:</h3>
                    <h3>{currentTime.toLocaleString()}</h3>
                </div> */}
                <div>
                    <button
                        className="btn btn-info"
                        onClick={() => setModalSearchShow(true)}
                    >
                        Tìm kiếm khách hàng
                    </button>
                </div>
                <div>
                    <button
                        className="btn btn-primary"
                        onClick={handleAddProduct}
                        style={{ marginTop: "10px" }}
                    >
                        Thêm sản phẩm
                    </button>
                </div>
                {showPopup && (
                    <div className="popup">
                        <h2>Chọn sản phẩm</h2>
                        {/* Thêm input cho từ khoá tìm kiếm */}
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchKeyword}
                            onChange={handleSearchChange}
                        />
                        <table>
                            <thead>
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <th>Ảnh sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Lọc danh sách sản phẩm dựa trên từ khoá tìm kiếm */}
                                {filteredProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.productName}</td>
                                        <td>
                                            <img
                                                src={product.productImage}
                                                alt="Product"
                                            />
                                        </td>
                                        <td>{product.price}</td>
                                        <td>
                                            <input
                                                type="number"
                                                value={
                                                    productQuantities[
                                                        product.id
                                                    ] || 1
                                                }
                                                onChange={(e) =>
                                                    handleQuantityChange(
                                                        product.id,
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                            />
                                        </td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    handleAddToOrder(
                                                        product,
                                                        productQuantities[
                                                            product.id
                                                        ] || 1
                                                    )
                                                }
                                            >
                                                Thêm
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={() => setShowPopup(false)}>
                            Đóng
                        </button>
                    </div>
                )}
            </div>

            {/* Phần bên phải */}
            <div className="right-section">
                {customer && (
                    <>
                        <h3>Thông tin khách hàng</h3>
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Tên khách hàng</th>
                                    <th scope="col">Số điện thoại</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{customer?.username}</td>
                                    <td>{customer?.phoneNumber}</td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                )}
                <h3>Danh sách sản phẩm</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Mã sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá tiền</th>
                            <th>Số lượng</th>
                            <th>Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.code}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.quantity * item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="total">
                    <h3>Tổng tiền: {calculateTotal()}</h3>
                </div>
                <div>
                    <h3>Tiền khách đưa</h3>
                    <input
                        type="number"
                        placeholder="Nhập số tiền khách đưa"
                        value={cashAmount}
                        onChange={(e) => setCashAmount(e.target.value)}
                    />
                </div>
                <div>
                    <h3>Tiền trả lại</h3>
                    <p>{cashAmount - calculateTotal()}</p>
                </div>
                <div className="confirm-button">
                    <button onClick={handleConfirmOrder}>Xác nhận</button>
                </div>
            </div>
            <ModalSearchCustomer
                show={modalSearchShow}
                onHide={() => setModalSearchShow(false)}
                btnManageOrder={false}
                btnSelect={true}
            />
        </div>
    );
}

export default CreateOrder;
