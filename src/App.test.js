import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('app', () => {

  let rendered;

  beforeEach(() => {
    rendered = render(<App />);
  });

  it('allows toggling naviation', () => {
    const { getByText } = rendered;
    const toggle = getByText(/Toggle navigation/i);
    expect(toggle).toBeInTheDocument();
  });

});
