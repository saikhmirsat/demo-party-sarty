import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";

const QRCodeViewer = () => {
  const { uniqueId } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`/students/student/${uniqueId}`);
        setStudent(res.data);
      } catch (err) {
        console.error("Error fetching student:", err);
      }
    };
    fetchStudent();
  }, [uniqueId]);

  if (!student) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded">
      <img src={student.qrCode} alt="QR Code" className="w-32 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-center">{student.name}</h2>
      <p className="text-center mb-2">Class: {student.className}</p>
      <p className="text-center">Parent: {student.parentName}</p>
      <p className="text-center">Contact: {student.contactNumber}</p>
    </div>
  );
};

export default QRCodeViewer;
