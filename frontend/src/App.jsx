import "./App.css";
import DessertList from "@components/dessertList/DessertList";
import ShoppingCart from "@components/shoppingCart/ShoppingCart";

import UserCartProvider from "./context/useCartContext";

function App() {
  return (
    <>
      <UserCartProvider>
        <main className="main | wrapper">
          <div className="main-container">
            <h1 className="main-heading text-xl clr-rose-800">Desserts</h1>
            <DessertList />
            <ShoppingCart />
          </div>
        </main>
      </UserCartProvider>
    </>
  );
}

export default App;
