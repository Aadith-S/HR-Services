const express= require('express');
const { profile,allEmployees } = require('./controllers/profileController');

const router = express.Router();

router.get('/profile',profile);
router.get("/allEmployees",allEmployees);

module.exports = router;