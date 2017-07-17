import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducer';
import Main from './components/Main';

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunkMiddleware),
    )
);

ReactDOM.render(
     <Provider store={store}>
        <Main/>
    </Provider>,
    document.getElementById('app')
);
