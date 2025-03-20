// src/App.jsx
import React, { useState } from 'react';
import Viewer from './components/Viewer';
import Thumbnail from './components/Thumbnail';
import Sidebar from './components/Sidebar';
import PatientSelector from './components/PatientsSelector';
import patientsData from './data/patients.json';
import outputData from './data/output.json';

// Merge the patients data so that output.json is used as patient "1"
const mergedPatientsData = [
  outputData,
  ...patientsData.filter((patient) => patient.patient_id !== "1"),
];

function App() {
  // Default to the first patient in the merged data array
  const [selectedPatientId, setSelectedPatientId] = useState(mergedPatientsData[0].patient_id);
  const selectedPatient = mergedPatientsData.find(
    (p) => p.patient_id === selectedPatientId
  );

  // State for the clicked region in the full image coordinate system.
  // We'll later use this in the Viewer to zoom in on the selected region.
  const [selectedRegion, setSelectedRegion] = useState(null);

  // Callback when thumbnail is clicked.
  // This converts the thumbnail click coordinates into full-image coordinates.
  const handleThumbnailClick = (clickX, clickY) => {
    // Assume the thumbnail is a scaled version of the full image.
    // For example, if the thumbnail is 1/5th the size, use a scale factor of 5.
    const scaleFactor = 5;
    const fullX = clickX * scaleFactor;
    const fullY = clickY * scaleFactor;
    // Optionally, you might want to add a zoom scale (e.g., 2x) when zooming in.
    setSelectedRegion({ x: fullX, y: fullY, scale: 2 });
    console.log(`Thumbnail clicked at (${clickX}, ${clickY}) → Full image coordinates: (${fullX}, ${fullY})`);
  };

  return (
    <div className="h-screen grid grid-cols-[250px_1fr_300px]">
      <aside className="bg-gray-100 overflow-y-auto">
        <PatientSelector
          patients={mergedPatientsData}
          selectedPatientId={selectedPatientId}
          onSelectPatient={setSelectedPatientId}
        />
        <Sidebar patientData={selectedPatient} />
      </aside>
      <main className="relative bg-gray-200 overflow-hidden">
        <Viewer patientData={selectedPatient} selectedRegion={selectedRegion} />
      </main>
      <section className="bg-gray-50 p-4">
        <Thumbnail onThumbnailClick={handleThumbnailClick} />
      </section>
    </div>
  );
}

export default App;
