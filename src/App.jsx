import {useEffect, useState} from "react"
import Header from "./components/Header";
import Slipper from "./components/Slipper";
import {db} from "./data/db"

function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data, setData] = useState([])
  const [cart, setCart] = useState(initialCart)

  const maxItems = 5
  const minItems = 1

  useEffect(() => {
    setData(db)
  }, [])

  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item){
    const itemExists = cart.findIndex(slipper => slipper.id === item.id)
    if (itemExists >= 0){
      if(cart[itemExists].quantity >= maxItems) return
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    } else {
      item.quantity = 1
      setCart([...cart, item])
    }
  }

  function removeFromCart (id) {
    setCart(prevCart => prevCart.filter(slipper => slipper.id !== id) ) 
   }

   function increaseQuantity(id){
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < maxItems){
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
   }

   function decreaseQuantity(id){
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > minItems){
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
   }

   function clearCart(){
    setCart([])
   }

  return (
    <>
      <Header
        cart = {cart}
        removeFromCart = {removeFromCart}
        increaseQuantity = {increaseQuantity}
        decreaseQuantity = {decreaseQuantity}
        clearCart = {clearCart}
      />
      <main className="container-xl mt-4">
        <h2 className="text-center">Zapatillas Hombre</h2>
        <div className="row mt-4" >
          {data.map((slipper) => (
            <Slipper
              key={slipper.id}
              slipper = {slipper}
              addToCart = {addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            Astra Store - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
