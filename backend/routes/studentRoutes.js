const express = require("express");
const router = express.Router();
const { registerStudent, getAllStudents, getStudentByUniqueId } = require("../controllers/studentController");
const { isAuthenticated } = require("../middleware/authMiddleware");

router.post("/register/:urlId", registerStudent); // Public
router.get("/all", isAuthenticated, getAllStudents); // Admin
router.get("/student/:uniqueId", getStudentByUniqueId); // QR Code Viewer

module.exports = router;
