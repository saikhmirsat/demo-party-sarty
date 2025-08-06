import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";
import { toast, Toaster } from "react-hot-toast";

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
  const [loading, setLoading] = useState(false);

  // A generic change handler function to update state based on the input's 'name' attribute
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, dob, className, section, address, parentName, contactNumber } = form;
    if (!name || !dob || !className || !section || !address || !parentName || !contactNumber) {
      toast.error("Please fill in all the required fields.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(`/students/register/${urlId}`, form);
      setSubmitted(true);
      toast.success("Form submitted successfully!");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Submission failed. The link may be invalid or expired.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Toaster position="top-right" />
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md text-center">
          <svg
            className="w-16 h-16 text-green-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Success!</h2>
          <p className="text-gray-600 dark:text-gray-400">
              The registration form has been submitted successfully.
          </p>
        </div>
      </div>
    );
  }

  // Configuration for form fields
  const formFields = [
    { name: "name", label: "Student's Name", placeholder: "e.g., Jane Doe" },
    { name: "dob", label: "Date of Birth", type: "date" },
    { name: "className", label: "Class", placeholder: "e.g., 10" },
    { name: "section", label: "Section", placeholder: "e.g., A" },
    { name: "address", label: "Address", placeholder: "e.g., 123 Main St, Anytown" },
    { name: "parentName", label: "Parent's Name", placeholder: "e.g., John Doe" },
    { name: "contactNumber", label: "Contact Number", type: "tel", placeholder: "e.g., 123-456-7890" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Toaster position="top-right" />
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-6">
          Student Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {formFields.map((field) => (
            <div key={field.name} className="mb-4">
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                id={field.name}
                name={field.name} // This is the crucial 'name' attribute
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <svg
                className="animate-spin h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;