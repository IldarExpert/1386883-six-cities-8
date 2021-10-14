import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {cardInfo} from './mocks/offers';

const Parameters = {
  numberOfPlaces: 300,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      numberOfPlaces = {Parameters.numberOfPlaces}
      cardInfo = {cardInfo}
    />
  </React.StrictMode>,
  document.getElementById('root'));
