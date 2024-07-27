import { createContext, useContext, useReducer } from "react"
// https://medium.com/@seb_5882/a-short-guide-to-reacts-powerful-duo-usereducer-and-usecontext-23cea6f9ab35
const UserCartContext = createContext()

const cartFull = {
  items: new Map([
    ["Macaron Mix of Five", {
      name: "Macaron Mix of Five",
      category: "Macaron",
      price: 8,
      thumbnail: "/public/images/thumbnails/image-macaron-thumbnail.jpg",
      count: 2,
    }],
    ["Vanilla Bean Crème Brûlée", {
      name: "Vanilla Bean Crème Brûlée",
      category: "Crème Brûlée",
      price: 7,
      thumbnail: "/public/images/thumbnails/image-creme-brulee-thumbnail.jpg",
      count: 2,
    }],
    ["Waffle with Berries", {
      name: "Waffle with Berries",
      category: "Waffle",
      price: 6.5,
      thumbnail: "/public/images/thumbnails/image-waffle-thumbnail.jpg",
      count: 2,
    }],
    ["Lemon Meringue Pie", {
      name: "Lemon Meringue Pie",
      category: "Pie",
      price: 5,
      thumbnail: "/public/images/thumbnails/image-meringue-thumbnail.jpg",
      count: 1,
    }],
  ]),
  totalPrice: 48,
}

// const items = new Map()

const cartDefault = {
  items: new Map(),
  totalPrice: 0,
}

export const USER_CART_ACTIONS = {
  ADD_ITEM: "addItem",
  REMOVE_ITEM: "remove_item",
  REMOVE_ALL_ITEM_INSTANCES: "remove_all_item_instances",
  COMPLETE_ORDER: "complete_order",
}

const userCartReducer = (cart, action) => {
  switch (action.type) {
    case USER_CART_ACTIONS.ADD_ITEM: {
      const newItems = structuredClone(cart.items);
      let found = cart.items.has(action.payload.name)
      let newCount = 1;
      let newItem = cart.items.get(action.payload.name)
      if (found) {
        newCount = newItem.count + 1
      } else {
        newItem = {...action.payload}
      }
      newItems.set(action.payload.name, { ...newItem, count: newCount })
      console.log(`userCart - AddItem: '${action.payload.name}' item was added`)
      return {
        items: newItems,
        totalPrice: cart.totalPrice + action.payload.price,
      }
    }
    case USER_CART_ACTIONS.REMOVE_ITEM: {
      let found = cart.items.has(action.payload.name)
      if (!found) {
        return cart
      }
      
      const oldItem = cart.items.get(action.payload.name)

      const newItems = structuredClone(cart.items)
      const newCount = oldItem.count - 1

      if (newCount <= 0) {
        newItems.delete(action.payload.name)
      } else {
        newItems.set(action.payload.name, { ...oldItem, count: newCount })
      }
  
      return {
        items: newItems,
        totalPrice: cart.totalPrice - action.payload.price,
      }
    }
    case USER_CART_ACTIONS.REMOVE_ALL_ITEM_INSTANCES: {
      if (!cart.items.has(action.payload.name)) {
        return cart
      }

      const newItems = structuredClone(cart.items)
      newItems.delete(action.payload.name)

      const priceDiff = action.payload.count * action.payload.price
      return {
        items: newItems,
        totalPrice: cart.totalPrice - priceDiff,
      }
    }
    case USER_CART_ACTIONS.COMPLETE_ORDER: {
      console.log("lala")
      return {
        items: new Map(),
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
  const [state, dispatch] = useReducer(userCartReducer, cartDefault)

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