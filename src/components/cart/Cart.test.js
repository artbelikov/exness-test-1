import React from 'react'
import Enzyme, { mount } from 'enzyme';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import Cart from './Cart.tsx'
import thunk from 'redux-thunk'
import {
  ADD_TO_CART,
  CLEAR_CART,
  FETCH_RANDOM_GOODS_START,
  REMOVE_FROM_CART,
  CHECKOUT
} from 'actions/action-types'
const initialState = {
  "cart": {
    "0d8fc19a-4b0d-4341-9594-6639825d8dec": {
      "id": "0d8fc19a-4b0d-4341-9594-6639825d8dec",
      "price": 4982,
      "name": "Dragbot",
      "amount": 1,
      "dateAdded": 1530367247549
    },
    "8de24ad5-9909-44f7-aba8-99a5097f0f37": {
      "id": "8de24ad5-9909-44f7-aba8-99a5097f0f37",
      "price": 1956,
      "name": "Ginkle",
      "amount": 3,
      "dateAdded": 1530367247549
    },
    "e6953890-4752-4dfb-8fe6-5ca9012a043a": {
      "id": "e6953890-4752-4dfb-8fe6-5ca9012a043a",
      "price": 2164,
      "name": "Neocent",
      "amount": 2,
      "dateAdded": 1530367247549
    }
  }
}

describe('>>>Cart component with store mock', () => {
  const mockStore = configureStore([thunk])
  describe('>>>Cart default state', () => {
    let store = mockStore(initialState)

    let root = mount(
      <Provider store={store}>
        <Cart/>
      </Provider>
    )
    let wrapper = root.children().children()

    it('+++ component mounted', () => {
      expect(wrapper.length).toEqual(1)
    });

    it('+++ goods list matches with initial state', () => {
      expect(wrapper.find('.sorting-table tbody tr').length).toEqual(Object.values(initialState.cart).length);
    });

    it('+++ shows cart title', () => {
      expect(wrapper.find('.cart-header h1').text()).toEqual('Your Shopping Cart');
    });

    it('+++ shows not empty cart', () => {
      expect(wrapper.find('.cart-body .sorting-table').html()).toBeTruthy()
    });

    it('+++ shows cart footer with 3 buttons', () => {
      expect(wrapper.find('.cart-footer button').length).toEqual(3)
    });

    it('+++ has columns config', () => {
      expect(wrapper.instance().columnsConfig).toBeTruthy()
    });

    root.unmount()
  })

  describe('>>>Cart empty state', () => {
    let store = mockStore({cart:{}})

    let root = mount(
      <Provider store={store}>
        <Cart/>
      </Provider>
    )
    let wrapper = root.children().children()

    it('+++ goods is empty', () => {
      expect(wrapper.props().goods).toEqual([]);
    });

    it('+++ shows empty cart message', () => {
      expect(wrapper.find('.cart-body .empty-cart-warn').exists()).toEqual(true);
    });

    it('+++ shows 1 button', () => {
      expect(wrapper.find('.cart-footer button').length).toEqual(1);
    });

    root.unmount()
  })

  describe('>>>Cart actions', () => {
    let store, wrapper, root

    beforeEach(() => {
      store = mockStore(initialState)
      root = mount(
        <Provider store={store}>
          <Cart/>
        </Provider>
      )
      wrapper = root.children().children()
    })

    afterEach(() => {
      root.unmount()
    })

    it('+++ adds 1 or more random goods', () => {
      wrapper.find('#add-random-button').simulate('click')
      let actions = store.getActions()
      expect(actions[0].type).toEqual(FETCH_RANDOM_GOODS_START)
    });

    it('+++ clears cart', () => {
      wrapper.find('#clear-cart-button').simulate('click')
      let actions = store.getActions()
      expect(actions[0].type).toEqual(CLEAR_CART)
    });

    it('+++ checkouts', () => {
      wrapper.find('#checkout-button').simulate('click')
      let actions = store.getActions()
      expect(actions[0].type).toEqual(CHECKOUT)
    });

    it('+++ removes 1 item', () => {
      wrapper.find('.sorting-table .integer-selector-minus').first().simulate('click')
      let actions = store.getActions()
      expect(actions[0].type).toEqual(REMOVE_FROM_CART)
    });

    it('+++ adds 1 item', () => {
      wrapper.find('.sorting-table .integer-selector-plus').first().simulate('click')
      let actions = store.getActions()
      expect(actions[0].type).toEqual(ADD_TO_CART)
    });
  })
})