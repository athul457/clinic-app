# 🏥 Appointment Calendar for Clinic Staff

A responsive frontend-only appointment management app built with React. Designed for clinic or hospital front desk staff to view, add, and manage doctor-patient appointments.

---

## 📌 Features

- 🔐 **Mock Login** with hardcoded credentials
- 🗓️ **Month View Calendar** (Desktop) with compact appointment display
- 📱 **Daily View with Date Picker** (Mobile)
- 🧑‍⚕️ **Add/Edit Appointments** using dropdowns for doctors & patients
- 💾 **Data Persistence** using localStorage
- ✅ Responsive UI with clean layout

---

## 🧪 Credentials

```
Email: staff@clinic.com
Password: 123456
```

---

## 🔧 Tech Stack

- **Frontend**: React (with Hooks)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React local state + localStorage
- **Optional UI Library**: `react-calendar` (if used)

---

## 📂 Folder Structure

```
src/
├── components/
│   ├── AppointmentModal.js
│   ├── CalendarDay.js
│   ├── CalendarMonth.js
│   ├── DarkModeToggle.js
│   ├── FilterBar.js
│   └── utils.js
├── pages/
│   ├── LoginPage.js
│   └── CalendarPage.js
├── data/
│   └── data.js (static doctors & patients)
├── App.js
├── index.js
├── App.css / Tailwind config
```
