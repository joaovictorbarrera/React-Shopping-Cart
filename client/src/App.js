import './App.css';
import React from "react"
import ItemsBox from './components/item/ItemsBox';
import ShoppingCart from './components/shopping-cart/ShoppingCart';
import ShoppingCartItemsProvider from './contexts/ShoppingCartProvider';
import Footer from './components/Footer';
import NotificationsProvider from './contexts/NotificationsProvider';
import Top from './components/Top';
import { useAppStatus } from './contexts/AppStatusProvider';

function App() {
  const appStatus = useAppStatus()

  return (
    <NotificationsProvider>
      <div className='page'>
        <ShoppingCartItemsProvider>
          <Top />
          <ItemsBox/>
          {appStatus !== "done" ? 
          <></> :
          <>
            <ShoppingCart />
          </>}
        </ShoppingCartItemsProvider>
      </div>
      {appStatus === "loading" ? <></> : <Footer/>} 
    </NotificationsProvider>
  )
}

export default App;
