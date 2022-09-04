import './App.css';
import React, { useState } from "react"
import Header from './components/Header';
import ItemsBox from './components/item/ItemsBox';
import ShoppingCart from './components/shopping-cart/ShoppingCart';
import ShoppingCartItemsProvider from './contexts/ShoppingCartProvider';
import Footer from './components/Footer';
import PageDescription from './components/PageDescription';
import NotificationsProvider from './contexts/NotificationsProvider';

function App() {
  const [isLoading, setLoading] = useState(true);

  return (
    <NotificationsProvider>
      <div className='page'>
        <Header text='React Shopping Cart'/>
        <PageDescription />
        <ShoppingCartItemsProvider>
          <ItemsBox isLoading={isLoading} setLoading={setLoading}/>
          <ShoppingCart isLoading={isLoading} />
        </ShoppingCartItemsProvider>
      </div>
      <Footer isLoading={isLoading} />
    </NotificationsProvider>
  )
}

export default App;
