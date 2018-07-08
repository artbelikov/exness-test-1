import {
  ADD_TO_CART,
  CLEAR_CART,
  FETCH_RANDOM_GOODS_FAILURE,
  FETCH_RANDOM_GOODS_START,
  FETCH_RANDOM_GOODS_SUCCESS,
  REMOVE_FROM_CART,
  CHECKOUT
} from 'actions/action-types'
import { fetchRandomGoods } from 'api'

/**
 * Action to clear all goods from cart
 * @returns {Function}
 */
export const clearCart = () => dispatch => {
  dispatch({
    type: CLEAR_CART
  })
}

/**
 * Action to get random amount of random goods
 * @returns {Function}
 */
export const addRandomGoods = () => async dispatch => {
  dispatch({ type: FETCH_RANDOM_GOODS_START })
  const {res: goods, err} = await fetchRandomGoods({ amount: Math.ceil(Math.random() * 5) })

  goods && dispatch({
    type: FETCH_RANDOM_GOODS_SUCCESS,
    payload: goods
  })

  err && dispatch({
    type: FETCH_RANDOM_GOODS_FAILURE,
    payload: err,
    error: true
  })
}

/**
 * Action to serialize cart data and alert the result
 * @param {Array} goods
 * @returns {Function}
 */
export const checkout = goods => dispatch => {
  alert(JSON.stringify(goods))
  dispatch({
    type: CHECKOUT
  })
}

/**
 * Action to add one item to cart
 * @param {Object} item
 * @returns {Function}
 */
export const addToCart = (item) => dispatch => {
  dispatch({
    type: ADD_TO_CART,
    payload: item
  })
}

/**
 * Action to remove one item out of cart
 * @param {Object} item
 * @returns {Function}
 */
export const removeFromCart = (item) => dispatch => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: item
  })
}