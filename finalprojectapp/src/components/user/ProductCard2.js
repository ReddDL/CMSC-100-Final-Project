import React, { useState, useEffect } from 'react';

const ProductCard2 = (prop) => {
  let attributes = prop.data;
  let attributesName = attributes.name;
  const [cartProducts, setCartProducts] = useState([]);

  const AddToCart = (event)=> {

    const items = document.getElementById(attributesName); 
    //console.log(items)
    console.log(items.childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerText)
    // console.log(attributes.name)
  }
  
  return (
    <div className="card w-80 bg-white shadow-xl" key = {attributes._id} id = {attributes.name}>
        <figure className="object-fill w-80 h-60"><img src={require('../../images/ProductImage/cartridge.png')} alt={attributes.title} className = "h-80"/></figure>
        <div className="card-body">
            <div className = 'flex flex-row flex-wrap items-center justify-center'>
              <div className="">
                <h2 className="card-title">{attributes.name}</h2>
                <div className="flex flex-row">
                  <h3 className = "text-center">Type: </h3>
                  <h3 className = "text-center"> {attributes.type}</h3>
                </div>
                
              </div>
              
              <div className="ml-10">
                <div className="flex flex-row">
                  <h3 className = "text-center">Price: </h3>
                  <h3 className = "text-center"> {attributes.price}</h3>
                </div>
                <div className="flex flex-row">
                  <h3 className = "text-center">Quantity: </h3>
                  <h3 className = "text-center"> {attributes.quantity}</h3>
                </div>
              </div>  
            </div>
            <p className = "text-center">{attributes.description}</p>
            
            <button onClick= {AddToCart} className = "bg-tea-green h-10 mt-3 rounded-lg text-oxford-blue">ADD TO CART</button>
        </div>
    </div>
  )
}



export default ProductCard2