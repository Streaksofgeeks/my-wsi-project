// src/components/Viewer.jsx
import React, { useState, useRef, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const Viewer = ({ patientData }) => {
  let detectionResults = [];
  try {
    // Parse the inference_results string (replacing single quotes with double quotes)
    const parsed = JSON.parse(patientData.inference_results.replace(/'/g, '"'));
    detectionResults = parsed.output.detection_results;
  } catch (err) {
    console.error('Error parsing inference_results:', err);
  }

  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const imageRef = useRef(null);
  const transformWrapperRef = useRef(null);

  const handleImageLoad = (e) => {
    setImageSize({
      width: e.target.naturalWidth,
      height: e.target.naturalHeight,
    });
  };

  return (
    <div className="w-full h-full relative">
      <TransformWrapper
        ref={transformWrapperRef}
        initialScale={1}
        minScale={0.5}
        maxScale={5}
        limitToBounds={true}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="absolute top-4 left-4 z-10 flex space-x-2">
              <button
                onClick={() => { console.log("Zoom In clicked"); zoomIn(); }}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Zoom In
              </button>
              <button
                onClick={() => { console.log("Zoom Out clicked"); zoomOut(); }}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Zoom Out
              </button>
              <button
                onClick={() => { console.log("Reset clicked"); resetTransform(); }}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Reset
              </button>
            </div>

            <TransformComponent>
              <div className="relative">
                <img
                  // For patient 1, use its filename; for patients 2, 3, 4 (or 7) use "wsi.png"
                  src={
                    patientData.patient_id === "1"
                      ? `/${patientData.filename}`
                      : "/wsi.png"
                  }
                  alt="Whole Slide Image"
                  onLoad={handleImageLoad}
                  ref={imageRef}
                  className="block"
                />

                {imageSize.width > 0 && imageSize.height > 0 && (
                  <svg
                    className="absolute top-0 left-0 pointer-events-none"
                    width={imageSize.width}
                    height={imageSize.height}
                  >
                    {detectionResults.map((box, i) => {
                      const [x1, y1, x2, y2, label] = box;
                      const boxWidth = x2 - x1;
                      const boxHeight = y2 - y1;
                      return (
                        <g key={i}>
                          <rect
                            x={x1}
                            y={y1}
                            width={boxWidth}
                            height={boxHeight}
                            fill="none"
                            stroke="red"
                            strokeWidth="2"
                          />
                          <text
                            x={x1}
                            y={y1 - 5}
                            fill="red"
                            className="text-sm font-bold"
                          >
                            {label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                )}
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default Viewer;
