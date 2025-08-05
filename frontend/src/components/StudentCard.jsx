import React from "react";

const StudentCard = ({ student }) => {
  return (
    <div className="bg-white shadow p-4 rounded-md w-full md:w-72">
      <img src={student.qrCode} alt="QR Code" className="w-32 mx-auto mb-3" />
      <h2 className="text-xl font-bold">{student.name}</h2>
      <p><strong>DOB:</strong> {student.dob}</p>
      <p><strong>Class:</strong> {student.className}</p>
      <p><strong>Section:</strong> {student.section}</p>
      <p><strong>Parent:</strong> {student.parentName}</p>
      <p><strong>Contact:</strong> {student.contactNumber}</p>
    </div>
  );
};

export default StudentCard;
