import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onAddToCart, onViewDetail, onBuyNow }) => {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "30px",
      marginBottom: "40px"
    }}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onViewDetail={onViewDetail}
          onBuyNow={onBuyNow}
        />
      ))}
    </div>
  );
};

export default ProductList;
