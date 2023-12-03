import { createContext, useState, useEffect } from 'react'
import {
  createCheckout,
  createCheckoutOneProduct,
  updateCheckout,
} from '../lib/shopify'
import { createCheckout2 } from '@/lib/checkout'

const CartContext = createContext()

export default function ShopProvider({ children }) {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutId, setCheckoutId] = useState('')
  const [checkoutUrl, setCheckoutUrl] = useState('')
  const [cartLoading, setCartLoading] = useState(false)

  useEffect(() => {
    if (localStorage.checkout_id) {
      const cartObject = JSON.parse(localStorage.checkout_id)

      if (cartObject[0].id) {
        setCart([cartObject[0]])
      } else if (cartObject[0].length > 0) {
        setCart(...[cartObject[0]])
      }

      setCheckoutId(cartObject[1].id)
      setCheckoutUrl(cartObject[1].webUrl)
    }
  }, [])

  async function addToCart(addedItem) {
    const newItem = { ...addedItem }
    setCartOpen(true)

    if (cart.length === 0) {
      setCart([newItem])

      const checkout = await createCheckoutOneProduct(newItem.id, 1)
      setCheckoutId(checkout.id)
      setCheckoutUrl(checkout.webUrl)

      localStorage.setItem('checkout_id', JSON.stringify([newItem, checkout]))
    } else {
      let newCart = []
      let added = false

      cart.map((item) => {
        if (item.id === newItem.id) {
          item.variantQuantity++
          newCart = [...cart]
          added = true
        }
      })

      if (!added) {
        newCart = [...cart, newItem]
      }

      setCart(newCart)
      const newCheckout = await updateCheckout(checkoutId, newCart)
      localStorage.setItem(
        'checkout_id',
        JSON.stringify([newCart, newCheckout])
      )
    }
  }

  async function addMultipleToCart(addedItems) {
    setCartOpen(true)

    if (cart.length === 0) {
      const itemsWithQuantities = addedItems.map((item) => ({
        ...item,
      }))
      const id = itemsWithQuantities[0].id
      const checkout = await createCheckout(id, addedItems)

      setCart(itemsWithQuantities)
      setCheckoutId(checkout?.id)
      setCheckoutUrl(checkout?.webUrl)

      localStorage.setItem(
        'checkout_id',
        JSON.stringify([itemsWithQuantities, checkout])
      )
    } else {
      let newCart = [...cart]

      addedItems.forEach((addedItem) => {
        const existingItem = newCart.find((item) => item.id === addedItem.id)

        if (existingItem) {
          existingItem.variantQuantity += 1
        } else {
          newCart.push({ ...addedItem, variantQuantity: 1 })
        }
      })

      setCart(newCart)

      const newCheckout = await updateCheckout(checkoutId, newCart)

      localStorage.setItem(
        'checkout_id',
        JSON.stringify([newCart, newCheckout])
      )
    }
  }

  async function addItemsToCart(itemsToAdd) {
    const newItem = [...itemsToAdd]

    console.log('item', newItem[0].id)

    if (cart.length === 0) {
      setCart(newItem)
      const checkout = await createCheckout(newItem[0].id, 1)
      //const newCheckout = await updateCheckout(checkoutId, newItem)
      setCheckoutId(checkout.id)
      setCheckoutUrl(checkout.webUrl)

      localStorage.setItem('checkout_id', JSON.stringify([newItem, checkout]))
    }

    // // Exemplu:
    // const updatedCart = [...cart, ...itemsToAdd]

    // setCart(updatedCart)

    // const newCheckout = await updateCheckout(checkoutId, updatedCart)

    // localStorage.setItem(
    //   'checkout_id',
    //   JSON.stringify([updatedCart, newCheckout])
    // )
  }

  async function removeCartItem(itemToRemove) {
    const updatedCart = cart.filter((item) => item.id !== itemToRemove)
    setCartLoading(true)

    setCart(updatedCart)

    const newCheckout = await updateCheckout(checkoutId, updatedCart)

    localStorage.setItem(
      'checkout_id',
      JSON.stringify([updatedCart, newCheckout])
    )
    setCartLoading(false)

    if (cart.length === 1) {
      setCartOpen(false)
    }
  }

  async function incrementCartItem(item) {
    setCartLoading(true)

    let newCart = []

    cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        cartItem.variantQuantity++
        newCart = [...cart]
      }
    })
    setCart(newCart)
    const newCheckout = await updateCheckout(checkoutId, newCart)

    localStorage.setItem('checkout_id', JSON.stringify([newCart, newCheckout]))
    setCartLoading(false)
  }

  async function decrementCartItem(item) {
    setCartLoading(true)

    if (item.variantQuantity === 1) {
      removeCartItem(item.id)
    } else {
      let newCart = []
      cart.map((cartItem) => {
        if (cartItem.id === item.id) {
          cartItem.variantQuantity--
          newCart = [...cart]
        }
      })

      setCart(newCart)
      const newCheckout = await updateCheckout(checkoutId, newCart)

      localStorage.setItem(
        'checkout_id',
        JSON.stringify([newCart, newCheckout])
      )
    }
    setCartLoading(false)
  }

  async function clearCart() {
    const updatedCart = []

    setCart(updatedCart)

    const newCheckout = await updateCheckout(checkoutId, updatedCart)

    localStorage.setItem(
      'checkout_id',
      JSON.stringify([updatedCart, newCheckout])
    )
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        setCartOpen,
        addToCart,
        checkoutUrl,
        removeCartItem,
        clearCart,
        cartLoading,
        incrementCartItem,
        decrementCartItem,
        addMultipleToCart,
        addItemsToCart, // Adaugă funcția nouă în context
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const ShopConsumer = CartContext.Consumer

export { ShopConsumer, CartContext }
