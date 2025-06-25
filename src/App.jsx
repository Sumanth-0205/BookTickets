import {Routes,Route,Link} from 'react-router-dom';

import MovieTickets from './pages/MovieTickets';

import BookingHistory from './pages/BookingHistory';

import LocationModal from './components/LocationModal';

import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import BookingPage from './pages/BookingPage'; 

import ConfirmationPage from './pages/ConfirmationPage';

import  './app.css';
import './index.css';

function App(){

  const [location, setLocation] = useState('');
  const [showModal, setShowModal] = useState(false);

  function handleLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude, longitude } = position.coords;

        fetch(`https://us1.locationiq.com/v1/reverse.php?key=pk.7fc251c3b4715109f6e0c69db38d031b&lat=${latitude}&lon=${longitude}&format=json`)
          .then(response => response.json())
          .then(data => {
            const city = data.address.city || data.address.town || data.address.village || 'Unknown';
            setLocation(city);
               setShowModal(false);
          })
          .catch(error => {
            console.error('Error fetching city:', error);
            setLocation('City not found');
               setShowModal(false);
          });
      },
      function (error) {
        console.error(error);
        setLocation('Location access denied');
         setShowModal(false);
      }
    );
  } else {
    setLocation('Geolocation not supported');
         setShowModal(false);
  }
}



  return(
    <div>

       {showModal && (
        <LocationModal
          onClose={() => setShowModal(false)}
          onDetectLocation={handleLocation}
          onSelectCity={(city) => {
            setLocation(city);
            setShowModal(false);
          }}
        />
      )}

      <nav className="navbar">
         <div className="location-box">
  <button onClick={() => setShowModal(true)}>📍 Add Location</button>
          {location && <span style={{ marginLeft: '10px' }}>{location}</span>}
        </div>
        
      

        <ul className='nav-links'>
     
          <li><NavLink to="/movies"  className={({ isActive}) => isActive ? 'active' : ''}>Movie Tickets</NavLink></li>

          <li><NavLink to="/bookingHistory"  className={({ isActive}) => isActive ? 'active' : ''}>Booking History</NavLink></li>
        </ul>

      </nav>

      <div style={{padding:'10rem',marginLeft:"200px"}}>
          <Routes>
            
            <Route path="/movies" element={<MovieTickets/>}/>     
            <Route path="/bookingHistory" element={<BookingHistory/>} />
            <Route path="/movies/:title/book" element={<BookingPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
          </Routes>
      </div>

    </div>
  );
}
export default App;