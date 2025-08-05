const jwt = require("jsonwebtoken");
const RegistrationLink = require("../models/RegistrationLink");
const { v4: uuidv4 } = require("uuid");

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

exports.loginAdmin = (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

exports.createRegistrationLink = async (req, res) => {
  try {
    const urlId = uuidv4();
    const link = await RegistrationLink.create({ urlId });
    res.status(201).json({ registrationUrl: `/register/${urlId}` });
  } catch (error) {
    res.status(500).json({ message: "Error creating link", error });
  }
};
