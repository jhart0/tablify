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

  beforeEach(() => {
    wrapper = shallow(<CodeBox />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });  
  
describe( 'CodeBox Tests', () => {

test('renders text input box', () => {
  const { getByTestId } = render(<CodeBox />);
  const sut = getByTestId(/outlined-multiline-static-code-box/i);
  expect(sut).toBeInTheDocument();
});

test('changes state of text input box', () => {
  wrapper.find('#outlined-multiline-static-code-box').props().onChange('a new value');
   expect(setState).toHaveBeenCalledWith('a new value');
});

});