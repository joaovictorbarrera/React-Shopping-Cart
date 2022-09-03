import './App.css';
import React, {useState, useEffect} from "react"
import Header from './components/Header';
import Paragraph from './components/Paragraph';
import ItemsBox from './components/item/ItemsBox';
import Item from './components/item/Item';
import ShoppingCart from './components/shopping-cart/ShoppingCart';
import ShoppingCartItemsProvider from './contexts/ShoppingCartProvider';

function App() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/items").then(res => res.json()).then(data => {
      setItems(data.items)
    })
  }, [])

  return (
    <div className='page'>
      <Header text='React Shopping Cart'/>

      <div>
        <Paragraph text="This page is a project based on React.js."/>
        <Paragraph text="It also utilizes express.js on its back-end to provide an awesome shopping cart for you!" />
      </div>

      <ShoppingCartItemsProvider>
        <ItemsBox>
          {items.map((item, index) => <Item key={index} item={item}/>)}
        </ItemsBox>

        <ShoppingCart />
      </ShoppingCartItemsProvider>
    </div>

    
    
    
  )
}

export default App;
