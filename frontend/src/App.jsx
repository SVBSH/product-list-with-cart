import { useState } from 'react'
import './App.css'
import DessertList from '@components/dessertList/DessertList'
import ShoppingCart from '@components/shoppingCart/ShoppingCart'

import UserCartProvider from './context/useCartContext'
import DialogOrderConfirmed from './components/dialogOrderConfirmed/DialogOrderConfirmed'

function App() {
  const [modal, setModal] = useState(false)

  function toggleModal() {
    setModal(!modal)
  }

  return (
    <>
      <UserCartProvider>
        <main className="main | wrapper">
          <div className="main-container">
            <h1 className="main-heading text-xl clr-rose-800">Desserts</h1>
            <DessertList />
            <ShoppingCart openModal={toggleModal} />
          </div>
          <DialogOrderConfirmed openModal={modal} closeModal={toggleModal} />
        </main>
      </UserCartProvider>
    </>
  )
}

export default App
