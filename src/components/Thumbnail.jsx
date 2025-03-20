// src/components/Thumbnail.jsx
import React from 'react';

const Thumbnail = ({ onThumbnailClick }) => {
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Calculate click coordinates relative to the thumbnail element.
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    onThumbnailClick(clickX, clickY);
  };

  return (
    <div className="relative cursor-pointer" onClick={handleClick}>
      <h3 className="text-lg font-bold mb-2">Overview</h3>
      <div className="relative">
        <img
          src="/thumbnail.png"
          alt="WSI Thumbnail"
          className="w-full h-auto border-2 border-black object-contain"
        />
      </div>
    </div>
  );
};

export default Thumbnail;
