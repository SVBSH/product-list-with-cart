import { createContext, useContext, useReducer } from "react"
// https://medium.com/@seb_5882/a-short-guide-to-reacts-powerful-duo-usereducer-and-usecontext-23cea6f9ab35
const UserCartContext = createContext()

const cartFull = {
  items: [
    {
      name: "Macaron Mix of Five",
      category: "Macaron",
      price: 8,
      thumbnail: "/public/images/thumbnails/image-macaron-thumbnail.jpg",
      count: 2,
    },
    {
      name: "Vanilla Bean Crème Brûlée",
      category: "Crème Brûlée",
      price: 7,
      thumbnail: "/public/images/thumbnails/image-creme-brulee-thumbnail.jpg",
      count: 2,
    },
    {
      name: "Waffle with Berries",
      category: "Waffle",
      price: 6.5,
      thumbnail: "/public/images/thumbnails/image-waffle-thumbnail.jpg",
      count: 2,
    },
    {
      name: "Lemon Meringue Pie",
      category: "Pie",
      price: 5,
      thumbnail: "/public/images/thumbnails/image-meringue-thumbnail.jpg",
      count: 1,
    },
  ],
  totalPrice: 48,
}

// const items = new Map()

const cartDefault = {
  items: [],
  totalPrice: 0,
}

export const USER_CART_ACTIONS = {
  ADD_ITEM: "addItem",
  REMOVE_ITEM: "remove_item",
  REMOVE_ALL_ITEM_INSTANCES: "remove_all_item_instances",
  COMPLETE_ORDER: "complete_order",
}

const userCartReducer = (cart, action) => {
  // if (!action.payload) {
  //   console.log("Cart - removeItem: Invalid payload")
  //   return cart
  // }
  switch (action.type) {
    case USER_CART_ACTIONS.ADD_ITEM: {
      let found = false
      const updatedItems = cart.items.map((item) => {
        if (item.name === action.payload.name) {
          found = true
          return { ...item, count: item.count + 1 }
        }
        return item
      })

      if (!found) {
        console.log("userCart - AddItem: new item was added", action.payload)
        let newItem = { ...action.payload, count: 1 }
        return {
          items: [...cart.items, newItem],
          totalPrice: cart.totalPrice + action.payload.price,
        }
      }
      return {
        items: updatedItems,
        totalPrice: cart.totalPrice + action.payload.price,
      }
    }
    case USER_CART_ACTIONS.REMOVE_ITEM: {
      let searchItem = undefined
      const updatedItems = cart.items.map((item) => {
        if (item.name === action.payload.name) {
          searchItem = { ...item, count: item.count - 1 }
          return searchItem
        }
        return item
      })

      if (!searchItem) {
        return cart
      }

      if (searchItem.count <= 0) {
        const newItems = cart.items.filter(
          (currentItem) => currentItem.name !== action.payload.name
        )
        return {
          items: newItems,
          totalPrice: cart.totalPrice - action.payload.price,
        }
      }

      return {
        items: updatedItems,
        totalPrice: cart.totalPrice - action.payload.price,
      }
    }
    case USER_CART_ACTIONS.REMOVE_ALL_ITEM_INSTANCES: {
      const newItems = cart.items.filter(
        (item) => item.name != action.payload.name
      )
      const priceDiff = action.payload.count * action.payload.price
      return {
        items: newItems,
        totalPrice: cart.totalPrice - priceDiff,
      }
    }
    case USER_CART_ACTIONS.COMPLETE_ORDER: {
      console.log("lala")
      return {
        items: [],
        totalPrice: 0,
      }
    }
    default: {
      console.log("Cart - removeItem: Invalid action")
      return cart
    }
  }
}

const UserCartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userCartReducer, cartFull)

  return (
    <UserCartContext.Provider value={{ state, dispatch }}>
      {children}
    </UserCartContext.Provider>
  )
}

export const useUserCartContext = () => {
  return useContext(UserCartContext)
}

export default UserCartProvider
