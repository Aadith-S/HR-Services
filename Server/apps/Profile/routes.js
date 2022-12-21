const express= require('express');
const { profile,allEmployees, addEmployees } = require('./controllers/profileController');

const router = express.Router();

router.get('/profile',profile);
router.get("/allEmployees",allEmployees);
router.post("/addEmployee",addEmployees);

module.exports = router;