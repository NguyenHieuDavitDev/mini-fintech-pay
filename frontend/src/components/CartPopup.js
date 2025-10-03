import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, 
  faTimes, 
  faMinus, 
  faPlus, 
  faTrash, 
  faCreditCard, 
  faClock 
} from '@fortawesome/free-solid-svg-icons';

const CartPopup = ({ showCart, cart, updateQuantity, removeFromCart, getTotalAmount, handleCheckout, loading, onClose }) => {
  if (!showCart) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      animation: "fadeIn 0.3s ease"
    }}>
      <div style={{
        background: "white",
        borderRadius: "20px",
        padding: "30px",
        maxWidth: "500px",
        width: "90%",
        maxHeight: "80vh",
        overflow: "auto",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        animation: "slideUp 0.3s ease"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
          paddingBottom: "15px",
          borderBottom: "2px solid #f0f0f0"
        }}>
          <h2 style={{
            margin: 0,
            fontSize: "1.8rem",
            fontWeight: "700",
            color: "#333"
          }}>
            <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: "10px" }} />
            Giỏ hàng của bạn
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "#999",
              padding: "5px",
              borderRadius: "50%",
              width: "35px",
              height: "35px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#f0f0f0";
              e.target.style.color = "#333";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "none";
              e.target.style.color = "#999";
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "40px 20px",
            color: "#666"
          }}>
            <div style={{ fontSize: "4rem", marginBottom: "20px", color: "#ccc" }}>
              <FontAwesomeIcon icon={faShoppingCart} />
            </div>
            <p style={{ fontSize: "1.1rem", margin: 0 }}>Giỏ hàng của bạn đang trống</p>
            <p style={{ fontSize: "0.9rem", margin: "10px 0 0 0" }}>Hãy thêm sản phẩm để bắt đầu mua sắm!</p>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} style={{
                display: "flex",
                alignItems: "center",
                padding: "15px 0",
                borderBottom: "1px solid #f0f0f0"
              }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    marginRight: "15px"
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    margin: "0 0 5px 0",
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "#333"
                  }}>
                    {item.name}
                  </h4>
                  <p style={{
                    margin: 0,
                    fontSize: "0.9rem",
                    color: "#666"
                  }}>
                    {item.price.toLocaleString()} VND
                  </p>
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{
                      width: "30px",
                      height: "30px",
                      background: "#ff4757",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      cursor: "pointer",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)";
                    }}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                  <span style={{
                    minWidth: "30px",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: "1rem"
                  }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{
                      width: "30px",
                      height: "30px",
                      background: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      cursor: "pointer",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)";
                    }}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      width: "30px",
                      height: "30px",
                      background: "#6c757d",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      marginLeft: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)";
                    }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                </div>
              </div>
            ))}
            
            <div style={{
              marginTop: "25px",
              paddingTop: "20px",
              borderTop: "2px solid #667eea"
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px"
              }}>
                <h3 style={{
                  margin: 0,
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#333"
                }}>
                  Tổng cộng:
                </h3>
                <span style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#667eea"
                }}>
                  {getTotalAmount().toLocaleString()} VND
                </span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "15px",
                  background: loading ? "#ccc" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)"
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.5)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.3)";
                  }
                }}
                >
                  {loading ? (
                    <>
                      <FontAwesomeIcon icon={faClock} style={{ marginRight: "8px" }} />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faCreditCard} style={{ marginRight: "8px" }} />
                      Thanh toán ngay
                    </>
                  )}
                </button>
            </div>
          </>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CartPopup;
