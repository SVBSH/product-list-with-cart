import { useState } from "react";
import emptyCartIllustration from '@assets/illustration-empty-cart.svg'
import {
  useUserCartContext,
  USER_CART_ACTIONS,
} from "../../context/userCartContext";

function ShoppingCart() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { state, dispatch } = useUserCartContext();

  return (
    <div className="cart-container border-radius-md">
      <h2 className="text-lg clr-red">Your Cart ({state.items.length})</h2>
      {(state.totalPrice === 0) ? (
      <>
        <img className="empty-cart" src={emptyCartIllustration} alt="" />
        <p className="clr-rose-500 fw-600">Your added items will appear here</p>
      </>
      ) : (
      <ul className="">
        {state.items.map((cartItem, index) => (
          <li key={index}>
            <p>Name: {cartItem.name}</p>
            <p>Count: {cartItem.count}</p>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}

export default ShoppingCart;
