import React from 'react';
import { render } from '@testing-library/react';
import OutputBox from '../Components/OutputBox';

describe( 'OutputBox Tests', () => {

test('renders text output box', () => {
  const { getByTestId } = render(<OutputBox />);
  const sut = getByTestId(/outlined-multiline-static-output-box/i);
  expect(sut).toBeInTheDocument();
});

});
