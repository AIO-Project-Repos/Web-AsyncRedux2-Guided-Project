import uuid from 'uuid';
import axios from 'axios';
import * as types from './actionTypes';

// STEP 7: CREATE ACTION CREATOR FUNCTIONS
// action creators can be shared across all components,
// and saves components from having to use props.dispatch explicitly
export function deleteQuote(id) {
  return {
    type: types.DELETE_QUOTE,
    payload: id,
  };
}

export function makeQuoteOfTheDay(id) {
  return {
    type: types.MAKE_QUOTE_OF_THE_DAY,
    payload: id,
  };
}

export function markApocryphal(id) {
  return {
    type: types.MARK_APOCRYPHAL,
    payload: id,
  };
}

export function addQuote(author, text) {
  return {
    type: types.ADD_QUOTE,
    payload: {
      author,
      text,
      id: uuid(),
      apocryphal: false,
    },
  };
}

export function addQuotes(quotes) {
  return {
    type: types.ADD_QUOTES,
    payload: quotes,
  };
}

// if you try to make an action creator like this
// without thunk... it won't work
export const fetchQuotes = () => dispatch => {
  // we code
  axios.get('http://localhost:3000/api/quotes')
    .then(res => {
      // what do you suggest?
      // dispatch({ type: types.ADD_QUOTES, payload: res.data }); // option 1
      dispatch(addQuotes(res.data)); // option 2
    })
    .catch(error => {
      console.log(error.message);
    });
};

export const removeQuote = (id) => dispatch => {
  axios.delete('http://localhost:3000/api/quotes/' + id)
    .then(res => {
      // dispatch(deleteQuote(res.data));
      dispatch(fetchQuotes());
    })
    .catch(error => {
      console.log(error.message);
    });
};

export const postNewQuote = (quote) => dispatch => {
  axios.post('http://localhost:3000/api/quotes', quote)
    .then(res => {
      dispatch(fetchQuotes());
    })
    .catch(error => {
      console.log(error.message);
    });
};
