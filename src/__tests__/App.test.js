import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';

configure({adapter: new Adapter()});
let wrapper;
const handleChange = jest.fn();

  beforeEach(() => {
    wrapper = mount(<App />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });  

describe( 'App Tests', () => {

test('renders header', () => {
  const { getByText } = render(<App />);
  const tablify = getByText(/Tablify/i);
  expect(tablify).toBeInTheDocument();
});

//TODO
// test('changes state of disabled text input box', () => {
//   const event = {
//     target: { value: 'a new value' }
//   };
//   console.log(wrapper.debug());
//   wrapper.first('#outlined-multiline-static-code-box-false').simulate('change', event);
//    expect(handleChange).toHaveBeenCalledWith('a new value');
// });

});