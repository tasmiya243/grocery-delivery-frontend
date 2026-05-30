import React, { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Rice",
    price: 50,
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Rice_grains.jpg"
  },
  {
    id: 2,
    name: "Milk",
    price: 30,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Milk_glass.jpg/640px-Milk_glass.jpg"
  },
  {
    id: 3,
    name: "Bread",
    price: 25,
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/White_bread.jpg"
  },
  {
    id: 4,
    name: "Eggs",
    price: 60,
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Chicken_eggs.jpg"
  },
  {
    id: 5,
    name: "Vegetables",
    price: 40,
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Vegetables.jpg"
  },
  {
    id: 6,
    name: "Fruits",
    price: 80,
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Culinary_fruits_front_view.jpg"
  },
  {
    id: 7,
    name: "Juice",
    price: 45,
    image: "https://upload.wikimedia.org/wikipedia/commons/0/05/Orange_juice_1.jpg"
  },
  {
    id: 8,
    name: "Biscuits",
    price: 20,
    image: "https://upload.wikimedia.org/wikipedia/commons/7/70/Digestive_biscuits.jpg"
  }
];

function App() {
  const [cart, setCart] = useState({});

  const addToCart = (item) => {
    setCart((prev) => {
      const qty = prev[item.id]?.qty || 0;
      return {
        ...prev,
        [item.id]: { ...item, qty: qty + 1 }
      };
    });
  };

  const decreaseQty = (id) => {
    setCart((prev) => {
      const item = prev[id];
      if (!item) return prev;

      if (item.qty === 1) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }

      return {
        ...prev,
        [id]: { ...item, qty: item.qty - 1 }
      };
    });
  };

  const removeItem = (id) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[id];
      return newCart;
    });
  };

  const total = Object.values(cart).reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="app">
      <header>
        <h1>🛒 Grocery Store</h1>
        <p>Your daily essentials</p>
      </header>

      <div className="main">
        {/* PRODUCTS */}
        <div className="products">
          {products.map((item) => (
            <div className="card" key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
              <h3>{item.name}</h3>
              <p className="price">₹{item.price}</p>

              {cart[item.id] ? (
                <div className="qty">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{cart[item.id].qty}</span>
                  <button onClick={() => addToCart(item)}>+</button>
                </div>
              ) : (
                <button className="add" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              )}
            </div>
          ))}
        </div>

        {/* CART */}
        <div className="cart">
          <h2>🧾 Cart</h2>

          {Object.values(cart).length === 0 && <p>No items in cart</p>}

          {Object.values(cart).map((item) => (
            <div key={item.id} className="cart-item">
              <div>
                <p>{item.name}</p>
                <small>{item.qty} × ₹{item.price}</small>
              </div>

              <div>
                <p>₹{item.qty * item.price}</p>
                <button onClick={() => removeItem(item.id)}>❌</button>
              </div>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;