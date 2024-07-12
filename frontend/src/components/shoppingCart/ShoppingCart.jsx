import { useState } from "react";
import emptyCartIllustration from '@assets/illustration-empty-cart.svg'
import imgCartItemRemove from '@assets/icon-remove-item.svg'
import {
  useUserCartContext,
  USER_CART_ACTIONS,
} from "../../context/useCartContext";

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
      <ul className="cart-list">
        {state.items.map((cartItem, index) => (
          <li className="cart-item" key={index}>
            <h3 className="cart-item-title | fw-600 clr-rose-900">{cartItem.name}</h3>
            <div className="cart-item-price-info | row">
              <p className="fw-600 clr-red">{cartItem.count}x</p>
              <p className="clr-rose-500">@ ${cartItem.price}</p>
              <p className="clr-rose-500 fw-600">${cartItem.price * cartItem.count}</p>
            </div>
            <img className="cart-item-img | clr-rose-500" src={imgCartItemRemove} alt="remove item from cart" />
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}

export default ShoppingCart;
