import { useState } from "react";
import PropTypes from "prop-types";
import emptyCartIllustration from "@assets/illustration-empty-cart.svg";
import imgCartItemRemove from "@assets/icon-remove-item.svg";
import imgIconCartDeliveryTree from "@assets/icon-carbon-neutral.svg";

import {
  useUserCartContext,
  USER_CART_ACTIONS,
} from "../../context/useCartContext";

function ShoppingCart({ openModal }) {
  const { state, dispatch } = useUserCartContext();
  return (
    <div className="cart-container border-radius-md">
      <h2 className="text-lg clr-red">Your Cart ({state.items.size})</h2>
      {state.totalPrice === 0 ? (
        <>
          <img className="empty-cart" src={emptyCartIllustration} alt="" />
          <p className="clr-rose-500 fw-600">
            Your added items will appear here
          </p>
        </>
      ) : (
        <div className="cart-wrapper">
          <ul className="cart-list">
            {Array.from(state.items.entries()).map(
              ([key, cartItem], index) => {
                return (
                  <li className="cart-item" key={index}>
                    <h3 className="cart-item-title | fw-600 clr-rose-900">
                      {cartItem.name}
                    </h3>
                    <div className="cart-item-price-info | row">
                      <p className="fw-600 clr-red">{cartItem.count}x</p>
                      <p className="clr-rose-500">@ ${cartItem.price}</p>
                      <p className="clr-rose-500 fw-600">
                        ${cartItem.price * cartItem.count}
                      </p>
                    </div>
                    <img
                      onClick={() =>
                        dispatch({
                          type: USER_CART_ACTIONS.REMOVE_ALL_ITEM_INSTANCES,
                          payload: {
                            name: cartItem.name,
                            price: cartItem.price,
                            count: cartItem.count,
                          },
                        })
                      }
                      className="cart-item-img | clr-rose-400"
                      src={imgCartItemRemove}
                      alt="remove item from cart"
                    />
                  </li>
                );
              }
            )}
          </ul>
          <div className="order-summary-container">
            <div className="order-summary">
              <p>Order Total</p>
              <p className="fw-700 clr-black text-lg">${state.totalPrice}</p>
            </div>
            <div className="info-banner | border-radius-md">
              <img src={imgIconCartDeliveryTree} alt="" />
              <p className="clr-black">
                This is a <span className="fw-700">carbon-neutral</span>{" "}
                delivery
              </p>
            </div>
            <button
              onClick={openModal}
              className="btn-confirm-order | clr-white fw-600"
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

ShoppingCart.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default ShoppingCart;
