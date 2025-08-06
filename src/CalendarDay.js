import React from "react";
import { format } from "date-fns";

export default function CalendarDay({ date, appointments, onPrev, onNext, onDayClick, filters }) {
  const appts = appointments.filter(a => a.date === format(date, "yyyy-MM-dd") &&
    (!filters.doctor || a.doctorId === filters.doctor) &&
    (!filters.patient || a.patientId === filters.patient)
  );
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-2">
        <button onClick={onPrev} className="p-2 text-lg" aria-label="Previous Day">◀</button>
        <button onClick={() => onDayClick(date)} className="text-xl font-bold text-blue-700 dark:text-blue-300">
          {format(date, "EEEE, MMM d, yyyy")}
        </button>
        <button onClick={onNext} className="p-2 text-lg" aria-label="Next Day">▶</button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded shadow p-4 min-h-[200px]">
        {appts.length === 0 ? (
          <div className="text-gray-400 text-center">No appointments</div>
        ) : (
          <ul className="space-y-2">
            {appts.map(appt => (
              <li key={appt.id} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded px-2 py-1 flex flex-col">
                <span className="font-semibold">{appt.time}</span>
                <span>{appt.patientName} with {appt.doctorName}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 