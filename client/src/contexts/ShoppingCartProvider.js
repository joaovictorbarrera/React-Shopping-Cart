import { createContext, useContext } from "react"
import useLocalStorage from "../hooks/useLocalStorage"

const ShoppingCartItemsContext = createContext()
const SetShoppingCartItemsContext = createContext()

export function useShoppingCartItems() {
    return JSON.parse(useContext(ShoppingCartItemsContext))
}

export function useSetShoppingCartItems() {
    return useContext(SetShoppingCartItemsContext)
}

export default function ShoppingCartItemsProvider({children}) {
    const [cartItems, setCartItems] = useLocalStorage("cart-items", JSON.stringify([]))
    return (
        <ShoppingCartItemsContext.Provider value={cartItems}>
            <SetShoppingCartItemsContext.Provider value={(items) => {
                if (items instanceof Function) {
                    items = items(JSON.parse(cartItems))
                }
                setCartItems(JSON.stringify(items))
            }}>
                {children}
            </SetShoppingCartItemsContext.Provider>
        </ShoppingCartItemsContext.Provider>
    )
}