import React from 'react'
import { render } from '@testing-library/react'
import App from '../App'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
let wrapper
const setClass = jest.fn()
const setTable = jest.fn()
const useStateSpy = jest.spyOn(React, 'useState')
useStateSpy.mockImplementation((init) => [init, setClass, setTable])

beforeEach(() => {
  wrapper = shallow<App>(<App />)
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('App Tests', () => {
  test('renders header', () => {
    const { getByText } = render(<App />)
    const tablify = getByText(/Tablify/i)
    expect(tablify).toBeInTheDocument()
  })

  test('changes state of model to table', () => {
    const event = 'public class foo\n{ public int bar {get;set;}\n}'
    wrapper.find('[data-testid="input-box"]').prop('updateOutput')(event)
    expect(setClass).toHaveBeenCalledWith('create table foo\n(\n\tbar int\n)')
  })

  test('changes state of disabled text input box', () => {
    const event = 'create table foo\n(\nbar int\n)'
    wrapper.find('[data-testid="output-box"]').prop('updateOutput')(event)
    expect(setClass).toHaveBeenCalledWith('create table foo\n(\nbar int\n)')
  })
})
