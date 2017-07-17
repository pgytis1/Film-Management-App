const defaultState = {
    films: [],
    pagingInfo: {},
    actors:[],
    genres: [],
    hasMore: false,
};

export default function Store(state = defaultState, action) {
    switch (action.type) {
        case 'GET_FILMS':
             return Object.assign({}, state, {
                                              films: action.filmsResponseData.allFilms,
                                              pagingInfo: action.filmsResponseData.pagingInfo
                                             });
        case 'GET_PAGING_INFO':
             return Object.assign({}, state, { pagingInfo: action.pagingInfo});
        case 'GET_ACTORS':{      
             return Object.assign({}, state, {
                  actors: action.actors
                });
        }
        case 'GET_GENRES':
             return Object.assign({}, state, { genres: action.genres});
    default:
        return state;
    }
}
