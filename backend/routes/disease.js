const express = require('express');
const { getMedicinesByDiseaseName, postDiseaseWithMedicines, getDisease } = require('../controllers/diseaseController');
const router = express.Router();

// Route to get medicines by disease name
router.get('/medicines/:name', getMedicinesByDiseaseName);
router.get('/:name', getDisease);
router.post('/', postDiseaseWithMedicines);


module.exports = router;
