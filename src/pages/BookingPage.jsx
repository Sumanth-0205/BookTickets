import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BookingPage() {
  const { title } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState({ dateIndex: null, timeIndex: null });
  const [seatCount, setSeatCount] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const today = new Date();
  const oneWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    return date;
  });

  const showTimes = ['11:00 AM', '2:30 PM', '6:00 PM', '9:30 PM'];

  const handleReset = () => {
    setStep(1);
    setSelected({ dateIndex: null, timeIndex: null });
    setSeatCount(null);
    setSelectedSeats([]);
  };

  const handleShowTimeClick = (dateIndex, timeIndex) => {
    setSelected({ dateIndex, timeIndex });
  };

  const handleSeatCountClick = (num) => {
    setSeatCount(num);
    setSelectedSeats([]);
    setStep(3);
  };

  const handleSeatToggle = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else if (selectedSeats.length < seatCount) {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const allBooked = JSON.parse(localStorage.getItem('bookedSeats') || '[]');
  const bookedSeatsForThisShow = allBooked
    .filter(b =>
      b.title === title &&
      b.date === oneWeek[selected.dateIndex]?.toDateString() &&
      b.time === showTimes[selected.timeIndex]
    )
    .flatMap(b => b.seats);

  const renderSeatGrid = () => {
    const layout = [];
    for (let row = 0; row < 5; row++) {
      const rowSeats = [];
      for (let col = 0; col < 8; col++) {
        const seatId = `${String.fromCharCode(65 + row)}${col + 1}`;
        const isSelected = selectedSeats.includes(seatId);
        const isBooked = bookedSeatsForThisShow.includes(seatId);

        rowSeats.push(
          <button
            key={seatId}
            onClick={() => handleSeatToggle(seatId)}
            disabled={isBooked}
            style={{
              width: '40px',
              height: '40px',
              margin: '5px',
              backgroundColor: isBooked
                ? '#6c757d'
                : isSelected
                ? '#ffc107'
                : '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: isBooked ? 'not-allowed' : 'pointer'
            }}
          >
            {seatId}
          </button>
        );
      }
      layout.push(<div key={row} style={{ display: 'flex' }}>{rowSeats}</div>);
    }
    return layout;
  };

  const handleConfirmBooking = () => {
    const previous = JSON.parse(localStorage.getItem('bookedSeats') || '[]');
    const current = {
      title,
      date: oneWeek[selected.dateIndex].toDateString(),
      time: showTimes[selected.timeIndex],
      seats: selectedSeats
    };
    localStorage.setItem('bookedSeats', JSON.stringify([...previous, current]));
    navigate('/confirmation', { state: current });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Book Tickets for <span style={{ color: '#007bff' }}>{title} </span></h2>

      {step === 1 && (
        <>
          <h4>Select Date and Showtime:</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem' }}>
            {oneWeek.map((date, i) => (
              <div key={i} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
                <h4>{date.toDateString()}</h4>
                {showTimes.map((time, j) => {
                  const active = selected.dateIndex === i && selected.timeIndex === j;
                  return (
                    <button
                      key={j}
                      onClick={() => handleShowTimeClick(i, j)}
                      style={{
                        display: 'block',
                        marginTop: '0.5rem',
                        width: '100%',
                        backgroundColor: active ? '#28a745' : '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '0.5rem'
                      }}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          <button
            disabled={selected.dateIndex === null || selected.timeIndex === null}
            onClick={() => setStep(2)}
            style={{
              marginTop: '1.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Next
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h4>Select number of seats:</h4>
          <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem', marginLeft:'150px' }}>
            {[1, 2, 3, 4, 5, 6].map(num => (
              <button
                key={num}
                onClick={() => handleSeatCountClick(num)}
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: seatCount === num ? '#17a2b8' : '#e0e0e0',
                  color: seatCount === num ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {num}
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(1)}
            style={{
              marginTop: '1.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Back
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <h3 style={{ marginTop: '2rem',marginLeft:'0px' }}>
            Select Your Seats ({selectedSeats.length}/{seatCount})
         </h3 >
         <h4 style={{marginLeft:'140px'}}>{renderSeatGrid()} </h4> 
          <button
            onClick={() => setStep(2)}
            style={{
              marginTop: '1.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              marginBottom: '1rem',
              cursor: 'pointer'
            }}
          >
            Back
          </button>

          {selectedSeats.length === seatCount && (
            <div style={{
              marginTop: '2rem',
              padding: '1rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9'
            }}>
              <h4>Booking Summary</h4>
              <p><strong>Movie:</strong> {title}</p>
              <p><strong>Date:</strong> {oneWeek[selected.dateIndex].toDateString()}</p>
              <p><strong>Time:</strong> {showTimes[selected.timeIndex]}</p>
              <p><strong>Seats:</strong> {selectedSeats.join(', ')}</p>
              <button
                onClick={handleConfirmBooking}
                style={{
                  marginTop: '1rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Confirm Booking
              </button>
            </div>
          )}
        </>
      )}

     
    </div>
  );
}

export default BookingPage;
``