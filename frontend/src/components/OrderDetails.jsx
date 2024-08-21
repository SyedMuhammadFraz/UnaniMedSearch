import React, { useState, useEffect } from "react";
import api from "../axiosConfig";
import "./OrderDetails.css";

const OrderDetails = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [medicineDetails, setMedicineDetails] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get(`/order/${user}`);
        setOrders(response.data);

        // Fetch details for each medicine in the orders
        const medicineIds = response.data.flatMap(order => 
          order.medicines.map(medicine => medicine.medicineId)
        );

        // Remove duplicates
        const uniqueMedicineIds = [...new Set(medicineIds)];
        
        const fetchMedicineDetails = async (id) => {
          try {
            const response = await api.get(`/medicines/${id}`);
            setMedicineDetails(prev => ({ ...prev, [id]: response.data }));
          } catch (error) {
            console.error(`Error fetching medicine ${id}:`, error);
          }
        };

        uniqueMedicineIds.forEach(fetchMedicineDetails);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="order-container">
      <h1>Order Details</h1>
      {orders.length > 0 ? (
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Address</th>
              <th>Total Amount</th>
              <th>Medicines</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.postalAddress}</td>
                <td className="total-amount">${order.totalAmount}</td>
                <td>
                  <ul>
                    {order.medicines.map((medicine) => {
                      const medicineDetail = medicineDetails[medicine.medicineId];
                      return (
                        <li key={medicine.medicineId}>
                          {medicineDetail ? `${medicineDetail.name} - Quantity: ${medicine.quantity}` : `Loading... - Quantity: ${medicine.quantity}`}
                        </li>
                      );
                    })}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderDetails;
