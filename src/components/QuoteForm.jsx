import React from 'react';
import { connect } from 'react-redux';
import { func, number } from 'prop-types';
import { postNewQuote } from '../state/actionCreators';


export class QuoteForm extends React.Component {
  authorRef = React.createRef()

  textRef = React.createRef()

  onAddQuote = () => {
    this.props.postNewQuote({
      author: this.authorRef.current.value,
      text: this.textRef.current.value,
    });
    this.authorRef.current.value = '';
    this.textRef.current.value = '';
  }

  render() {
    return (
      <div>
        <h3>You have {this.props.numberOfQuotes || '0'}. Add New Quote!</h3>
        <div>
          <em>Author: </em>
          <input ref={this.authorRef} type="text" />
        </div>
        <div>
          <em>Text: </em>
          <input ref={this.textRef} type="text" />
        </div>
        <div>
          <button onClick={this.onAddQuote}>Add Quote</button>
        </div>
      </div>
    );
  }
}

QuoteForm.propTypes = {
  postNewQuote: func.isRequired,
  numberOfQuotes: number.isRequired,
};

function mapStateToProps(state) {
  return {
    numberOfQuotes: state.quotes.length,
  };
}

export default connect(mapStateToProps, { postNewQuote })(QuoteForm);
