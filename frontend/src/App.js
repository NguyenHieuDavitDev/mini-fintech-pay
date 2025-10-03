import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import CartPopup from "./components/CartPopup";

const products = [
  { 
    id: 1, 
    name: "iPhone 15 Pro", 
    price: 250000,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop&crop=center",
    description: "Điện thoại thông minh cao cấp với camera chuyên nghiệp"
  },
  { 
    id: 2, 
    name: "MacBook Air M2", 
    price: 320000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop&crop=center",
    description: "Laptop siêu mỏng với hiệu năng mạnh mẽ"
  },
  { 
    id: 3, 
    name: "AirPods Pro", 
    price: 55000,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop&crop=center",
    description: "Tai nghe không dây với chống ồn chủ động"
  },
  { 
    id: 4, 
    name: "Apple Watch Series 9", 
    price: 120000,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop&crop=center",
    description: "Đồng hồ thông minh với nhiều tính năng sức khỏe"
  },
  { 
    id: 5, 
    name: "iPad Pro 12.9", 
    price: 280000,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop&crop=center",
    description: "Máy tính bảng chuyên nghiệp cho công việc sáng tạo"
  },
  { 
    id: 6, 
    name: "Samsung Galaxy S24", 
    price: 220000,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop&crop=center",
    description: "Điện thoại Android cao cấp với AI thông minh"
  }
];

