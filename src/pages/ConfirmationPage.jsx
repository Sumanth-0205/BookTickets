
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, date, time, seats } = location.state || {};

  if (!title || !date || !time || !seats) {
    return (
      <div style={{ padding: '2rem' }}>
        <h3>Invalid booking details.</h3>
        <button onClick={() => navigate('/')} style={{ marginTop: '1rem' }}>
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🎉 Booking Confirmed!</h2>
      <p><strong>Movie:</strong> {title}</p>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Time:</strong> {time}</p>
      <p><strong>Seats:</strong> {seats.join(', ')}</p>
      <button onClick={() => navigate('/')} style={{
        marginTop: '1.5rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Book Another
      </button>
    </div>
  );
}

export default ConfirmationPage;
