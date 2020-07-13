import React from 'react';
import { render } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import CodeBox from '../Components/CodeBox';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});
let wrapperDisabled, wrapperEnabled;
const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation((init) => [init, setState]);

  const handleChange = (val) => {
  }

  beforeEach(() => {
    wrapperDisabled = shallow(<CodeBox updateOutput={handleChange} output={''} disabled={true}/>);
    wrapperEnabled = shallow(<CodeBox updateOutput={null} output={''} disabled={false}/>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });  
  
describe( 'CodeBox Tests', () => {

test('renders text input box', () => {
  const { getByTestId } = render(<CodeBox updateOutput={handleChange} output={''} disabled={false}/>);
  const sut = getByTestId(/outlined-multiline-static-code-boxfalse/i);
  expect(sut).toBeInTheDocument();
});

test('changes state of disabled text input box', () => {
  const event = {
    target: { value: 'a new value' }
  };
  wrapperDisabled.find('#outlined-multiline-static-code-box-true').simulate('change', event);
   expect(setState).toHaveBeenCalledWith('a new value');
});

test('changes state of enabled text input box', () => {
  const event = {
    target: { value: 'a new value' }
  };
  wrapperEnabled.find('#outlined-multiline-static-code-box-false').simulate('change', event);
   expect(setState).toHaveBeenCalledTimes(0);
});

});