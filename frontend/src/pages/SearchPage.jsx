// src/pages/SearchPage.js
import React, { useState } from "react";
import MedicineSearch from "../components/MedicineSearch";
import api from "../axiosConfig.js";
import "../components/SearchPage.css";
import { toast } from 'react-toastify';


const SearchPage = () => {
  const [order, setOrder] = useState([]);

  const handleAddToOrder = (medicine) => {
    // Check if the medicine is already in the order
    const existingMedicine = order.find(
      (item) => item.medicineId === medicine._id
    );
    if (existingMedicine) {
      // Update the quantity if it's already in the order
      setOrder(
        order.map((item) =>
          item.medicineId === medicine._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add new medicine to the order
      setOrder([
        ...order,
        {
          medicineId: medicine._id,
          quantity: 1,
          name: medicine.name,
          price: medicine.price,
        },
      ]);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await api.post("/order", {
        user: "example_user@gmail.com", // Replace with actual user info
        medicines: order.map((item) => ({
          medicineId: item.medicineId,
          quantity: item.quantity,
        })),
        postalAddress: "123 Main Street", // Replace with actual address
      });
      toast.success("Order placed successfully!");
      setOrder([]);
      console.log("Order placed successfully:", response.data);
    } catch (error) {
        toast.error("Error placing order!");
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      <h1>Search Medicines</h1>
      <MedicineSearch onAddToOrder={handleAddToOrder} />

      {order.length > 0 && (
        <div>
          <h2>Your Order</h2>
          <table>
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {order.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="place_order_btn">
            <button onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
