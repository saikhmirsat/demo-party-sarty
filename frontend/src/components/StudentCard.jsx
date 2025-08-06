import React from "react";
import { FaUser, FaBirthdayCake, FaSchool, FaClipboardList, FaAddressCard, FaPhone } from "react-icons/fa";

const StudentCard = ({ student }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <div className="relative p-6 border-b border-gray-200 dark:border-gray-700">
        <img
          src={student.qrCode}
          alt={`QR Code for ${student.name}`}
          className="w-40 h-40 object-contain p-2 bg-white rounded-lg mx-auto mb-4 border border-gray-200 dark:border-gray-700 shadow-md"
        />
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white truncate">
          {student.name}
        </h2>
      </div>
      <div className="p-6 text-gray-700 dark:text-gray-300 space-y-3">
        <div className="flex items-center space-x-3">
          <FaBirthdayCake className="text-blue-500" />
          <p>
            <span className="font-semibold text-gray-900 dark:text-gray-100">DOB:</span>{" "}
            {student.dob}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <FaSchool className="text-green-500" />
          <p>
            <span className="font-semibold text-gray-900 dark:text-gray-100">Class:</span>{" "}
            {student.className}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <FaClipboardList className="text-purple-500" />
          <p>
            <span className="font-semibold text-gray-900 dark:text-gray-100">Section:</span>{" "}
            {student.section}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <FaUser className="text-red-500" />
          <p>
            <span className="font-semibold text-gray-900 dark:text-gray-100">Parent:</span>{" "}
            {student.parentName}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <FaPhone className="text-yellow-500" />
          <p>
            <span className="font-semibold text-gray-900 dark:text-gray-100">Contact:</span>{" "}
            {student.contactNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;