import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {cardInfo} from './mocks/offers';
import {reviews} from './mocks/reviews';

const Parameters = {
  numberOfPlaces: 300,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      numberOfPlaces = {Parameters.numberOfPlaces}
      cardInfo = {cardInfo}
      reviews = {reviews}
    />
  </React.StrictMode>,
  document.getElementById('root'));
