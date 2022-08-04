import { useContext, useState } from "react"
import classes from "./Cart.module.css"

import CartContext from "../../store/cart-context"
import Modal from "../UI/Modal/Modal"
import CartItem from "./CartItem/CartItem"
import Checkout from "../Checkout/Checkout"

const Cart = (props) => {
  const cartCtx = useContext(CartContext)
  const [isCheckout, setIsCheckout] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
  const hasItems = cartCtx.items.length > 0

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  }

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item)
  }

  const orderHandler = () => {
    setIsCheckout(true)
  }

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true)
    const response = await fetch(
      "https://learn-react-http-c8969-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    )
    setIsSubmitting(false)
    setDidSubmit(true)
    cartCtx.clearCart()
  }

  const formActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  )

  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.quantity}
      price={item.price}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
    />
  ))

  const modalContent = (
    <>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onCancel={props.onHideCart}
          onCheckoutConfirm={submitOrderHandler}
        />
      )}
      {!isCheckout && formActions}
    </>
  )

  const isSubmittingContent = <p>Submitting orders...</p>

  const didSubmitContent = (
    <>
      <p>Orders submitted successfully!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </>
  )

  return (
    <Modal onClose={props.onHideCart}>
      {!isSubmitting && !didSubmit && modalContent}
      {isSubmitting && !didSubmit && isSubmittingContent}
      {didSubmit && !isSubmitting && didSubmitContent}
    </Modal>
  )
}

export default Cart
