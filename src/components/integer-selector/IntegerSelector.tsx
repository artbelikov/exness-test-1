import * as React from 'react'
import './style.scss'

/**
 * The "- 0 +" component.
 * @param {Function} onPlus callback for "plus" button
 * @param {Function} onMinus callback for "minus" button
 * @param {number} value
 * @param {boolean} disabled hides buttons
 * @returns {*}
 * @constructor
 */
export const IntegerSelector: React.SFC<IIntegerSelectorProps> = ({
                        onPlus,
                        onMinus,
                        value,
                        disabled
                      }) => {
  let isDisabled = disabled || typeof onMinus !== 'function' || typeof onPlus !== 'function';
  return (
    <div className={'integer-selector ' + (isDisabled ? 'disabled' : '')}>
      <button className="integer-selector-minus" onClick={onMinus}/>
      <span className="integer-selector-value">
        {value}
      </span>
      <button className="integer-selector-plus" onClick={onPlus}/>
    </div>
  )
};