const express = require('express');
const { getRole, addRole, getdesig } = require('./controller');
const router = express.Router();

router.get("/getRole",getRole);
router.post("/addRole",addRole);
router.get("/getDesignation",getdesig);
module.exports = router;