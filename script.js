const API_KEY = 'ВАШ_TMDB_API_КЛЮЧ'; // Получи бесплатно на https://www.themoviedb.org/settings/api
const MOVIE_ID = 155; // Например, "Интерстеллар"

async function loadMovieDetails() {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}&language=ru-RU`);
  const data = await res.json();

  document.getElementById('movie-title').textContent = data.title;
  document.getElementById('movie-poster').src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  document.getElementById('movie-description').textContent = data.overview;
  document.getElementById('movie-year').textContent = data.release_date.slice(0, 4);
  document.getElementById('movie-rating').textContent = data.vote_average;

  // Жанры
  const genres = data.genres.map(g => g.name).join(', ');
  document.getElementById('movie-genre').textContent = genres;

  // Актёры и режиссёр
  const credits = await fetch(`https://api.themoviedb.org/3/movie/${MOVIE_ID}/credits?api_key=${API_KEY}&language=ru-RU`);
  const creditsData = await credits.json();

  const director = creditsData.crew.find(p => p.job === 'Director')?.name || 'Не указан';
  document.getElementById('movie-director').textContent = director;

  const cast = creditsData.cast.slice(0, 5).map(c => c.name).join(', ');
  document.getElementById('movie-cast').textContent = cast;

  // Трейлер с YouTube
  const videos = await fetch(`https://api.themoviedb.org/3/movie/${MOVIE_ID}/videos?api_key=${API_KEY}`);
  const videoData = await videos.json();
  const trailer = videoData.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
  if (trailer) {
    const trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
    document.getElementById('trailer').src = trailerUrl;
  }
}

loadMovieDetails();
