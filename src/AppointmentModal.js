import React, { useState, useEffect } from "react";

export default function AppointmentModal({
  open,
  onClose,
  onSave,
  onDelete,
  appointment,
  patients,
  doctors,
  date,
}) {
  const [patientId, setPatientId] = useState(appointment?.patientId || "");
  const [doctorId, setDoctorId] = useState(appointment?.doctorId || "");
  const [time, setTime] = useState(appointment?.time || "");

  useEffect(() => {
    setPatientId(appointment?.patientId || "");
    setDoctorId(appointment?.doctorId || "");
    setTime(appointment?.time || "");
  }, [appointment, open]);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!patientId || !doctorId || !time) return;
    onSave({
      ...appointment,
      patientId,
      doctorId,
      time,
      date,
    });
  }

  if (!open) return null;

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-red-700 text-3xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          {appointment ? "Edit Appointment" : "Add Appointment"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200">
              Patient
            </label>
            <select
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              required
            >
              <option value="">Select patient</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200">
              Doctor
            </label>
            <select
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              required
            >
              <option value="">Select doctor</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200">
              Time
            </label>
            <input
              type="time"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            {appointment && onDelete && (
              <button
                type="button"
                className="text-red-600 hover:underline"
                onClick={() => onDelete(appointment.id)}
              >
                Delete
              </button>
            )}
            <div className="flex-1"></div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
