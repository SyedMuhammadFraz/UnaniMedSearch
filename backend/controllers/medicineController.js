const Medicine = require("../models/Medicine"); // Adjust path as necessary

exports.postMedicines = async (req, res) => {
  try {
    const medicines = req.body; // Expect an array of medicines

    // Validate the medicines array (this is a basic example; adjust as needed)
    if (!Array.isArray(medicines)) {
      return res.status(400).json({ msg: "Invalid data format" });
    }

    // Insert the medicines into the database
    const result = await Medicine.insertMany(medicines);

    // Return a success message with the inserted medicines
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMedicineById = async (req, res) => {
  try {
    const { id } = req.params;
    const medicine = await Medicine.findById(id);

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.status(200).json(medicine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
