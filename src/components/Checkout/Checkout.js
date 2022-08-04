import { useRef, useState } from "react"
import classes from "./Checkout.module.css"

const Checkout = (props) => {
  const nameInputRef = useRef()
  const streetInputRef = useRef()
  const postalCodeInputRef = useRef()
  const cityInputRef = useRef()

  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  })

  const isEmpty = (value) => value.trim() === ""
  const isFiveChars = (value) => value.trim().length === 5

  const confirmHandler = (event) => {
    event.preventDefault()
    const enteredName = nameInputRef.current.value
    const enteredStreet = streetInputRef.current.value
    const enteredPostalCode = postalCodeInputRef.current.value
    const enteredCity = cityInputRef.current.value

    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredStreetIsValid = !isEmpty(enteredStreet)
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode)
    const enteredCityIsValid = !isEmpty(enteredCity)

    setFormValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalCodeIsValid,
      city: enteredCityIsValid,
    })

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid &&
      enteredCityIsValid

    if (!formIsValid) {
      return
    }

    props.onCheckoutConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostalCode,
      city: enteredCity,
    })
  }

  const getClassName = (property) =>
    `${classes.control} ${formValidity[property] ? "" : classes.invalid}`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={getClassName("name")}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formValidity.name && <p>Please input a valid name.</p>}
      </div>
      <div className={getClassName("street")}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formValidity.street && <p>Please input a valid street.</p>}
      </div>
      <div className={getClassName("postal")}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formValidity.postal && <p>Please input a valid postal code.</p>}
      </div>
      <div className={getClassName("city")}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formValidity.city && <p>Please input a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} type='submit'>
          Confirm
        </button>
      </div>
    </form>
  )
}

export default Checkout
