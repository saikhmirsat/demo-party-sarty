import React, { useEffect, useState } from "react";
import axios from "../services/api";
import StudentCard from "../components/StudentCard";
import { useAuth } from "../context/AuthContext";
import copy from "copy-to-clipboard"; // Correct import: 'copy' is a function, not a component
import { toast, Toaster } from "react-hot-toast";

const Dashboard = () => {
  const { token, logout } = useAuth();
  const [students, setStudents] = useState([]);
  const [registrationLink, setRegistrationLink] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("/students/all", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudents(res.data);
      } catch (err) {
        toast.error("Failed to fetch students.");
      }
    };
    fetchStudents();
  }, [token]);

  const handleCreateLink = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/auth/create-registration-link", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const link = `${window.location.origin}/register/${res.data.registrationUrl.split("/").pop()}`;
      setRegistrationLink(link);
      toast.success("Registration link generated successfully!");
    } catch (err) {
      toast.error("Failed to create registration link.");
    } finally {
      setLoading(false);
    }
  };

  // This function will now use the 'copy' function from 'copy-to-clipboard'
  const handleCopy = () => {
    copy(registrationLink); // Call the copy function with the link
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <Toaster position="top-right" />
      
      <header className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-extrabold">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out"
        >
          Logout
        </button>
      </header>

      <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Manage Registrations</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleCreateLink}
            disabled={loading}
            className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200 ease-in-out ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              "Generate New Registration Link"
            )}
          </button>

          {registrationLink && (
            <div className="flex-1 flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
              <span className="truncate text-sm font-mono flex-1 mr-4">{registrationLink}</span>
              {/* Changed from CopyToClipboard component to a regular button with onClick */}
              <button 
                onClick={handleCopy} // Call the new handleCopy function
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-md transition duration-200 ease-in-out"
              >
                Copy
              </button>
            </div>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">All Students</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {students.length > 0 ? (
            students.map((student) => (
              <StudentCard key={student._id} student={student} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
              No students found.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;