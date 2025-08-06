import React from "react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameMonth, isSameDay } from "date-fns";

function getMonthMatrix(year, month) {
  const matrix = [];
  const firstDayOfMonth = startOfMonth(new Date(year, month));
  const lastDayOfMonth = endOfMonth(firstDayOfMonth);
  let current = startOfWeek(firstDayOfMonth, { weekStartsOn: 0 });
  const end = endOfWeek(lastDayOfMonth, { weekStartsOn: 0 });
  while (current <= end) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(current);
      current = addDays(current, 1);
    }
    matrix.push(week);
  }
  return matrix;
}

export default function CalendarMonth({ year, month, appointments, onDayClick, filters }) {
  const today = new Date();
  const monthMatrix = getMonthMatrix(year, month);

  function getAppointmentsForDay(date) {
    return appointments.filter(a => a.date === format(date, "yyyy-MM-dd") &&
      (!filters.doctor || a.doctorId === filters.doctor) &&
      (!filters.patient || a.patientId === filters.patient)
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
          <div key={d} className="text-center font-semibold text-gray-600 dark:text-gray-300">{d}</div>
        ))}
      </div>
      {monthMatrix.map((week, i) => (
        <div className="grid grid-cols-7 gap-1 mb-1" key={i}>
          {week.map((date, j) => {
            const inMonth = isSameMonth(date, new Date(year, month));
            const isToday = isSameDay(date, today);
            const appts = getAppointmentsForDay(date);
            return (
              <button
                key={j}
                onClick={() => inMonth && onDayClick(date)}
                className={`h-24 w-full rounded p-1 border text-left transition
                  ${inMonth ? "bg-white dark:bg-gray-800" : "bg-gray-100 dark:bg-gray-700 text-gray-400"}
                  ${isToday ? "border-blue-500" : "border-gray-200 dark:border-gray-700"}
                  hover:ring-2 hover:ring-blue-400`}
                disabled={!inMonth}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-sm">{format(date, "d")}</span>
                  {isToday && <span className="text-xs text-blue-500">Today</span>}
                </div>
                <div className="space-y-1">
                  {appts.map(appt => (
                    <div key={appt.id} className="text-xs truncate bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded px-1 py-0.5">
                      {appt.time} - {appt.patientName}
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
} 