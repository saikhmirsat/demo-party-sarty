const express = require("express");
const router = express.Router();
const { loginAdmin, createRegistrationLink } = require("../controllers/authController");

router.post("/login", loginAdmin);
router.post("/create-registration-link", createRegistrationLink); // Admin creates link

module.exports = router;
