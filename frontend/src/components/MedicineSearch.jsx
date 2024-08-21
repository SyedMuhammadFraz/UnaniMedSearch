// src/components/MedicineSearch.js
import React, { useState } from 'react';
import api from '../axiosConfig.js';
import './Medicine.css';  // Import the CSS file
import { toast } from 'react-toastify';

const MedicineSearch = ({ onAddToOrder }) => {
    const [diseaseName, setDiseaseName] = useState('');
    const [medicines, setMedicines] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await api.get(`/disease/medicines/${diseaseName}`);
            setMedicines(response.data);
        } catch (error) {
            toast.error("Either you are typing disease name incorrectly or have palced the order and didnt viewed the order details!")
            console.error('Error fetching medicines:', error);
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

            {medicines.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Medicine Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicines.map((medicine) => (
                            <tr key={medicine._id}>
                                <td>{medicine.name}</td>
                                <td>${medicine.price}</td> {/* Assuming `price` is a field */}
                                <td>
                                    <button onClick={() => onAddToOrder(medicine)}>
                                        Add to Order
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
