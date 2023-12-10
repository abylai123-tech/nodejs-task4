const express = require('express');
const app = express();
app.use(express.json());

let movies = [];

const middleware = (req, res, next) => {
    let index = Number(req.params.index);

    if (index < 0 || index >= movies.length) {
        response.statusCode = 404;
        response.end('Фильм с таким индексом не найден');
    }
    next();
};

app.post('/movies', (req, res) => {
    let movie = req.body;
    movies.push(movie);
    response.statusCode = 200;
});

app.get('/movies', (req, res) => {
    let { name, year } = req.query;
    let filteredMovies = movies.filter(movie => {
        if (name) {
            return movie.name.includes(name);
        }
        if (year) {
            return movie.year === parseInt(year);
        }
        return true;
    });
    res.send(filteredMovies);
});

app.get('/movies/:index', middleware, (req, res) => {
    let index = Number(req.params.index);
    let movie = movies[index];
    res.send(movie);
});

app.get('/directors', (req, res) => {
    let directors = movies
        .map(movie => movie.director)
        .filter((director, i, arr) => arr.indexOf(director) === i);

    res.send(directors);
});

app.delete('/movies/:index', middleware, (req, res) => {
    let index = Number(req.params.index);
    movies.splice(index, 1);
    response.statusCode = 200;
});

app.delete('/movies', (req, res) => {
    let year = Number(req.query.year);
    movies = movies.filter(movie => movie.year !== year);
    response.statusCode = 200;
});
app.listen(3000);