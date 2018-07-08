import { ADD_TO_CART, CLEAR_CART, FETCH_RANDOM_GOODS_SUCCESS, REMOVE_FROM_CART } from 'actions/action-types'

const initialState = {}

export default (state = initialState, { type, payload }) => {
  let newState = { ...state }
  switch (type) {
    case ADD_TO_CART:
      newState[ payload.id ].amount += 1
      return newState
    case REMOVE_FROM_CART:
      if (newState[ payload.id ].amount > 1) {
        newState[ payload.id ].amount -= 1
      } else {
        delete newState[ payload.id ]
      }
      return newState
    case FETCH_RANDOM_GOODS_SUCCESS:
      payload.forEach(goods => {
        if (newState[ goods.id ]) {
          newState[ goods.id ].amount += 1
        } else {
          newState[ goods.id ] = goods
          newState[ goods.id ].amount = 1
          newState[ goods.id ].dateAdded = Date.now()
        }
      })
      return newState
    case CLEAR_CART:
      return {}
    default:
      return state
  }
}
