const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: String, required: true },
  className: { type: String, required: true },
  section: { type: String },
  address: { type: String },
  parentName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  qrCode: { type: String }, // base64 QR Code image
  uniqueId: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
