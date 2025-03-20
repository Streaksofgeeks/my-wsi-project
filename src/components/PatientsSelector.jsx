// src/components/PatientSelector.jsx
import React from 'react';

const PatientSelector = ({ patients, selectedPatientId, onSelectPatient }) => {
  return (
    <div className="p-4">
      <label htmlFor="patient-select" className="block mb-2 font-bold">
        Select Patient:
      </label>
      <select
        id="patient-select"
        value={selectedPatientId}
        onChange={(e) => onSelectPatient(e.target.value)}
        className="border p-2 rounded"
      >
        {patients.map((patient) => (
          <option key={patient.patient_id} value={patient.patient_id}>
            Patient {patient.patient_id}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PatientSelector;
