import React from 'react'
import Cart from 'components/cart/Cart.tsx'

/**
 * Just a basic layout
 * @returns {*}
 * @constructor
 */
export const Layout = () => (
  <div className="pure-g">
    <div className="pure-u-1-5"/>
    <div className="pure-u-3-5">
      <Cart/>
    </div>
    <div className="pure-u-1-5"/>
  </div>
)
