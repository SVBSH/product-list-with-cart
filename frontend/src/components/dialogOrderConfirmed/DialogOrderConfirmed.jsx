import PropTypes from 'prop-types'
import config from '@/config'
import styles from './dialogOrderConfirmed.module.css'
import { useRef, useEffect } from 'react'
import { useUserCartContext } from '@context/useCartContext'
import iconOrderConfirmed from '@assets/icon-order-confirmed.svg'
import { USER_CART_ACTIONS } from '../../context/useCartContext'

const apiUrl = import.meta.env.VITE_API_URL

// https://medium.com/@dimterion/modals-with-html-dialog-element-in-javascript-and-react-fb23c885d62e
function DialogOrderConfirmed({ openModal, closeModal }) {
  const ref = useRef()
  const { state, dispatch } = useUserCartContext()

  function completeOrder() {
    closeModal()
    dispatch({
      type: USER_CART_ACTIONS.COMPLETE_ORDER,
    })
  }

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal()
    } else {
      ref.current?.close()
    }
  }, [openModal])

  return (
    <dialog ref={ref} onCancel={closeModal} className="border-radius-md">
      <div className={styles['dialog-order-confirmed']}>
        <img
          width={42}
          height={42}
          src={iconOrderConfirmed}
          alt="order confirmed"
        />
        <h2 className={`text-xl clr-rose-900`}>Order Confirmed</h2>
        <p>We hope you enjoy your food!</p>
        <ul className={`${styles['order-list']} | border-radius-md`}>
          {Array.from(state.items.entries()).map(([key, cartItem], index) => {
            return (
              <li key={index} className={styles['order-item']}>
                <img
                  width={48}
                  height={48}
                  className={`${styles['order-img']} | border-radius-md`}
                  src={apiUrl + cartItem.thumbnail}
                  alt="order item"
                />
                <p className={`${styles['order-name']} | fw-600`}>
                  {cartItem.name}
                </p>
                <div className={styles['order-count-price']}>
                  <p className={`${styles['order-count']} | fw-600 clr-red`}>
                    {cartItem.count}x
                  </p>
                  <p className={styles['order-unit-price']}>
                    @ {cartItem.price}
                  </p>
                </div>
                <p className={styles['order-total-price']}>
                  ${cartItem.count * cartItem.price}
                </p>
              </li>
            )
          })}
          <li className={styles['order-total-container']}>
            <p>Order Total</p>
            <p className="fw-700 text-lg clr-black">${state.totalPrice}</p>
          </li>
        </ul>
        <button
          onClick={completeOrder}
          className="btn-confirm-order | clr-white fw-600"
        >
          Start New Order
        </button>
      </div>
    </dialog>
  )
}

DialogOrderConfirmed.propTypes = {
  openModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default DialogOrderConfirmed
