import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Parameters = {
  numberOfPlaces: 300,
};

const CardProperties = [
  {
    id: Math.random(),
  },
  {
    id: Math.random(),
  },
  {
    id: Math.random(),
  },
  {
    id: Math.random(),
  },
  {
    id: Math.random(),
  },
];

ReactDOM.render(
  <React.StrictMode>
    <App
      numberOfPlaces = {Parameters.numberOfPlaces}
      CardProperties = {CardProperties}
    />
  </React.StrictMode>,
  document.getElementById('root'));
