import each from 'lodash/each'

/**
 * Returns an array of goods added to cart
 * @param state
 * @returns {any[]}
 */
export const getAddedGoods = (state) => {
  return Object.values(state.cart)
}

/**
 * Returns total price of all goods added to cart
 * @param {Array} cart
 * @returns {number}
 */
export const countTotalPrice = ({ cart }) => {
  let result = 0
  each(cart, goods => {
    result += goods.price * goods.amount
  })
  return result
}
