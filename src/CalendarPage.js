import React, { useState, useEffect } from "react";
import { startOfMonth, endOfMonth, addMonths, subMonths, format, isSameDay, isSameMonth, addDays } from "date-fns";
import { getAppointments, saveAppointments, deleteAppointment } from "./utils";
import { doctors, patients } from "./data";
import CalendarMonth from "./CalendarMonth";
import CalendarDay from "./CalendarDay";
import AppointmentModal from "./AppointmentModal";
import FilterBar from "./FilterBar";
import DarkModeToggle from "./DarkModeToggle";

function getPatientName(id) {
  return patients.find(p => p.id === id)?.name || "";
}
function getDoctorName(id) {
  return doctors.find(d => d.id === id)?.name || "";
}

function getDaysInMonth(year, month) {
  const days = [];
  let date = startOfMonth(new Date(year, month));
  const last = endOfMonth(date);
  while (date <= last) {
    days.push(new Date(date));
    date = addDays(date, 1);
  }
  return days;
}

export default function CalendarPage() {
  const [appointments, setAppointments] = useState(() => getAppointments());
  const [modal, setModal] = useState({ open: false, date: null, appt: null });
  const [filters, setFilters] = useState({});
  const [viewDate, setViewDate] = useState(new Date());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showDayList, setShowDayList] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);

  const apptsWithNames = React.useMemo(() =>
    appointments.map(a => ({
      ...a,
      patientName: getPatientName(a.patientId),
      doctorName: getDoctorName(a.doctorId),
    })), [appointments]
  );

  function handleDayClick(date) {
    setModal({ open: true, date: format(date, "yyyy-MM-dd"), appt: null });
  }
  function handleEditAppt(appt) {
    setModal({ open: true, date: appt.date, appt });
  }
  function handleSave(appt) {
    let newAppointments;
    if (appt.id) {
      newAppointments = appointments.map(a => a.id === appt.id ? { ...appt } : a);
    } else {
      newAppointments = [
        ...appointments,
        { ...appt, id: Math.random().toString(36).slice(2) },
      ];
    }
    setAppointments(newAppointments);
    saveAppointments(newAppointments);
    setModal({ open: false, date: null, appt: null });
  }
  function handleDelete(id) {
    const newAppointments = appointments.filter(a => a.id !== id);
    setAppointments(newAppointments);
    saveAppointments(newAppointments);
    setModal({ open: false, date: null, appt: null });
  }

  function handlePrevDay() {
    setViewDate(d => addDays(d, -1));
  }
  function handleNextDay() {
    setViewDate(d => addDays(d, 1));
  }
  function handlePrevMonth() {
    setViewDate(d => subMonths(d, 1));
  }
  function handleNextMonth() {
    setViewDate(d => addMonths(d, 1));
  }

  const modalAppts = apptsWithNames.filter(a => a.date === modal.date);

  return (
    <div className="p-4 max-w-5xl mx-auto relative bg-blue-50 dark:bg-gray-900 min-h-screen">
      <div className={modal.open ? "blur-sm pointer-events-none select-none" : ""}>
        <div className={isMobile ? "flex flex-col items-center mb-4" : "flex items-center justify-between mb-4"}>
          {isMobile && (
            <>
              <div className="w-full flex justify-end mb-2">
                <DarkModeToggle />
              </div>
              <input
                type="date"
                className="mb-2 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white"
                value={format(viewDate, 'yyyy-MM-dd')}
                onChange={e => {
                  const val = e.target.value;
                  if (val) setViewDate(new Date(val));
                }}
                style={{ maxWidth: 220 }}
              />
            </>
          )}
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Appointment Calendar</h1>
        </div>
        <div className={isMobile ? "flex justify-center mb-4" : "mb-4"}>
          <FilterBar doctors={doctors} patients={patients} filters={filters} setFilters={setFilters} />
        </div>
        <div className="mb-4">
          {isMobile ? (
            <>
              <div className="flex justify-center">
                <CalendarDay
                  date={viewDate}
                  appointments={apptsWithNames}
                  onPrev={handlePrevDay}
                  onNext={handleNextDay}
                  onDayClick={handleDayClick}
                  filters={filters}
                />
              </div>
              <div className="flex justify-center mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
                  onClick={() => setShowDayList(true)}
                >
                  Select Day
                </button>
              </div>
              {showDayList && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" onClick={e => { if (e.target === e.currentTarget) setShowDayList(false); }}>
                  <div className="bg-white dark:bg-gray-800 rounded shadow-lg p-4 w-full max-w-xs max-h-[80vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-lg text-gray-800 dark:text-gray-100">Select a Day</span>
                      <button className="text-gray-400 hover:text-red-600 text-2xl font-bold" onClick={() => setShowDayList(false)}>&times;</button>
                    </div>
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                      {daysInMonth.map(day => (
                        <li key={day.toISOString()}>
                          <button
                            className={`w-full text-left px-2 py-2 hover:bg-blue-100 dark:hover:bg-blue-900 rounded ${isSameDay(day, viewDate) ? 'bg-blue-200 dark:bg-blue-700 font-bold' : ''}`}
                            onClick={() => { setViewDate(day); setShowDayList(false); }}
                          >
                            {format(day, "EEEE, MMM d, yyyy")}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <button onClick={handlePrevMonth} className="p-2 text-lg">◀</button>
                <span className="text-xl font-bold">{format(viewDate, "MMMM yyyy")}</span>
                <button onClick={handleNextMonth} className="p-2 text-lg">▶</button>
              </div>
              <CalendarMonth
                year={year}
                month={month}
                appointments={apptsWithNames}
                onDayClick={handleDayClick}
                filters={filters}
              />
            </div>
          )}
        </div>
        {/* List appointments for the selected day (desktop) */}
        {!isMobile && modal.open && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Appointments for {modal.date}</h2>
            <ul className="space-y-2">
              {modalAppts.length === 0 ? (
                <li className="text-gray-400">No appointments</li>
              ) : modalAppts.map(a => (
                <li key={a.id} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded px-2 py-1 flex justify-between items-center">
                  <span>{a.time} - {a.patientName} with {a.doctorName}</span>
                  <button className="text-xs text-blue-600 hover:underline" onClick={() => handleEditAppt(a)}>Edit</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <AppointmentModal
        open={modal.open}
        onClose={() => setModal({ open: false, date: null, appt: null })}
        onSave={handleSave}
        onDelete={handleDelete}
        appointment={modal.appt}
        patients={patients}
        doctors={doctors}
        date={modal.date}
      />
    </div>
  );
}
