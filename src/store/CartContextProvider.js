import { useReducer } from "react"
import CartContext from "./cart-context"

const defaultCartState = {
  items: [],
  totalAmount: 0,
}

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.quantity

    const existingItemIndex = state.items.findIndex(
      (i) => i.id === action.item.id
    )
    const existingItem = state.items[existingItemIndex]

    let updatedItems = []

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + action.item.quantity,
      }

      updatedItems = [...state.items]
      updatedItems[existingItemIndex] = updatedItem
    } else {
      updatedItems = [...state.items, action.item]
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }
  }

  if (action.type === "REMOVE") {
    const existingItemIndex = state.items.findIndex((i) => i.id === action.id)
    const existingItem = state.items[existingItemIndex]

    const updatedTotalAmount = state.totalAmount - existingItem.price

    let updatedItems = []

    if (existingItem.quantity === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id)
    } else {
      updatedItems = state.items
      existingItem.quantity--
      updatedItems[existingItemIndex] = existingItem
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }
  }

  if (action.type === "CLEAR") {
    return defaultCartState
  }

  return defaultCartState
}

const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  )

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item })
  }

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id })
  }

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
