// API nøgler og grundlæggende URL'er
const apiKey = 'd2b1c1d6b45a2d09c8902c95a0b2a3bb';
const baseUrl = 'https://api.themoviedb.org/3/';
const popularApiUrl = `${baseUrl}discover/movie?sort_by=popularity.desc&api_key=${apiKey}`; // URL til at hente populære film
const imgUrl = 'https://image.tmdb.org/t/p/w500'; // Basis URL for filmplakater

// Liste over genre-id'er og deres navne
const genres = [
    { "id": 28, "name": "Action" },
    { "id": 12, "name": "Adventure" },
    { "id": 16, "name": "Animation" },
    { "id": 35, "name": "Comedy" },
    { "id": 80, "name": "Crime" },
    { "id": 99, "name": "Documentary" },
    { "id": 18, "name": "Drama" },
    { "id": 10751, "name": "Family" },
    { "id": 14, "name": "Fantasy" },
    { "id": 36, "name": "History" },
    { "id": 27, "name": "Horror" },
    { "id": 10402, "name": "Music" },
    { "id": 9648, "name": "Mystery" },
    { "id": 10749, "name": "Romance" },
    { "id": 878, "name": "Science Fiction" },
    { "id": 10770, "name": "TV Movie" },
    { "id": 53, "name": "Thriller" },
    { "id": 10752, "name": "War" },
    { "id": 37, "name": "Western" }
];

// Fylder genre-dropdown med genrerne
function populateGenreDropdown() {
    const genreDropdown = document.getElementById('genreDropdown');
  
    genres.forEach(genre => {
      // Opretter en liste med genrevalg
      const genreItem = document.createElement('li');
      const genreLink = document.createElement('a');
      genreLink.classList.add('dropdown-item');
      genreLink.href = `genre.html?genreId=${genre.id}`; // Linket leder til genre-siden med genre-id
      genreLink.innerText = genre.name; // Viser genre-navnet
  
      genreItem.appendChild(genreLink);
      genreDropdown.appendChild(genreItem);
    });
}

// Henter populære film og viser dem på siden
function fetchPopularMovies() {
    fetch(popularApiUrl)
      .then(res => res.json()) // Henter data som JSON
      .then(data => {
        const movieContainer = document.getElementById('movie-container');
        movieContainer.innerHTML = ''; // Tømmer eksisterende film før opdatering
  
        if (data.results && data.results.length > 0) {
          // Vis de første 20 populære film
          data.results.slice(0, 20).forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            movieElement.innerHTML = `
              <img src="${imgUrl}${movie.poster_path}" alt="${movie.title}" />
              <div class="title-box"></div>
              <div class="name">${movie.title}</div>
            `;
            movieContainer.appendChild(movieElement); // Tilføj film til containeren
          });
        } else {
          movieContainer.innerHTML = '<p>No popular movies found.</p>'; // Hvis der ikke er fundet populære film
        }
      })
      .catch(err => console.error('Error fetching popular movies:', err)); // Håndtering af fejl
}

// Når dokumentet er færdigindlæst, hentes film og genre dropdown fyldes
document.addEventListener('DOMContentLoaded', () => {
    fetchPopularMovies(); // Hent populære film
    populateGenreDropdown(); // Fyld dropdown med genrer
});
