import goods from './mockGoods'
import shuffle from 'lodash/shuffle'
import take from 'lodash/take'

/**
 * Imitates request for random goods with given amount
 * @param {number} amount
 * @returns {Promise}
 */
export const fetchRandomGoods = ({ amount }) => {
  return new Promise((resolve) => {
    let randomOrder = shuffle(goods)
    resolve(take(randomOrder, amount))
  }).then(data => ({ res: data }))
    .catch(err => ({ err }))
}
