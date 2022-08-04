import { useRef, useState } from "react";

import Input from "../../../UI/Input/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [isQuantityValid, setIsQuantityValid] = useState(true);

  const inputEl = useRef(null);

  const submitHandler = (event) => {
    event.preventDefault();
    const itemQuantityString = inputEl.current.value;
    const itemQuantity = +itemQuantityString;

    if (
      itemQuantityString.trim().length === 0 ||
      itemQuantity < 1 ||
      itemQuantity > 5
    ) {
      setIsQuantityValid(false);
      return;
    }

    props.onAddItemQuantity(itemQuantity);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={inputEl}
        label="Quantity"
        input={{
          id: `quantity-${props.id}`,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!isQuantityValid && <p>Please enter a valid quantity (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
