const mongoose = require("mongoose");

const registrationLinkSchema = new mongoose.Schema({
  urlId: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("RegistrationLink", registrationLinkSchema);
