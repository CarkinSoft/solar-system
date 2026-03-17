import express from 'express';
import axios from 'axios';
const planets = (await import('npm-solarsystem')).default;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

//routes
//root route
app.get('/', (req, res) => {
   res.render('home.ejs')
});

app.get('/planetInfo', (req, res) => {
   let planet = req.query.planet;
   let planetInfo = planets[`get${planet}`]();
   res.render('planet.ejs', {planetInfo, planet })
});

app.get('/nasapod', async (req, res) => {
   let API_KEY = 'DEMO_KEY';
   let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}` + '&date=2026-03-11';
   let response = await fetch(url);
   let data = await response.json();
   let nasaPOD = data.url;

   res.render('nasapod.ejs', {nasaPOD})
});

app.listen(3000, () => {
   console.log('server started');
});
