interface ICartItem {
  id: string
  price: number
  name: string
  picture: string
  descr: string
  amount: number
  dateAdded: number
}

interface ICartState {
  [ id: string ]: ICartItem
}

declare function ICartReducer (state: ICartState, data: { type: string, payload: ICartItem | ICartItem[] }): ICartState

interface ISortingTableColumnConfig {
  property: string,
  header: string,
  cell: (item: ICartItem, sortBy: string) => JSX.Element
}

interface IDispatchCb {
  (dispatch: (data) => void): Promise<void>
}

interface ICartProps {
  goods: ICartItem[]
  totalPrice: number
  addRandomGoods: () => IDispatchCb
  clearCart: () => IDispatchCb
  checkout: (goods: ICartItem[]) => IDispatchCb
  addToCart: (item: ICartItem) => IDispatchCb
  removeFromCart: (item: ICartItem) => IDispatchCb
}

interface IIntegerSelectorProps {
  onPlus: () => any,
  onMinus: () => any,
  value: number,
  disabled?: boolean
}

interface ISortingTableProps {
  defaultSortBy: string
  columns: ISortingTableColumnConfig[]
  list: any[]
}

interface ISortingTableState {
  sortBy: string
  sortDirection: string
}