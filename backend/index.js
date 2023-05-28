const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const tmdbApiKey = 'fe18cce4d03cc82286fd6baf4e1c067a';

app.get('/featured', async (req, res) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}`);
    const movies = response.data.results;
    const featuredMovie = movies[Math.floor(Math.random() * movies.length)];
    res.send(featuredMovie);
  } catch (error) {
    res.status(500).send('Erro ao obter filme em destaque.');
  }
});

app.get('/movies/:section', async (req, res) => {
  const section = req.params.section;

  let url;
  switch (section) {
    case 'top-rated':
      url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${tmdbApiKey}`;
      break;
    case 'now-playing':
      url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdbApiKey}`;
      break;
    default:
      res.status(400).send('Seção inválida.');
      return;
  }

  try {
    const response = await axios.get(url);
    res.send(response.data.results);
  } catch (error) {
    res.status(500).send('Erro ao obter filmes da seção.');
  }
});

// Detalhes de um filme específico com base no seu ID
app.get('/movies/:movieId', async (req, res) => {
  const movieId = req.params.movieId;
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbApiKey}`;

  try {
    const response = await axios.get(url);
    const movieDetails = response.data;
    res.send(movieDetails);
  } catch (error) {
    res.status(500).send('Erro ao obter detalhes do filme.');
  }
});


// Pesquisa de filmes com base em um termo fornecido pelo usuário
app.get('/search', async (req, res) => {
  const searchTerm = req.query.term; // Obtém o termo de pesquisa da query string
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${encodeURIComponent(searchTerm)}`;

  try {
    const response = await axios.get(url);
    const movies = response.data.results;
    res.send(movies);
  } catch (error) {
    res.status(500).send('Erro ao realizar a pesquisa de filmes.');
  }
});

// obter filmes de um gênero específico
app.get('/genres/:genreId/movies', async (req, res) => {
  const genreId = req.params.genreId;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&with_genres=${genreId}`;

  try {
    const response = await axios.get(url);
    const movies = response.data.results;
    res.send(movies);
  } catch (error) {
    res.status(500).send('Erro ao obter filmes do gênero específico.');
  }
});



app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
