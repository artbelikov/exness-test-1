import * as React from 'react'
import './style.scss'

const descOrder = 'desc';
const ascOrder = 'asc';
const defaultSortDirection = descOrder;

/**
 * Configurable table with stable sorting algorithm
 */
export class SortingTable extends React.Component<ISortingTableProps, ISortingTableState> {

  constructor (props) {
    super(props);
    this.state = {
      sortBy: props.defaultSortBy, // To enable stable sorting algorithm we have to specify default sort property
      sortDirection: defaultSortDirection
    }
  }

  render () {
    let { columns, list } = this.props;
    return (
      <table className="pure-table sorting-table">
        <thead>
        <tr>
          {columns.map((column, index) => {
            return (
              <th key={index} onClick={() => this.toggleSorting(column.property)}>
                <span>{column.header}</span>
                {this.state.sortBy === column.property &&
                <span className={'sort-direction-arrow sort-direction-arrow-' + this.state.sortDirection}>▼</span>}
              </th>
            )
          })}
        </tr>
        </thead>
        <tbody>
        {this.sort(list).map((item, index) => {
          return (
            <tr key={index}>
              {
                columns.map((column, index) => {
                  return (
                    <td key={index}>
                      {column.cell(item, this.state.sortBy) /*Calling cell template*/}
                    </td>
                  )
                })
              }
            </tr>
          )
        })}
        </tbody>
      </table>
    )
  }

  /**
   * Fires on column header click
   * @param {string} sortBy property to sort by
   */
  private toggleSorting (sortBy) {
    this.setState({
      sortBy,
      sortDirection: this.state.sortDirection === descOrder ? ascOrder : descOrder,
      ...this.state.sortBy !== sortBy && {
        sortDirection: defaultSortDirection
      }
    })
  }

  /**
   * The sorting algorithm
   * @param {Array} items
   * @returns {*}
   */
  private sort (items) {
    if (!this.state.sortBy) return items;
    const stableSorting = (prev, next) => {
      if (typeof prev[ this.state.sortBy ] === 'string') {
        return prev[ this.props.defaultSortBy ].localeCompare(next[ this.props.defaultSortBy ])
      } else {
        return prev[ this.props.defaultSortBy ] - next[ this.props.defaultSortBy ]
      }
    };
    return [ ...items ].sort((a, b) => {
      let prev = a;
      let next = b;
      if (this.state.sortDirection === descOrder) {
        prev = b;
        next = a
      }
      if (typeof prev[ this.state.sortBy ] === 'string') {
        return prev[ this.state.sortBy ].localeCompare(next[ this.state.sortBy ])
      } else {
        let result = prev[ this.state.sortBy ] - next[ this.state.sortBy ];
        // If there is no difference in values then we try sort items by default property, thus keeping them in original order
        return this.props.defaultSortBy ? (result || stableSorting(prev, next)) : result
      }
    })
  }
}
