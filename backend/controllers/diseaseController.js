const Disease = require("../models/Disease");


exports.getMedicinesByDiseaseName = async (req, res) => {
    try {
        const { name } = req.params;
        // Find the disease by name (case-insensitive)
        const disease = await Disease.findOne({ name: new RegExp(`^${name}$`, 'i') }).populate('medicines');
        
        if (!disease) return res.status(404).json({ msg: 'Disease not found' });
        
        // Return the list of medicines
        res.json(disease.medicines);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.postDiseaseWithMedicines = async (req, res) => {
    try {
        const { name, symptoms, description, medicineIds } = req.body;

        // Create and save the disease with provided medicine IDs
        const newDisease = new Disease({
            name,
            symptoms,
            description,
            medicines: medicineIds 
        });

        const savedDisease = await newDisease.save();
        res.status(201).json(savedDisease);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
