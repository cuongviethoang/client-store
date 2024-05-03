import { useState, useEffect } from "react";
import ModalSearchCustomer from "../managecustomer/ModalSearchCustomer";

import "./CreateOrder.scss";
import { useSelector } from "react-redux";

function CreateOrder() {
    const dataUser = useSelector((state) => state.auth.data.dataLogin);
    const customer = useSelector((state) => state.cus.cus);

    const [selectedCustomerId, setSelectedCustomerId] = useState("");
    const [selectedUserId, setSelectedUserId] = useState("");
    const [items, setItems] = useState([]);
    const [cashAmount, setCashAmount] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [products, setProducts] = useState([]);
    const [productQuantities, setProductQuantities] = useState({});
    const [searchKeyword, setSearchKeyword] = useState("");

    // search khach hang
    const [modalSearchShow, setModalSearchShow] = useState(false);

    const fetchProducts = () => {
        fetch("http://localhost:8080/api/product/read-all?page=1&limit=10", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) =>
                console.error("Error fetching products: ", error)
            );
    };

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
        const existingItemIndex = items.findIndex(
            (item) => item.code === product.id
        );

        if (existingItemIndex !== -1) {
            const updatedItems = [...items];
            updatedItems[existingItemIndex].quantity += quantity;
            setItems(updatedItems);
        } else {
            const newItem = {
                code: product.id,
                name: product.productName,
                price: product.price,
                quantity: quantity,
            };
            setItems([...items, newItem]);
        }
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
                alert("Đơn hàng đã được tạo thành công!");
                window.location.href = "/";
            })
            .catch((error) => {
                console.error("Error sending payment:", error);
                alert("Tạo đơn hàng lỗi!");
            });
    };

    const handleConfirmOrder = () => {
        if (!customer) {
            // Nếu chưa chọn khách hàng, đưa ra thông báo
            alert("Vui lòng chọn khách hàng trước khi tạo hóa đơn!");
            return;
        }

        if (items.length === 0) {
            alert(
                "Vui lòng thêm sản phẩm vào danh sách trước khi tạo hóa đơn!"
            );
            return;
        }

        if (cashAmount < calculateTotal()) {
            alert(
                "Số tiền khách đưa phải lớn hơn hoặc bằng tổng số tiền thanh toán!"
            );
            return;
        }
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
                id: customer?.id,
            },
            itemOrders: itemOrdersData,
            payment: {
                total: calculateTotal(),
                customerPaid: cashAmount,
                refunds: cashAmount - calculateTotal(),
            },
            user: {
                id: dataUser?.id,
            },
        };

        console.log(initialOrder);
        sendItemOder(initialOrder);
    };

    const handleRemoveItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    const formatCurrency = (amount) => {
        return amount.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };

  return (
    <div className="create-order-container">
      {/* Phần bên trái */}
      <div className="left-section">
        <div>
          <h1>Tạo đơn hàng</h1>
          <h3>Nhân viên trực: </h3>
          <h5>Tên nhân viên: {dataUser?.username}</h5>
        </div>
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
                      <img width={60} src={`data:image/jpeg;base64,${product.productImage}`} alt="Base64 Image" />
                    </td>
                    <td>{formatCurrency(product.price)}</td>
                    <td>
                      <input
                        type="number"
                        value={productQuantities[product.id] || 1}
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
                            productQuantities[product.id] || 1
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
            <button onClick={() => setShowPopup(false)}>Đóng</button>
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.code}</td>
                                <td>{item.name}</td>
                                <td>{formatCurrency(item.price)}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    {formatCurrency(item.quantity * item.price)}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleRemoveItem(index)}
                                    >
                                        Xóa
                                    </button>{" "}
                                    {/* Nút Xóa */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="total">
                    <h3>Tổng tiền: {formatCurrency(calculateTotal())}</h3>
                </div>
                <div>
                    <h3>Tiền khách đưa</h3>
                    <input
                        type="number"
                        placeholder="Nhập số tiền khách đưa"
                        value={formatCurrency(cashAmount)}
                        onChange={(e) => setCashAmount(e.target.value)}
                    />
                </div>
                <div>
                    <h3>Tiền trả lại</h3>
                    <p>{formatCurrency(cashAmount - calculateTotal())}</p>
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
                btnCreateCustomer={true}
            />
        </div>
    );
}

export default CreateOrder;
