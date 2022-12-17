const express = require('express');
const router = express.Router();
const feedc = require("./controllers/feedbackController")
router.post("/addFeedback",feedc.addFeedback);
router.get("/viewFeedback",feedc.findAllFeedbacks);

module.exports = router;