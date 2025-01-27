// API-nøgle og grundlæggende URL for TMDb API
const apiKey = 'd2b1c1d6b45a2d09c8902c95a0b2a3bb';
const baseUrl = 'https://api.themoviedb.org/3/';
const popularApiUrl = `${baseUrl}discover/movie?sort_by=popularity.desc&api_key=${apiKey}`;
// URL til at hente filmbilleder
const imgUrl = 'https://image.tmdb.org/t/p/w500';

// Liste over filmgenrer med tilhørende ID'er
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

// Funktion til at fylde dropdown-menuen med genrer
function populateGenreDropdown() {
    const genreDropdown = document.getElementById('genreDropdown');
  
    // Gennemgår genrerne og opretter et listeelement for hver
    genres.forEach(genre => {
      const genreItem = document.createElement('li');
      const genreLink = document.createElement('a');
      genreLink.classList.add('dropdown-item');
      // Hver genre får et link, der sender brugeren til en genre-specifik side
      genreLink.href = `genre.html?genreId=${genre.id}`; 
      genreLink.innerText = genre.name;
  
      genreItem.appendChild(genreLink);
      genreDropdown.appendChild(genreItem);
    });
}

// Når DOM'en er færdigindlæst, fyldes dropdown-menuen
document.addEventListener('DOMContentLoaded', () => {
    populateGenreDropdown();
});
