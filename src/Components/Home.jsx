
import React, { useContext } from 'react'
import { CartData } from '../Context'
import { useEffect, useState } from 'react'
import SearchFilter from 'react-filter-search';
import ContentModel from './ContentModel';
import HeroSection from './HeroSection';
import SingleProduct from './SingleProduct'
import Categories from './Categories';

const Home = () => {

  
  const [fetching, setFatching] = useState(false)
  
  const [ categories ] = useState(["All","electronics","men's clothing","jewelery" ,"women's clothing"])
  
  const [currentCategory, setCurrentCategory] = useState("All")
  
  const { cartProducts ,setProducts , setCartProducts, isDarkMode, products , searchData, showModel, setShowModel, modelProduct, setModelProduct  } =  useContext(CartData)
 
  useEffect(() => {
    let productsApiUrl  = 'https://fakestoreapi.com/products'
     
    async function getProducts(productsApiUrl){
      setFatching(true)
      try {
        let response = await fetch(productsApiUrl)
        let data = await response.json()
          setProducts(data) 
          setFatching(false)
      } catch (error) {
        getProducts(productsApiUrl)
      }
    }
    
  getProducts(productsApiUrl)

 }, [setProducts])
  
  
 useEffect(() => {
  setCurrentCategory('All')
 }, [])
 

  return (
  <div>
    {/* Top Hero section */}
    <HeroSection />

     {/* all categories type section */}
    <Categories categories={categories} currentCategory={currentCategory} setCurrentCategory={setCurrentCategory}/>

   {/* all products here */}
    { fetching ? 
           
    <h1 className={isDarkMode ?"loading-data-text dark-color" : "loading-data-text"}> Loading . . .  </h1> :

    <SearchFilter 
          value={searchData}
          data={products}
          renderResults={results => {

            if(results.length === 0){
              return <div className='not-available-msg'> 
              <p> No Products Found 🙄</p>
              </div>
            }

            return <div className="products-container">
              {results.map(((product) => {

                if(currentCategory === "All") {
                  return <SingleProduct key={product.title} isDarkMode={isDarkMode} product={ product } cartProducts={cartProducts} setCartProducts={setCartProducts} showModel={showModel} setShowModel={setShowModel} modelProduct={modelProduct} setModelProduct={setModelProduct}/>
                }

                else if(product.category === currentCategory) {
                  return <SingleProduct key={product.title} isDarkMode={isDarkMode} product={ product } cartProducts={cartProducts} setCartProducts={setCartProducts} showModel={showModel} setShowModel={setShowModel} modelProduct={modelProduct} setModelProduct={setModelProduct}/>
                }

                return null
                
           }))}
               
           {/* floating model */}
              <ContentModel />

            </div>
          }}
        />
    }
    </div>
  )
}

export default Home