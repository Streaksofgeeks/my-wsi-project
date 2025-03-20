// src/components/Sidebar.jsx
import React from 'react';

const Sidebar = ({ patientData }) => {
  let detectionResults = [];
  try {
    const parsed = JSON.parse(patientData.inference_results.replace(/'/g, '"'));
    console.log('Parsed JSON for patient', patientData.patient_id, ':', parsed);
    detectionResults = parsed.output.detection_results;
  } catch (err) {
    console.error('Error parsing inference_results:', err);
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Details</h2>
      <p className="mb-2">
        <span className="font-semibold">Patient ID:</span> {patientData.patient_id}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Date:</span> {patientData.date}
      </p>
      <p className="mb-4">
        <span className="font-semibold">Sample Type:</span> {patientData.sample_type}
      </p>
      <hr className="my-4" />
      <h3 className="text-xl font-semibold mb-2">Bounding Boxes Found</h3>
      <p className="mb-2">Total: {detectionResults.length}</p>
      {detectionResults.length === 0 && (
        <p className="text-red-500">No bounding boxes found in the dataset.</p>
      )}
      <ul className="list-disc pl-5 text-sm max-h-60 overflow-y-auto">
        {detectionResults.map((box, idx) => (
          <li key={idx}>
            [{box[0]}, {box[1]}, {box[2]}, {box[3]}] - {box[4]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
