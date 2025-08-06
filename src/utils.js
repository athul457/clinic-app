const APPOINTMENTS_KEY = 'appointments';

export function getAppointments() {
  const data = localStorage.getItem(APPOINTMENTS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveAppointments(appointments) {
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
}

export function findAppointmentsByDate(dateStr) {
  const all = getAppointments();
  return all.filter(a => a.date === dateStr);
}

export function getAppointmentById(id) {
  const all = getAppointments();
  return all.find(a => a.id === id);
}

export function deleteAppointment(id) {
  const all = getAppointments();
  const filtered = all.filter(a => a.id !== id);
  saveAppointments(filtered);
} 