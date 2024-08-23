// src/components/MedicineSearch.js
import React, { useState } from "react";
import api from "../axiosConfig.js";
import "./Medicine.css";
import { toast } from "react-toastify";

const MedicineSearch = ({ onAddToOrder }) => {
  const [diseaseName, setDiseaseName] = useState("");
  const [diseaseDetails, setDiseaseDetails] = useState(null);
  const [medicines, setMedicines] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await api.get(`/disease/${diseaseName}`);
      const { description, symptoms, medicines } = response.data;
      setDiseaseDetails({ description, symptoms });
      setMedicines(medicines);
    } catch (error) {
      toast.error(
        "Either you are typing the disease name incorrectly or you have placed an order and didn't view the order details!"
      );
      console.error("Error fetching disease details:", error);
    }
  };

  return (
    <div className="medicine-search-container">
      <input
        type="text"
        placeholder="Enter disease name"
        value={diseaseName}
        onChange={(e) => setDiseaseName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {diseaseDetails && (
        <div className="disease-details">
          <h2>Description</h2>
          <p>{diseaseDetails.description}</p>
          <h3>Symptoms</h3>
          <p>{diseaseDetails.symptoms}</p>
        </div>
      )}

      {medicines.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Medicine Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine._id}>
                <td>
                  <img
                    src={`${medicine.name.toLowerCase()}.png`}
                    alt={medicine.name}
                    style={{ width: "80px", height: "80px" }} // Example styling
                  />
                </td>
                <td>{medicine.name}</td>
                <td>Rs. {medicine.price}</td>
                <td>
                  <button onClick={() => onAddToOrder(medicine)}>
                    Add to Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No medicines found.</p>
      )}
    </div>
  );
};

export default MedicineSearch;
