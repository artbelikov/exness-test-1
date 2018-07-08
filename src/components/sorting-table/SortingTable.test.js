import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import { SortingTable } from './SortingTable.tsx'
const columnsMock = [
  {
    property: 'prop1',
    header: 'Prop1',
    cell: (item) => <span>{item.prop1}</span>
  },
  {
    property: 'prop2',
    header: 'Prop2',
    cell: (item) => <span>{item.prop2}</span>
  },
  {
    property: 'prop3',
    header: 'Prop3',
    cell: (item) => <span>{item.prop3}</span>
  }
]
const listMock = [
  {
    prop1: 10,
    prop2: 2,
    prop3: 'value3',
    stable: 1
  },
  {
    prop1: 44,
    prop2: 0,
    prop3: 'value6',
    stable: 2
  },
  {
    prop1: 3,
    prop2: 7,
    prop3: 'value9',
    stable: 3
  }
]

describe('>>>Sorting table component', () => {
  let columns
  let list
  let defaultSortBy = 'stable'
  let wrapper

  beforeEach(() => {
    columns = [...columnsMock]
    list = [...listMock]
    wrapper = shallow(<SortingTable columns={columns} list={list}/>)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('+++ render the component', () => {
    expect(wrapper.length).toEqual(1)
  })

  it('+++ has same rows number as provided', () => {
    expect(wrapper.find('tbody tr').length).toEqual(list.length)
  })

  it('+++ has same columns number as provided', () => {
    expect(wrapper.find('thead th').length).toEqual(columns.length)
  })

  it('+++ no stable sorting - every cell has provided value', () => {
    columns.forEach((column, i) => {
      list.forEach((row, j) => {
        let tr = wrapper.find('tbody tr').at(j)
        let td = tr.find('td').at(i)
        expect(td.text()).toEqual(row[column.property].toString())
      })
    })
  })

  it('+++ with stable sorting - sort by every column both directions', () => {
    wrapper = shallow(<SortingTable columns={columns} list={list} defaultSortBy={defaultSortBy}/>)
    columns.forEach((column, i) => {
      let th = wrapper.find('thead th').at(i)
      th.simulate('click')
      expect(wrapper.state().sortBy).toEqual(column.property)
      expect(wrapper.state().sortDirection).toEqual('desc')
      th.simulate('click')
      expect(wrapper.state().sortDirection).toEqual('asc')
    })
  })
})