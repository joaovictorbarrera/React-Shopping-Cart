import './App.css';
import React, {useState, useEffect} from "react"
import Header from './components/Header';
import Paragraph from './components/Paragraph';
import ItemsBox from './components/ItemsBox';
import Item from './components/Item';

function App() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/items").then(res => res.json()).then(data => {
      console.log("data fetched")
      setItems(data.items)
    })
  }, [])

  // const [cartItems, setCartItems] = useState([])

  return (
    
    // <p>hi</p>
    // {items.map(item => <p>{item.name}</p>)}

    <div className='page'>
      <Header text='React Shopping Cart'/>
      <div>
      <Paragraph text="This page is a project based on React.js."/>
      <Paragraph text="It also utilizes express.js on its back-end to provide an awesome shopping cart for you!" />
      </div>

      <ItemsBox>
        {items.map(item => <Item item={item}/>)}
      </ItemsBox>
    </div>

    // <ShoppingCart>
    //   {cartItems.map(item => <ShoppingCartEntry item={item}/>)}
    //   <Subtotal />
    //   <PayButton />
    // </ShoppingCart>
  )
}

export default App;
