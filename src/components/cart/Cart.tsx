import * as React from 'react'
import * as isEmpty from 'lodash/isEmpty'
import './style.scss'
import { connect } from 'react-redux'
import { countTotalPrice, getAddedGoods } from 'selectors'
import { addRandomGoods, addToCart, checkout, clearCart, removeFromCart } from 'actions'
import { IntegerSelector } from 'components/integer-selector/IntegerSelector'
import { SortingTable } from 'components/sorting-table/SortingTable'

/**
 * The Cart component.
 */
class Cart extends React.Component<ICartProps, ICartState> {
  private readonly columnsConfig: ISortingTableColumnConfig[];

  constructor (props: ICartProps) {
    super(props);
    let { addToCart, removeFromCart } = props;
    /**
     * Config for table of goods
     * property {string} property of list item to get value from
     * header {string} column header
     * cell {Function} table cell template
     * @type {*[]}
     */
    this.columnsConfig = [
      {
        property: 'name',
        header: 'Header',
        cell: (item) => <span>{item.name}</span>
      },
      {
        property: 'price',
        header: 'Price',
        cell: (item) => <span>{item.price}<span role="img" aria-label="">🐦</span></span>
      },
      {
        property: 'amount',
        header: 'Amount',
        cell: (item, sortBy) => {
          return (
            <IntegerSelector value={item.amount}
                             onPlus={() => addToCart(item)}
                             onMinus={() => removeFromCart(item)}
                             disabled={sortBy === 'amount'}/>
          )
        }
      }
    ]
  }

  render () {
    let { goods, addRandomGoods, clearCart, checkout } = this.props;
    let isCartEmpty = isEmpty(goods);
    return (
      <div id="cart">
        <div className="cart-header">
          <h1>Your Shopping Cart</h1>
        </div>
        <div className="cart-body">
          {isCartEmpty ? Cart.renderEmptyCart() : this.renderAddedGoods(goods)}
        </div>
        <div className="cart-footer">
          <div className="pure-g">
            <div className="pure-u-1-3">
              <button id="add-random-button" className="pure-button" onClick={addRandomGoods}>Add random goods</button>
            </div>
            <div className="pure-u-1-3">
              {!isCartEmpty && (
                <button id="clear-cart-button" className="pure-button" onClick={clearCart}>Clear cart</button>)}
            </div>
            <div className="pure-u-1-3">
              {!isCartEmpty && (
                <button id="checkout-button" className="pure-button" onClick={() => checkout(goods)}>Checkout</button>)}
            </div>
          </div>
        </div>
      </div>
    )
  }

  /**
   * Draws table of added goods if any exist
   * @param {Array} goods
   * @returns {*}
   */
  private renderAddedGoods (goods) {
    return (
      <div>
        <SortingTable columns={this.columnsConfig} list={goods} defaultSortBy="dateAdded"/>
        <div className="cart-total-price">
          <span>Total: {this.props.totalPrice}</span><span role="img" aria-label="">🐦</span>
        </div>
      </div>
    )
  }

  /**
   * Draws message about empty cart
   * @returns {*}
   */
  private static renderEmptyCart () {
    return (
      <div className="empty-cart-warn">
        <p>
          Cart is empty. Add something!
        </p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    goods: getAddedGoods(state),
    totalPrice: countTotalPrice(state)
  }
};

const mapDispatchToProps = {
  addRandomGoods,
  clearCart,
  checkout,
  addToCart,
  removeFromCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart)