import '../App.css';
import React from "react"
import ItemsBox from './ItemsBox';
import ShoppingCart from './ShoppingCart';
import ShoppingCartItemsProvider from '../contexts/ShoppingCartProvider';
import Footer from './Footer';
import NotificationsProvider from '../contexts/NotificationsProvider';
import Header from './Header';
import { useAppStatus } from '../contexts/AppStatusProvider';

function App() {
  const appStatus = useAppStatus()

  return (
    <ShoppingCartItemsProvider>
      <NotificationsProvider>
        <div className='page'>
          
            <Header />
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
