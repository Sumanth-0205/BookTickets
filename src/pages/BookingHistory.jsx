import React, { useEffect, useState } from 'react';

function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('bookedSeats') || '[]');
    setBookings(data);
  }, []);
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Your Orders</h2>
      

      <h3 style={{ marginTop: '2rem' }}>📖 Booking History</h3>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {bookings.map((b, idx) => (
            <li key={idx} style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              marginBottom: '1rem',
              padding: '1rem',
              backgroundColor: '#f9f9f9'
            }}>
              <p><strong>Movie:</strong> {b.title}</p>
              <p><strong>Date:</strong> {b.date}</p>
              <p><strong>Time:</strong> {b.time}</p>
              <p><strong>Seats:</strong> {b.seats.join(', ')}</p>
            </li>
          ))}
        </ul>
      )}
      <button
  onClick={() => {
    localStorage.removeItem('bookedSeats');
    setBookings([]);
  }}
  style={{
    marginTop: '2rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }}
>
  Clear Booking History
</button>

    </div>
  );
}
export default BookingHistory;
