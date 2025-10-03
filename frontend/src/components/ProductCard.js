import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPlus, faFire } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product, onAddToCart, onViewDetail, onBuyNow }) => {
  const handleCardClick = (e) => {
    // Ngăn chặn event bubbling khi click vào nút
    if (e.target.closest('button')) {
      return;
    }
    onViewDetail(product);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Ngăn chặn event bubbling
    onAddToCart(product);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation(); // Ngăn chặn event bubbling
    onBuyNow(product);
  };

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        borderRadius: "20px",
        padding: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden"
      }}
      onClick={handleCardClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-10px)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
      }}
    >
      <div 
        style={{
          width: "100%",
          height: "200px",
          borderRadius: "15px",
          overflow: "hidden",
          marginBottom: "15px",
          position: "relative"
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        />
        <div style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "rgba(255,255,255,0.9)",
          padding: "5px 10px",
          borderRadius: "15px",
          fontSize: "0.9rem",
          fontWeight: "600",
          color: "#333"
        }}>
          <FontAwesomeIcon icon={faFire} style={{ marginRight: "5px" }} />
          Hot
        </div>
        <div style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          background: "rgba(0,0,0,0.7)",
          color: "white",
          padding: "5px 10px",
          borderRadius: "15px",
          fontSize: "0.8rem",
          fontWeight: "500"
        }}>
          <FontAwesomeIcon icon={faEye} style={{ marginRight: "5px" }} />
          Xem chi tiết
        </div>
      </div>
      
      <h3 
        style={{
          fontSize: "1.3rem",
          fontWeight: "700",
          margin: "0 0 8px 0",
          color: "#333"
        }}
      >
        {product.name}
      </h3>
      
      <p style={{
        fontSize: "0.9rem",
        color: "#666",
        margin: "0 0 15px 0",
        lineHeight: "1.4"
      }}>
        {product.description}
      </p>
      
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
      }}>
        <span style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          color: "#667eea"
        }}>
          {product.price.toLocaleString()} VND
        </span>
      </div>
      
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={handleAddToCart}
          style={{
            flex: 1,
            padding: "10px",
            background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "0.9rem",
            fontWeight: "600",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 15px rgba(40, 167, 69, 0.3)"
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 20px rgba(40, 167, 69, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 15px rgba(40, 167, 69, 0.3)";
          }}
        >
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
          Thêm vào giỏ
        </button>
        <button
          onClick={handleBuyNow}
          style={{
            flex: 1,
            padding: "10px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "0.9rem",
            fontWeight: "600",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)"
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.3)";
          }}
        >
          <FontAwesomeIcon icon={faEye} style={{ marginRight: "5px" }} />
          Mua ngay
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
