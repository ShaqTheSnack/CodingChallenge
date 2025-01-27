// Konfigurationsvariabler til API og base URL
const apiKey = 'd2b1c1d6b45a2d09c8902c95a0b2a3bb'; // API-nøgle til at hente data fra TMDB
const baseUrl = 'https://api.themoviedb.org/3/'; // Base URL for API-anmodninger
const popularApiUrl = `${baseUrl}discover/movie?sort_by=popularity.desc&api_key=${apiKey}`; // URL til at hente populære film
const imgUrl = 'https://image.tmdb.org/t/p/w500'; // Basis URL for at vise billeder i passende størrelse
let abc = 5; // Eksempel på en variabel, men ikke i brug i denne kode

// Liste over filmgenrer med ID'er og navne
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

let pageNumber = 1; // Startside for filmhentning

// Tjekker om vi er på en genre-specifik side
if (window.location.pathname.includes("genre.html")) {
  
  // Henter genreId fra URL'en
  const urlParams = new URLSearchParams(window.location.search);
  const genreId = urlParams.get('genreId'); 
  
  // Hvis genreId findes i URL'en, hent film for den genre
  if (genreId) {
    fetchMoviesByGenre(genreId);
  } else {
    console.log('No genre ID found in the URL');
  }

  // Funktion til at hente film for en specifik genre
  function fetchMoviesByGenre(genreId) {
    const apiUrlByGenre = `${baseUrl}discover/movie?with_genres=${genreId}&sort_by=popularity.desc&api_key=${apiKey}&page=${pageNumber}`;
    console.log(`Fetching movies for genre ID: ${genreId}`);

    // Henter data fra API'en
    fetch(apiUrlByGenre)
      .then(res => res.json())
      .then(data => {
        const movieContainer = document.getElementById('movie-container');
        movieContainer.innerHTML = ''; // Rydder eksisterende film i containeren

        // Tjekker om der er film i data og viser dem
        if (data.results && data.results.length > 0) {
          data.results.slice(0, 20).forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            movieElement.innerHTML = `
              <img src="${imgUrl}${movie.poster_path}" alt="${movie.title}" />
              <button class="btn-dark">More</button>
              <a href="pickedMovie.html" class="btn-dark">More</a>
              <div class="title-box"></div>
              <div class="name">${movie.title}</div>
            `;
            movieContainer.appendChild(movieElement); // Tilføjer film til containeren
          });
        } else {
          movieContainer.innerHTML = '<p>No movies found for this genre.</p>'; // Hvis ingen film findes
        }
      })
      .catch(err => console.error('Error fetching movies by genre:', err)); // Fejl ved hentning
  }
}

// Funktion til at fylde dropdown-menuen med genrer
function populateGenreDropdown() {
  const genreDropdown = document.getElementById('genreDropdown');

  // Opretter menu-elementer for hver genre
  genres.forEach(genre => {
    const genreItem = document.createElement('li');
    const genreLink = document.createElement('a');
    genreLink.classList.add('dropdown-item');
    genreLink.href = `genre.html?genreId=${genre.id}`; 
    genreLink.innerText = genre.name;

    genreItem.appendChild(genreLink);
    genreDropdown.appendChild(genreItem); // Tilføjer genre til dropdown-menuen
  });
}

// Navigationsfunktion for at skifte sider
const nextButton = document.getElementById('next-button');
const previousButton = document.getElementById('previous-button');

function navigatePage(change) {
  const urlParams = new URLSearchParams(window.location.search);
  const genreId = urlParams.get('genreId');
  
  // Tjekker om genreId findes i URL'en
  if (!genreId) {
    console.log('No genre ID found in the URL. Cannot navigate pages.');
    return;
  }

  pageNumber += change; // Ændrer sidetal
  if (pageNumber < 1) {
    pageNumber = 1; // Sikrer at sidetallet ikke bliver under 1
  }

  console.log(`Navigating to page: ${pageNumber}`);
  fetchMoviesByGenre(genreId); // Henter film for den aktuelle genre og side
}

// Lytter til klik på næste og forrige knapper
nextButton?.addEventListener('click', () => navigatePage(1));
previousButton?.addEventListener('click', () => navigatePage(-1));

// Fylder dropdown med genrer, når siden er loadet
document.addEventListener('DOMContentLoaded', () => {
  populateGenreDropdown();
});