function App() {
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'product-detail'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Hiển thị thông báo
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    
    // Hiển thị thông báo và mở popup giỏ hàng
    showNotification(`Đã thêm "${product.name}" vào giỏ hàng!`);
    setShowCart(true);
  };

  // Cập nhật số lượng sản phẩm
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Tính tổng tiền
  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Xem chi tiết sản phẩm
  const handleViewDetail = (product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  // Quay lại trang chủ
  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedProduct(null);
  };

  // Mua ngay - chuyển thẳng đến thanh toán
  const handleBuyNow = async (product, quantity = 1) => {
    setLoading(true);
    try {
      const totalAmount = product.price * quantity;
      const orderInfo = quantity > 1 
        ? `Mua ngay ${product.name} (x${quantity})` 
        : `Mua ngay ${product.name}`;
      
      // Lưu thông tin để gửi email sau khi redirect
      localStorage.setItem(
        "pendingPayment",
        JSON.stringify({
          orderInfo,
          amount: totalAmount,
          cart: [{ ...product, quantity }],
        })
      );

      const response = await fetch("http://localhost:3000/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount.toString(),
          orderInfo: orderInfo,
        }),
      });

      const data = await response.json();
      console.log("MoMo response:", data);

      if (data.payUrl) {
        window.location.href = data.payUrl; // Chuyển sang MoMo thanh toán
      } else {
        alert("Tạo thanh toán thất bại!");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi khi gọi API");
    }
    setLoading(false);
  };

  // Thanh toán giỏ hàng
  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }

    setLoading(true);
    try {
      const orderInfo = `Thanh toán ${cart.length} sản phẩm: ${cart.map(item => `${item.name} (x${item.quantity})`).join(', ')}`;
      
      const response = await fetch("http://localhost:3000/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: getTotalAmount().toString(),
          orderInfo: orderInfo,
        }),
      });

      const data = await response.json();
      console.log("MoMo response:", data);

      if (data.payUrl) {
        // Lưu thông tin để gửi email sau khi redirect
        localStorage.setItem(
          "pendingPayment",
          JSON.stringify({
            orderInfo,
            amount: getTotalAmount(),
            cart,
          })
        );
        window.location.href = data.payUrl; // Chuyển sang MoMo thanh toán
      } else {
        alert("Tạo thanh toán thất bại!");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi khi gọi API");
    }
    setLoading(false);
  };

  // Xử lý redirect từ MoMo: /momo-return?resultCode=0&orderId=...
  useEffect(() => {
    const handleMomoReturn = async () => {
      if (window.location.pathname !== "/momo-return") return;
      const params = new URLSearchParams(window.location.search);
      const resultCode = params.get("resultCode");
      const orderId = params.get("orderId");
      const requestId = params.get("requestId");
      const message = params.get("message");

      if (resultCode === "0") {
        setShowSuccessDialog(true);
        showNotification("Thanh toán thành công! Hóa đơn sẽ được gửi qua email.");

        // Gửi email hóa đơn qua backend
        try {
          const pendingRaw = localStorage.getItem("pendingPayment");
          const pending = pendingRaw ? JSON.parse(pendingRaw) : {};
          await fetch("http://localhost:3000/send-invoice", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId,
              requestId,
              amount: pending.amount,
              orderInfo: pending.orderInfo,
              cart: pending.cart,
              // recipientEmail có thể truyền nếu muốn khác mặc định backend
            }),
          });
        } catch (e) {
          console.error("Send invoice error", e);
        }

        // Dọn local state
        setCart([]);
        localStorage.removeItem("pendingPayment");

        // Điều hướng về trang chủ sau vài giây
        setTimeout(() => {
          setShowSuccessDialog(false);
          window.history.replaceState({}, "", "/");
          setCurrentView('home');
        }, 2500);
      } else {
        showNotification(message || "Thanh toán thất bại", 'error');
        // Xóa pending nếu có
        localStorage.removeItem("pendingPayment");
        // Quay về trang chủ
        setTimeout(() => {
          window.history.replaceState({}, "", "/");
          setCurrentView('home');
        }, 2000);
      }
    };

    handleMomoReturn();
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      {/* Header - chỉ hiển thị khi không ở trang chi tiết sản phẩm */}
      {currentView === 'home' && (
        <Header
          cart={cart}
          getTotalAmount={getTotalAmount}
          onCartClick={() => setShowCart(true)}
        />
      )}

      {/* Main Content */}
      {currentView === 'home' ? (
        <main style={{
          padding: "40px",
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <h2 style={{
            textAlign: "center",
            color: "white",
            fontSize: "2rem",
            marginBottom: "40px",
            fontWeight: "600",
            textShadow: "0 2px 10px rgba(0,0,0,0.3)"
          }}>
            Sản phẩm nổi bật
          </h2>

          <ProductList
            products={products}
            onAddToCart={addToCart}
            onViewDetail={handleViewDetail}
            onBuyNow={handleBuyNow}
          />
        </main>
      ) : (
        <ProductDetail
          product={selectedProduct}
          onAddToCart={addToCart}
          onBack={handleBackToHome}
          onBuyNow={handleBuyNow}
        />
      )}

      {/* Cart Popup */}
      <CartPopup
        showCart={showCart}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        getTotalAmount={getTotalAmount}
        handleCheckout={handleCheckout}
        loading={loading}
        onClose={() => setShowCart(false)}
      />

      {/* Notification */}
      {notification && (
        <div style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          background: notification.type === 'success' ? "#28a745" : "#dc3545",
          color: "white",
          padding: "15px 20px",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          zIndex: 2000,
          animation: "slideInRight 0.3s ease",
          maxWidth: "300px"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <span style={{ fontSize: "1.2rem" }}>
              {notification.type === 'success' ? (
                <FontAwesomeIcon icon={faCheckCircle} />
              ) : (
                <FontAwesomeIcon icon={faTimesCircle} />
              )}
            </span>
            <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>
              {notification.message}
            </span>
          </div>
        </div>
      )}

      {/* Success Dialog */}
      {showSuccessDialog && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 3000,
        }}>
          <div style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "24px",
            width: "min(420px, 92vw)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "56px", marginBottom: "8px", color: "#28a745" }}>
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            <h3 style={{ margin: 0, marginBottom: "8px" }}>Thanh toán thành công</h3>
            <p style={{ margin: 0, color: "#555" }}>
              Hóa đơn sẽ được gửi qua email của cửa hàng.
            </p>
            <div style={{ marginTop: "16px" }}>
              <button
                onClick={() => {
                  setShowSuccessDialog(false);
                  window.history.replaceState({}, "", "/");
                  setCurrentView('home');
                }}
                style={{
                  background: "#28a745",
                  color: "white",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Về trang chủ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes slideInRight {
          from { 
            opacity: 0;
            transform: translateX(100%);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

export default App;
