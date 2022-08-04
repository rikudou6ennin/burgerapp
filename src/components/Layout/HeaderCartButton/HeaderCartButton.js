import { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../../Cart/CartIcon";
import CartContext from "../../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [isBump, setIsBump] = useState(false);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((prev, item) => {
    return prev + item.quantity;
  }, 0);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    setIsBump(true);

    const timer = setTimeout(() => {
      setIsBump(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const buttonClasses = `${classes.button} ${isBump ? classes.bump : ""}`;

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
