import React, { useEffect, useState } from "react";
import axios from "../services/api";
import StudentCard from "../components/StudentCard";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { token } = useAuth();
  const [students, setStudents] = useState([]);
  const [registrationLink, setRegistrationLink] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await axios.get("/students/all", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(res.data);
    };
    fetchStudents();
  }, [token]);

  const handleCreateLink = async () => {
    const res = await axios.post("/auth/create-registration-link", {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setRegistrationLink(`${window.location.origin}/register/${res.data.registrationUrl.split("/").pop()}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <button
        onClick={handleCreateLink}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Generate Registration Link
      </button>

      {registrationLink && (
        <p className="mb-4">
          Share this link with parent: <br />
          <a href={registrationLink} className="text-blue-600 underline">{registrationLink}</a>
        </p>
      )}

      <div className="flex flex-wrap gap-4">
        {students.map((student) => (
          <StudentCard key={student._id} student={student} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
