const express = require('express');
const recordsController = require('../controllers/recordsController');

// routes setup
const router = express.Router();
router.get('/records/:id', recordsController.getRecord);
router.get('/', recordsController.getAllRecords);
router.post('/', recordsController.createNewRecord);
router.delete('/delete/:id', recordsController.deleteRecord);
router.patch('/update/:id', recordsController.updateRecord);
module.exports = router;
