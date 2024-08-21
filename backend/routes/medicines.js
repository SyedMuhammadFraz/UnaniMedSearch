const express = require('express');
const router = express.Router();
const { postMedicines, getMedicineById } = require('../controllers/medicineController');

// Route to post medicines
router.post('/medicines', postMedicines);
router.get('/medicines/:id', getMedicineById);


module.exports = router;
