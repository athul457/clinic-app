import React from "react";

export default function FilterBar({ doctors, patients, filters, setFilters }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4 items-center">
      <select
        className="p-2 border rounded dark:bg-gray-700 dark:text-white"
        value={filters.doctor || ""}
        onChange={e => setFilters(f => ({ ...f, doctor: e.target.value || undefined }))}
      >
        <option value="">All Doctors</option>
        {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select>
      <select
        className="p-2 border rounded dark:bg-gray-700 dark:text-white"
        value={filters.patient || ""}
        onChange={e => setFilters(f => ({ ...f, patient: e.target.value || undefined }))}
      >
        <option value="">All Patients</option>
        {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
    </div>
  );
} 