import React from 'react';
import './LocationModal.css';

function LocationModal({ onClose, onSelectCity, onDetectLocation }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>✖</button>

        <input type="text" placeholder="Search for your city" className="city-search" />

        <button className="detect-btn" onClick={onDetectLocation}>📍 Detect My Location</button>

        <h3>Popular Cities</h3>
        <div className="city-grid">
          {['Hyderabad', 'Bangalore', 'Delhi', 'Mumbai', 'Chennai'].map((city) => (
            <button key={city} onClick={() => onSelectCity(city)}>{city}</button>
          ))}
        </div>

        <a className="view-all" href="#">View All Cities</a>
      </div>
    </div>
  );
}

export default LocationModal;
