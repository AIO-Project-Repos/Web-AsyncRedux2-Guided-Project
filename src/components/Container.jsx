import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Quotes from './Quotes';
import QuoteForm from './QuoteForm';
import Spinner from './Spinner';
import Login from './Login';

const StyledContainer = styled.div`
  padding: 10px;
`;

export default function Container() {
  return (
    <StyledContainer>
      <Spinner>
        <BrowserRouter>
          <Route exact path='/' render={() => {
            if (localStorage.getItem('token')) {
              return (
                <>
                  <Quotes />
                  <QuoteForm />
                </>
              );
            }
            return <Redirect to='/login' />;
          }} />
          <Route path='/login' component={Login} />
        </BrowserRouter>
      </Spinner>
    </StyledContainer>
  );
}
