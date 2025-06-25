import React from 'react';
import { useNavigate } from 'react-router-dom';

function MovieTickets() {
  const navigate = useNavigate();

  const movies = [
    {
      title: 'Jawan',
      language: 'Hindi',
      format: '2D',
      rating: 'UA',
      //poster: 'https://upload.wikimedia.org/wikipedia/en/f/f0/Jawan_film_poster.jpg'
    },
    {
      title: 'Hi Nanna',
      language: 'Telugu',
      format: '2D',
      rating: 'U',
     // poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f0/Hi_Nanna_poster.jpg/220px-Hi_Nanna_poster.jpg'
    },
    {
      title: 'Oppenheimer',
      language: 'English',
      format: 'IMAX 3D',
      rating: 'A',
     // poster: 'https://upload.wikimedia.org/wikipedia/en/1/1b/Oppenheimer_%28film%29.jpg'
    },
    {
      title: 'Animal',
      language: 'Hindi',
      format: '2D',
      rating: 'A',
    //  poster: 'https://upload.wikimedia.org/wikipedia/en/4/4f/Animal_film_poster.jpg'
    },
    {
      title: 'Leo',
      language: 'Tamil',
      format: '2D',
      rating: 'UA',
     // poster: 'https://upload.wikimedia.org/wikipedia/en/d/d1/Leo_2023_poster.jpg'
    }
  ];

  function handleBooking(title) {
  navigate(`/movies/${encodeURIComponent(title.toLowerCase())}/book`);


  }

  return (
    <div style={{ padding: '2rem',margin:"0px" }}>
      <h2 style={{marginTop:'0'}}>Now Showing</h2>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {movies.map((movie, index) => (
          <div
            key={index}
            style={{
              
              border: '10px solid #ccc',
              color:'black',
              padding: '1rem',
              borderRadius: '24px',
              width: '200px',
              backgroundColor:"silver"
            }}
          >
            
            <h3>{movie.title}</h3>
            <p><strong>Language:</strong> {movie.language}</p>
            <p><strong>Format:</strong> {movie.format}</p>
            <p><strong>Rating:</strong> {movie.rating}</p>
            <button
              onClick={() => handleBooking(movie.title)}
              style={{
                marginTop: '0.5rem',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieTickets;
