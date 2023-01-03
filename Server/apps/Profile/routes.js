const express= require('express');
const { profile,allEmployees, addEmployees, updateEmployee, currentEmployee } = require('./controllers/profileController');

const router = express.Router();

router.get('/profile',profile);
router.get("/allEmployees",allEmployees);
router.post("/addEmployee",addEmployees);
router.post("/updateEmployee",updateEmployee);
router.get('/currentEmployee/:id',currentEmployee);
module.exports = router;