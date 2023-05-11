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

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
