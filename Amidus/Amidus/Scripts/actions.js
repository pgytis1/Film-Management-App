import request from 'superagent';

export function fetchFilms(query, sortBy, page, dateFrom, dateTo, genre) {
    return function (dispatch) {
        request
        .get('/api/film')
        .query({
            query,
            sortBy,
            page,
            dateFrom,
            dateTo,
            genre
        })
        .end((err, res) => {
            dispatch({
                type: 'GET_FILMS',
                filmsResponseData: res.body
            });
        });
    };
}

export function updateFilm(film, query, sortBy, page, dateFrom, dateTo, genre) {
    return function (dispatch) {
        request
        .put('/api/film/updateMovie')
        .send(
            film 
        )
        .end((err, res) => {
            dispatch(fetchFilms(query, sortBy, page, dateFrom, dateTo, genre));
        });
    };
}

export function deleteFilm(id, query, sortBy, page, dateFrom, dateTo, genre) {
    return function (dispatch) {
        request
        .delete('/api/film/deleteMovie')
        .query({
            id
        })
        .end((err, res) => {
            dispatch(fetchFilms(query, sortBy, page, dateFrom, dateTo, genre));
        });
    };
}

export function removeActor(movieId, actorId, query, sortBy, page, dateFrom, dateTo, genre) {
    return function (dispatch) {
        request
        .delete('/api/film/removeMovieActor')
        .query({
            movieId,
            actorId
        })
        .end((err, res) => {
            dispatch(fetchFilms(query, sortBy, page, dateFrom, dateTo, genre));
        });
    };
}

export function updateActor(id, fullName, query, sortBy, page, dateFrom, dateTo, genre) {
    return function (dispatch) {
        request
        .put('/api/actor/updateactor')
        .send({
            id,
            fullName
        })
        .end((err, res) => {
            dispatch(fetchFilms(query, sortBy, page, dateFrom, dateTo, genre));
        });
    };
}

export function postMovie(title, date, genre, ids, query, sortBy, page, dateFrom, dateTo, genreForDispatch) {
    return function (dispatch) {
        request
        .post('/api/film/postMovie')
        .send({
            title,
            PublishDate: date,
            genre,
            ActorsIds: ids
        })
        .end((err, res) => {
            dispatch(fetchFilms(query, sortBy, page, dateFrom, dateTo, genreForDispatch));
        });
    };
}

export function getAllActors(query) {
    return function (dispatch) {
        request
        .get('/api/actor')
        .query({
            query
        })
        .end((err, res) => {
            dispatch({
                type: 'GET_ACTORS',
                actors: res.body
            });
        });
    };
}

export function addFilmActors(filmId, ids, query, sortBy, page, dateFrom, dateTo, genre) {
    return function (dispatch) {
        request
        .post('/api/film/AddFilmActors')
        .send({
            filmId,
            ActorsIds: ids
        })
        .end((err, res) => {
            dispatch(fetchFilms(query, sortBy, page, dateFrom, dateTo, genre));
        });
    };
}

export function getGenres() {
    return function (dispatch) {
        request
        .get('/api/film/getGenres')
        .end((err, res) => {
            dispatch({
                type: 'GET_GENRES',
                genres: res.body
            });
        });
    };
}

export function postActor(name) {
    return function (dispatch) {
        request
        .post('/api/actor/postActor')
        .query({
            name
        })
        .end((err, res) => {
        });
    };
}

export function deleteActor(actorId, actorSearchQuery, query, sortBy, page, dateFrom, dateTo, genre) {
    return function (dispatch) {
        request
        .delete('/api/actor')
        .query({
            id : actorId
        })
        .end((err, res) => {
            dispatch(getAllActors(actorSearchQuery));
            dispatch(fetchFilms(query, sortBy, page, dateFrom, dateTo, genre));
        });
    };
}