import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faDollarSign } from '@fortawesome/free-solid-svg-icons';

const Header = ({ cart, getTotalAmount, onCartClick }) => {
  return (
    <header style={{
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(10px)",
      padding: "20px 40px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        <h1 style={{
          margin: 0,
          fontSize: "2.5rem",
          fontWeight: "700",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
          }}>
            <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: "10px" }} />
            TechStore
          </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {cart.length > 0 && (
            <div style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              color: "#28a745",
              background: "rgba(40, 167, 69, 0.1)",
              padding: "8px 16px",
              borderRadius: "20px",
              border: "1px solid rgba(40, 167, 69, 0.3)"
              }}>
                <FontAwesomeIcon icon={faDollarSign} style={{ marginRight: "5px" }} />
                {getTotalAmount().toLocaleString()} VND
              </div>
          )}
          <button
            onClick={onCartClick}
            style={{
              padding: "12px 24px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: "1rem",
              fontWeight: "600",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
              transition: "all 0.3s ease",
              position: "relative"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
            }}
            >
              <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: "8px" }} />
              Giỏ hàng
            {cart.length > 0 && (
              <span style={{
                background: "#ff4757",
                color: "white",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8rem",
                fontWeight: "bold",
                position: "absolute",
                top: "-5px",
                right: "-5px"
              }}>
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
