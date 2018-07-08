import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import { IntegerSelector } from './IntegerSelector.tsx'

describe('>>>Integer selector component', () => {
  let wrapper
  let value
  let onMinus
  let onPlus

  beforeEach(() => {
    onMinus = jest.fn()
    onPlus = jest.fn()
    value = Math.round(Math.random() * 100)
    wrapper = shallow(<IntegerSelector value={value} onMinus={onMinus} onPlus={onPlus}/>)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('+++ render the component', () => {
    expect(wrapper.length).toEqual(1)
  })

  it('+++ contains "-" button', () => {
    expect(wrapper.find('button.integer-selector-minus').type()).toEqual('button')
  })

  it('+++ contains "+" button', () => {
    expect(wrapper.find('button.integer-selector-plus').type()).toEqual('button')
  })

  it('+++ contains value span', () => {
    expect(wrapper.find('.integer-selector-value').text()).toBe(value.toString())
  })

  it('+++ clicking "-" button fires a function', () => {
    let button = wrapper.find('button.integer-selector-minus')
    button.simulate('click')
    expect(onMinus).toHaveBeenCalled()
  })

  it('+++ clicking "+" button fires a function', () => {
    let button = wrapper.find('button.integer-selector-plus')
    button.simulate('click')
    expect(onPlus).toHaveBeenCalled()
  })

  it('+++ can be disabled manually', () => {
    wrapper = shallow(<IntegerSelector value={value} onMinus={onMinus} onPlus={onPlus} disabled={true}/>)
    expect(wrapper.find('.integer-selector').hasClass('disabled')).toBe(true)
  })

  it('+++ should be disabled cause of incorrect props', () => {
    let notACb = 'yum'
    wrapper = shallow(<IntegerSelector value={value} onMinus={notACb} onPlus={onPlus}/>)
    expect(wrapper.find('.integer-selector').hasClass('disabled')).toBe(true)
  })
})