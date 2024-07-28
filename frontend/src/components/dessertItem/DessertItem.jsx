import PropTypes from 'prop-types'
import AddToCart from '@assets/icon-add-to-cart.svg'
import config from '@/config'
import { useState, useEffect } from 'react'
import { useUserCartContext, USER_CART_ACTIONS } from '@context/useCartContext'
const apiUrl = import.meta.env.VITE_API_URL

function DessertItem({ name, category, price, image, thumbnail }) {
  const [counterActive, setCounterActive] = useState(false)
  const { state, dispatch } = useUserCartContext()

  function handleCartActivate() {
    setCounterActive(true)
  }

  function handleItemCountChange(addition) {
    if (addition !== -1 && addition !== 1) {
      return
    }
    const newCount = state.items.get(name)?.count ?? 0 + addition
    if (newCount <= 0) {
      setCounterActive(false)
      return 0
    }
  }
  // reset counter when item is removed from cart
  useEffect(() => {
    const itemInCart = state.items.has(name)
    if (!itemInCart) {
      setCounterActive(false)
    }
  }, [state.items])

  return (
    <>
      <li className="desert-item">
        <div className="container">
          <picture className="dessert_img" data-selected={counterActive}>
            <source
              srcSet={apiUrl + image.desktop}
              media="(min-width: 925px)"
            />
            <source srcSet={apiUrl + image.tablet} media="(min-width: 725px)" />
            <img
              className={'border-radius-md'}
              src={apiUrl + image.mobile}
              alt="MDN"
              width={327}
              height={212}
            />
          </picture>
          {!counterActive ? (
            <button className="btn-cart row" onClick={handleCartActivate}>
              <img src={AddToCart} alt="cart icon" />
              <span className="text-sm fw-600 clr-rose-900">Add to Cart</span>
            </button>
          ) : (
            <div className="btn-cart btn btn-cart-item-action column">
              <button
                onClick={() => {
                  handleItemCountChange(-1)

                  dispatch({
                    type: USER_CART_ACTIONS.REMOVE_ITEM,
                    payload: {
                      name: name,
                      price: price,
                    },
                  })
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 2.5C14.125 2.5 17.5 5.875 17.5 10C17.5 14.125 14.125 17.5 10 17.5C5.875 17.5 2.5 14.125 2.5 10C2.5 5.875 5.875 2.5 10 2.5ZM10 1.25C5.1875 1.25 1.25 5.1875 1.25 10C1.25 14.8125 5.1875 18.75 10 18.75C14.8125 18.75 18.75 14.8125 18.75 10C18.75 5.1875 14.8125 1.25 10 1.25Z"
                    fill="white"
                  />
                  <path d="M5 9.375H15V10.625H5V9.375Z" fill="white" />
                </svg>
              </button>
              <p className="clr-white">{state.items.get(name)?.count ?? 0}</p>
              <button
                onClick={() => {
                  handleItemCountChange(1)

                  dispatch({
                    type: USER_CART_ACTIONS.ADD_ITEM,
                    payload: {
                      name: name,
                      category: category,
                      price: price,
                      thumbnail: thumbnail,
                    },
                  })
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 2.5C14.125 2.5 17.5 5.875 17.5 10C17.5 14.125 14.125 17.5 10 17.5C5.875 17.5 2.5 14.125 2.5 10C2.5 5.875 5.875 2.5 10 2.5ZM10 1.25C5.1875 1.25 1.25 5.1875 1.25 10C1.25 14.8125 5.1875 18.75 10 18.75C14.8125 18.75 18.75 14.8125 18.75 10C18.75 5.1875 14.8125 1.25 10 1.25Z"
                    fill="white"
                  />
                  <path
                    d="M15 9.375H10.625V5H9.375V9.375H5V10.625H9.375V15H10.625V10.625H15V9.375Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
        <div className="flow" style={{ '--flow-space': '0.25em' }}>
          <p className="clr-rose-500">{category}</p>
          <h2 className="fw-600">{name}</h2>
          <p className="clr-red fw-600">${price}</p>
        </div>
      </li>
    </>
  )
}

DessertItem.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.shape({
    desktop: PropTypes.string.isRequired,
    tablet: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
  }).isRequired,
  thumbnail: PropTypes.string.isRequired,
}

export default DessertItem
