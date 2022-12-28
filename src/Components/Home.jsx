
import React, { useContext } from 'react'
import { CartData } from '../Context'
import { useState, useEffect } from 'react'

import SingleProduct from './SingleProduct'

const Home = () => {

  const { cartProducts , setCartProducts} =  useContext(CartData)
  
  const [products , setProducts] = useState([])
  

  let productsApiUrl  = 'https://fakestoreapi.com/products'
   
  async function getProducts(productsApiUrl){
    let response = await fetch(productsApiUrl)
    let data = await response.json()
      setProducts(data)
  }
  
  useEffect(() => {
    // https://fakestoreapi.com/products

  getProducts(productsApiUrl)

 }, )
  
 
  return (

    <div className='products-container'>
       {products.map((product => {
       return <SingleProduct key={product.title} product={ product } cartProducts={cartProducts} setCartProducts={setCartProducts}/>
       }))}
    </div>
  )
}

export default Home