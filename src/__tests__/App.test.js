import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

describe( 'App Tests', () => {

test('renders header', () => {
  const { getByText } = render(<App />);
  const tablify = getByText(/Tablify/i);
  expect(tablify).toBeInTheDocument();
});

});