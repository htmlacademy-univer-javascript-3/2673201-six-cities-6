import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {offers} from './mocks/offers.ts';
import {reviews} from './mocks/reviews.ts';

const Settings = {
  offerCardCount: 4,

} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offerCardCount = {Settings.offerCardCount}
      offers={offers}
      reviews={reviews}
    />
  </React.StrictMode>,
);
