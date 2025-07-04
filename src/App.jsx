import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

import ProductList from "./components/ProductList";
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

function Home() {
  return <ProductList />;
}

function App() {
  React.useEffect(() => {
    document.title = "NiceD Store";
  }, []);
  return (
    <Router>
      <header
        style={{
          background: "rgba(45, 106, 79, 0.92)",
          color: "#fff",
          padding: "1.5rem 0 1rem 0",
          fontSize: "2.1rem",
          fontWeight: 700,
          letterSpacing: "1.5px",
          textAlign: "center",
          marginBottom: 0,
        }}
      >
        Welcome to NiceD Oral Care Store
      </header>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
