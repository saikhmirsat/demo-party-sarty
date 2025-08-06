import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";
import { toast, Toaster } from "react-hot-toast";
import { 
  FaUserCircle, 
  FaBirthdayCake, 
  FaSchool, 
  FaClipboardList, 
  FaPhone, 
  FaMapMarkerAlt,
  FaIdCard
} from "react-icons/fa";

const QRCodeViewer = () => {
  const { uniqueId } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`/students/student/${uniqueId}`);
        setStudent(res.data);
      } catch (err) {
        console.error("Error fetching student:", err);
        setError("Student not found or link is invalid.");
        toast.error("Failed to load student details. The link might be invalid or expired.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [uniqueId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-700 dark:text-gray-300 text-lg">Loading student ID card...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Toaster position="top-right" />
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error</h2>
          <p className="text-gray-700 dark:text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-700 dark:text-gray-300 text-lg">No student data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Toaster position="top-right" />
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden w-full max-w-md transform transition-all duration-300 hover:scale-105">
        {/* ID Card Header */}
        <div className="p-4 bg-blue-700 dark:bg-blue-900 text-white flex items-center">
          <FaSchool className="text-4xl" />
          <div className="ml-4">
            <h1 className="text-xl font-bold">Qlith Innovation</h1>
            <p className="text-sm">Student Identity Card</p>
          </div>
        </div>

        {/* Main Content (Photo & Primary Details) */}
        <div className="p-6 flex items-center space-x-6">
          {/* Photo Section */}
          <div className="flex-shrink-0 w-28 h-28 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-2 border-gray-300 dark:border-gray-600">
            {/* Placeholder for actual student photo */}
            <FaUserCircle className="text-7xl text-gray-500 dark:text-gray-400" />
          </div>

          {/* Primary Details */}
          <div className="flex-1">
            <p className="text-xs text-gray-500 dark:text-gray-400">Student Name</p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{student.name}</h2>
            <p className="text-sm mt-1 text-gray-700 dark:text-gray-300 flex items-center">
                <FaIdCard className="mr-2 text-blue-500"/>
                ID: <span className="font-semibold ml-1">STU-{student._id.substring(0, 8).toUpperCase()}</span>
            </p>
          </div>
        </div>

        {/* Secondary Details Grid */}
        <div className="px-6 pb-6 text-gray-700 dark:text-gray-300 grid grid-cols-1 md:grid-cols-2 gap-y-3">
          <div className="flex items-center space-x-2">
            <FaBirthdayCake className="text-sm text-blue-500" />
            <p className="text-sm"><span className="font-semibold">DOB:</span> {student.dob}</p>
          </div>
          <div className="flex items-center space-x-2">
            <FaSchool className="text-sm text-green-500" />
            <p className="text-sm"><span className="font-semibold">Class:</span> {student.className}</p>
          </div>
          <div className="flex items-center space-x-2">
            <FaClipboardList className="text-sm text-purple-500" />
            <p className="text-sm"><span className="font-semibold">Section:</span> {student.section}</p>
          </div>
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-sm text-orange-500" />
            <p className="text-sm"><span className="font-semibold">Address:</span> {student.address}</p>
          </div>
          <div className="flex items-center space-x-2">
            <FaUserCircle className="text-sm text-red-500" />
            <p className="text-sm"><span className="font-semibold">Parent Name:</span> {student.parentName}</p>
          </div>
          <div className="flex items-center space-x-2">
            <FaPhone className="text-sm text-yellow-500" />
            <p className="text-sm"><span className="font-semibold">Contact:</span> {student.contactNumber}</p>
          </div>
        </div>

        {/* ID Card Footer with Digital Signature */}
        <div className="p-4 bg-gray-100 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
          <div className="flex flex-col items-end">
            <p className="text-xl font-[Open_Sans] italic text-gray-900 dark:text-white leading-none">Saikh Mirsat</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Authorized Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeViewer;