import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";

const RegistrationForm = () => {
  const { urlId } = useParams();
  const [form, setForm] = useState({
    name: "",
    dob: "",
    className: "",
    section: "",
    address: "",
    parentName: "",
    contactNumber: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/students/register/${urlId}`, form);
      setSubmitted(true);
    } catch (err) {
      alert("Submission failed.");
    }
  };

  if (submitted)
    return <h2 className="text-center text-green-600 mt-10">Form Submitted Successfully!</h2>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Student Registration</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(form).map((key) => (
          <input
            key={key}
            type="text"
            required
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="w-full mb-3 p-2 border rounded"
          />
        ))}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
