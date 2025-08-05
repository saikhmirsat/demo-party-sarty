const Student = require("../models/Student");
const RegistrationLink = require("../models/RegistrationLink");
const generateQRCode = require("../utils/generateQRCode");
const { v4: uuidv4 } = require("uuid");

exports.registerStudent = async (req, res) => {
  try {
    const { urlId } = req.params;
    const link = await RegistrationLink.findOne({ urlId, isActive: true });
    if (!link) return res.status(400).json({ message: "Invalid or expired registration link" });

    const { name, dob, className, section, address, parentName, contactNumber } = req.body;
    const uniqueId = uuidv4();

    const qrDataUrl = await generateQRCode(`https://yourdomain.com/student/${uniqueId}`);

    const newStudent = await Student.create({
      name, dob, className, section, address,
      parentName, contactNumber, uniqueId,
      qrCode: qrDataUrl,
    });

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch students", error });
  }
};

exports.getStudentByUniqueId = async (req, res) => {
  try {
    const { uniqueId } = req.params;
    const student = await Student.findOne({ uniqueId });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student", error });
  }
};
