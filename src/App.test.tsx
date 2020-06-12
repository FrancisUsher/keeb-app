import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it('asks people to help improve', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/improve keeb.app/i);
  expect(linkElement).toBeInTheDocument();
});
