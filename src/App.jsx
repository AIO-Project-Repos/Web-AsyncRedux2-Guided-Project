import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Container from './components/Container';
import { quotesReducer, quoteOfTheDayReducer } from './state/reducers';

// STEP 1: FIGURE OUT THE STATE THE APP NEEDS! { quotes, quoteOfTheDay }
// The less state the better. Avoid redundant slices, like slices
// that could be computed from other slices!

// STEP 4: COMBINE REDUCERS
// use combineReducers to create a root reducer off of our reducers
const combinedReducer = combineReducers({
  quotes: quotesReducer,
  quoteOfTheDay: quoteOfTheDayReducer,
});

// STEP 5: CREATE THE REDUX STORE
const store = createStore(
  combinedReducer,
  {},
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

// STEP 6: USE THE PROVIDER TO WRAP THE APP PASSING THE STORE AS PROP
ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.querySelector('#target'),
);
