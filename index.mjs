import express from 'express';
import axios from 'axios';
const planets = (await import('npm-solarsystem')).default;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

const randomImages = [
   'https://cdn.britannica.com/93/95393-050-5329EE11/planets-distance-order-Sun.jpg',
    'https://www.funkidslive.com/wp-content/uploads/2022/01/solar-system-5611038_1280.png',
    'https://www.sciencenews.org/wp-content/uploads/sites/2/2022/11/Hubble-Pillars-of-Creation.jpg',
    'https://scienceline.org/wp-content/uploads/2023/10/53136787799_6b957e0a19_k.jpg',
    'https://images.photowall.com/products/48217/space-odyssey.jpg?h=699&q=85',
    'https://images.photowall.com/products/56982/planets-in-space.jpg?h=699&q=85',
    'https://images.photowall.com/products/56845/outer-space-3.jpg?h=699&q=85',
    'https://www.momjunction.com/wp-content/uploads/2020/10/Intriguing-And-Fun-Facts-About-Space-For-Kids1.jpg.webp'
];

function getRandomImage() {
   return randomImages[Math.floor(Math.random() * randomImages.length)];
}

//routes
//root route
app.get('/', (req, res) => {
   res.render('home.ejs', { randomImage: getRandomImage() });
});

app.get('/planetInfo', (req, res) => {
   let planet = req.query.planet;
   let planetInfo = planets[`get${planet}`]();
   res.render('planet.ejs', {planetInfo, planet });
});

app.get('/asteroids', (req, res) => {
   let asteroidInfo = planets.getAsteroids();
   res.render('planet.ejs', { planetInfo: asteroidInfo, planet: "Asteroids" });
});

app.get('/comets', (req, res) => {
   let cometInfo = planets.getComets();
   res.render('planet.ejs', { planetInfo: cometInfo, planet: "Comets" });
});

app.get('/nasapod', async (req, res) => {
   let API_KEY = 'DEMO_KEY';
   let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
   let response = await fetch(url);
   let data = await response.json();
   let nasaPOD = data.url;

   res.render('nasapod.ejs', {nasaPOD});
});

app.listen(3000, () => {
   console.log('server started');
});
