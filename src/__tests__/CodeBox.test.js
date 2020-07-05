import React from 'react';
import { render } from '@testing-library/react';
import CodeBox from '../Components/CodeBox';

test('renders text input box', () => {
  const { getByTestId } = render(<CodeBox />);
  const sut = getByTestId(/outlined-multiline-static-code-box/i);
  expect(sut).toBeInTheDocument();
});
