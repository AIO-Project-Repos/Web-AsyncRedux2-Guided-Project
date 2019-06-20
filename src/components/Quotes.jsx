import React from 'react';
import { connect } from 'react-redux';
import { shape, string, arrayOf, func, bool } from 'prop-types';
import Quote from './Quote';
// STEP 8: HERE ARE THE NEEDED ACTION CREATORS
import * as actionCreators from '../state/actionCreators';


export class Quotes extends React.Component {
  componentDidMount() {
    this.props.fetchQuotes();
  }

  render() {
    const quotes = this.props.quotes || [];

    return (
      <div>
        <h3>My Favorite Quotes</h3>
        <div>
          {
            quotes.map(quote => (
              <Quote
                key={quote.id}

                // STEP 11: WE GET THE SLICES OF STATE FROM PROPS
                quote={quote}
                isQuoteOfTheDay={this.props.quoteOfTheDay === quote.id}

                // STEP 13: WE GET THE ACTION CREATORS FROM PROPS
                makeQuoteOfTheDay={this.props.makeQuoteOfTheDay}
                markApocryphal={this.props.markApocryphal}
                deleteQuote={this.props.removeQuote}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

Quotes.propTypes = {
  // data from state:
  quotes: arrayOf(shape({
    id: string.isRequired,
    author: string.isRequired,
    text: string.isRequired,
    apocryphal: bool.isRequired,
  })).isRequired,
  quoteOfTheDay: string,
  // functions that change state:
  makeQuoteOfTheDay: func,
  markApocryphal: func,
  removeQuote: func,
};

function mapStateToProps(state) {
  // STEP 9: FLESH OUT
  return {
    quotes: state.quotes,
    quoteOfTheDay: state.quoteOfTheDay,
  };
}

export default connect(
  // STEP 10: CONNECT THE COMPONENT PASSING MAP STATE TO PROPS AS 1ST ARG
  mapStateToProps,
  // STEP 12: INJECT THE ACTION CREATORS AS 2ND ARG TO CONNECT
  actionCreators,
)(Quotes);
