// ProductList.jsx
import React from "react";

import img999 from "../assets/999.jpg";
import img1000 from "../assets/1000.jpg";
import img1001 from "../assets/1001.jpg";

const products = [
  {
    id: 1,
    name: "NiceD Electric Toothrush",
    description:
      "Powerful Vibration for Deep Cleaning, newest generation motor and five levels of power control.",
    price: 59.99,
    image: img999,
  },
  {
    id: 2,
    name: "NiceD Mouthwash - Advanced Care",
    description: "New Floride Solutions with 12 Hours Protection",
    price: 9.99,
    image: img1000,
  },
  {
    id: 3,
    name: "NiceD MouthWash Strip",
    description: "Kill germs secret from your pocket",
    price: 2.99,
    image: img1001,
  },
];

export default function ProductList() {
  return (
    <section className="modern-box">
      <h2 className="modern-title">Featured Oral Care Products</h2>
      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              background: "rgba(207, 222, 243, 0.7)",
              borderRadius: 14,
              boxShadow: "0 2px 12px rgba(44, 62, 80, 0.08)",
              padding: 18,
              width: 250,
              border: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              width={200}
              height={150}
              style={{ objectFit: "cover", borderRadius: 10, marginBottom: 10 }}
            />
            <h3 style={{ color: "#2d6a4f", margin: "0.5rem 0" }}>
              {product.name}
            </h3>
            <p style={{ color: "#333", fontSize: "1rem", margin: 0 }}>
              {product.description}
            </p>
            <p
              style={{ color: "#40916c", fontWeight: 600, margin: "0.5rem 0" }}
            >
              ${product.price.toFixed(2)}
            </p>
            <button
              className="button"
              style={{
                background: "#2d6a4f",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "0.5rem 1.2rem",
                fontWeight: 500,
                cursor: "pointer",
                marginTop: 8,
                boxShadow: "0 2px 8px rgba(44, 62, 80, 0.08)",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
