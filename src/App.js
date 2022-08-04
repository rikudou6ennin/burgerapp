import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header/Header";
import Meals from "./components/Meals/Meals/Meals";
import CartContextProvider from "./store/CartContextProvider";

function App() {
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => setShowCart(true);

  const hideCartHandler = () => setShowCart(false);

  return (
    <CartContextProvider>
      {showCart && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
