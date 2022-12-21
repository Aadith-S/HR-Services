const express = require('express');
const { allBankDetails } = require('./controller');

const router = express.Router();

router.get("/BankDetail/:id", allBankDetails);

module.exports = router;