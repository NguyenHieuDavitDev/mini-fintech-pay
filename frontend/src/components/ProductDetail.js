import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faShoppingCart, 
  faCreditCard, 
  faCheck, 
  faMinus, 
  faPlus, 
  faFire 
} from '@fortawesome/free-solid-svg-icons';

const ProductDetail = ({ product, onAddToCart, onBack, onBuyNow }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Tạo thêm một số ảnh mẫu cho gallery
  const productImages = [
    product.image,
    product.image.replace('w=300&h=300', 'w=400&h=400'),
    product.image.replace('w=300&h=300', 'w=500&h=500'),
    product.image.replace('w=300&h=300', 'w=600&h=600')
  ];

  const features = [
    "Thiết kế cao cấp, sang trọng",
    "Hiệu năng mạnh mẽ, ổn định",
    "Pin trâu, sử dụng lâu dài",
    "Camera chuyên nghiệp",
    "Hỗ trợ 5G, kết nối nhanh",
    "Bảo hành chính hãng 12 tháng"
  ];

  const specifications = {
    "Màn hình": "6.1 inch Super Retina XDR",
    "Chip": "A17 Pro chip",
    "Camera": "48MP Main, 12MP Ultra Wide",
    "Pin": "Lên đến 23 giờ video",
    "Kết nối": "5G, Wi‑Fi 6E, Bluetooth 5.3",
    "Hệ điều hành": "iOS 17"
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      padding: "20px"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        background: "rgba(255, 255, 255, 0.95)",
        borderRadius: "20px",
        padding: "40px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.1)"
      }}>
        {/* Back Button */}
        <button
          onClick={onBack}
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "10px 20px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "600",
            marginBottom: "30px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "none";
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: "8px" }} />
          Quay lại
        </button>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          alignItems: "start"
        }}>
          {/* Image Gallery */}
          <div>
            <div style={{
              width: "100%",
              height: "400px",
              borderRadius: "20px",
              overflow: "hidden",
              marginBottom: "20px",
              position: "relative"
            }}>
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease"
                }}
              />
              <div style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "rgba(255,255,255,0.9)",
                padding: "8px 15px",
                borderRadius: "20px",
                fontSize: "1rem",
                fontWeight: "600",
                color: "#333"
              }}>
                <FontAwesomeIcon icon={faFire} style={{ marginRight: "5px" }} />
                Hot Sale
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div style={{
              display: "flex",
              gap: "10px",
              overflowX: "auto",
              paddingBottom: "10px"
            }}>
              {productImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    cursor: "pointer",
                    border: selectedImage === index ? "3px solid #667eea" : "3px solid transparent",
                    transition: "all 0.3s ease",
                    flexShrink: 0
                  }}
                  onClick={() => setSelectedImage(index)}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                  }}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#333",
              margin: "0 0 15px 0",
              lineHeight: "1.2"
            }}>
              {product.name}
            </h1>

            <div style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#667eea",
              marginBottom: "20px"
            }}>
              {product.price.toLocaleString()} VND
            </div>

            <p style={{
              fontSize: "1.1rem",
              color: "#666",
              lineHeight: "1.6",
              marginBottom: "30px"
            }}>
              {product.description}
            </p>

            {/* Features */}
            <div style={{ marginBottom: "30px" }}>
              <h3 style={{
                fontSize: "1.3rem",
                fontWeight: "600",
                color: "#333",
                marginBottom: "15px"
              }}>
                <FontAwesomeIcon icon={faCheck} style={{ marginRight: "8px", color: "#28a745" }} />
                Tính năng nổi bật
              </h3>
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0
              }}>
                {features.map((feature, index) => (
                  <li key={index} style={{
                    padding: "8px 0",
                    fontSize: "1rem",
                    color: "#555",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                  }}>
                    <FontAwesomeIcon icon={faCheck} style={{ color: "#28a745", fontSize: "1rem" }} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div style={{ marginBottom: "30px" }}>
              <h3 style={{
                fontSize: "1.3rem",
                fontWeight: "600",
                color: "#333",
                marginBottom: "15px"
              }}>
                <FontAwesomeIcon icon={faCheck} style={{ marginRight: "8px", color: "#667eea" }} />
                Thông số kỹ thuật
              </h3>
              <div style={{
                background: "#f8f9fa",
                borderRadius: "15px",
                padding: "20px"
              }}>
                {Object.entries(specifications).map(([key, value]) => (
                  <div key={key} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 0",
                    borderBottom: "1px solid #eee"
                  }}>
                    <span style={{ fontWeight: "600", color: "#333" }}>{key}:</span>
                    <span style={{ color: "#666" }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div style={{
              background: "#f8f9fa",
              borderRadius: "15px",
              padding: "25px",
              marginBottom: "20px"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "20px"
              }}>
                <span style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "#333"
                }}>
                  Số lượng:
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "#ff4757",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      cursor: "pointer",
                      fontSize: "1.2rem",
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
                    minWidth: "50px",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: "1.2rem"
                  }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      cursor: "pointer",
                      fontSize: "1.2rem",
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
                </div>
              </div>

              <div style={{
                display: "flex",
                gap: "15px"
              }}>
                <button
                  onClick={() => {
                    for (let i = 0; i < quantity; i++) {
                      onAddToCart(product);
                    }
                  }}
                  style={{
                    flex: 1,
                    padding: "15px",
                    background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontSize: "1.1rem",
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
                  <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: "8px" }} />
                  Thêm vào giỏ hàng ({quantity})
                </button>
                <button
                  onClick={() => onBuyNow(product, quantity)}
                  style={{
                    flex: 1,
                    padding: "15px",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontSize: "1.1rem",
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
                  <FontAwesomeIcon icon={faCreditCard} style={{ marginRight: "8px" }} />
                  Mua ngay ({quantity})
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div style={{
              textAlign: "center",
              fontSize: "1.3rem",
              fontWeight: "700",
              color: "#667eea",
              background: "rgba(102, 126, 234, 0.1)",
              padding: "15px",
              borderRadius: "12px"
            }}>
              Tổng: {(product.price * quantity).toLocaleString()} VND
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
