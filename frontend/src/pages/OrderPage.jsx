import React, { useState } from "react";
import OrderDetails from "../components/OrderDetails";
import "../components/OrderPage.css"; // Import the CSS file

const OrderPage = () => {
  const [user, setUser] = useState("");
  const [showOrders, setShowOrders] = useState(false);

  const handleInputChange = (e) => {
    setUser(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowOrders(true); // This will trigger the OrderDetails component to fetch and display orders
  };

  return (
    <div className="order-page-container">
      {!showOrders ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Enter your email to view orders:</label>
          <input
            type="email"
            id="email"
            value={user}
            onChange={handleInputChange}
            required
          />
          <button type="submit">View Orders</button>
        </form>
      ) : (
        <div className="order-details-container">
          <OrderDetails user={user} />
        </div>
      )}
    </div>
  );
};

export default OrderPage;
