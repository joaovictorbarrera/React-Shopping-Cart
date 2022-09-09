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
    <ShoppingCartItemsProvider>
      <NotificationsProvider>
        <div className='page'>
          
            <Top />
            <ItemsBox/>
            {appStatus !== "done" ? 
            null :
            <>
              <ShoppingCart />
            </>}
          
        </div>
        {appStatus !== "loading" ? <Footer/> : null} 
      </NotificationsProvider>
    </ShoppingCartItemsProvider>
  )
}

export default App;
