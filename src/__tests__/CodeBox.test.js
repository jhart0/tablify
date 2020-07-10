import React from 'react';
import { render } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import CodeBox from '../Components/CodeBox';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});
let wrapper;
const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation((init) => [init, setState]);

  const handleChange = (val) => {
  }

  beforeEach(() => {
    wrapper = shallow(<CodeBox updateOutput={handleChange}/>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });  
  
describe( 'CodeBox Tests', () => {

test('renders text input box', () => {
  const { getByTestId } = render(<CodeBox updateOutput={handleChange}/>);
  const sut = getByTestId(/outlined-multiline-static-code-box/i);
  expect(sut).toBeInTheDocument();
});

test('changes state of text input box', () => {
  const event = {
    target: { value: 'a new value' }
  };
  wrapper.find('#outlined-multiline-static-code-box').simulate('change', event);
   expect(setState).toHaveBeenCalledWith('a new value');
});

});