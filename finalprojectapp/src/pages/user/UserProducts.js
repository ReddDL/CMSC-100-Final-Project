import React, { useState, useEffect, useContext } from 'react';
import ProductCardUser from '../../components/user/ProductCardUser';
import { useOutletContext } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from "axios";
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'



const UserProducts = () => {
    
    const [numItems, setNumItems] = useState("0");
    const [farmProducts, setFarmProducts] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addItemsCart, setAddItemsCart] = useState([]);
    const userId = useOutletContext();

    function update (){


        setNumItems(()=>{
            var nval = parseInt(numItems)+1;
            return nval;
        })
    }
    
    useEffect(() => { 

        axios.get('http://localhost:3000/api/products/list').then( 
            response => { 
                setFarmProducts(response.data); 
                setLoading(false);
            } 
        ).catch(error => { 
            setError(error);
            setLoading(false);
        }) 
        
    }, [])




    function filterOn (){
        let sortValue = document.getElementById("sort");
        let filterValue = document.getElementById("filter");
        if (filterValue.value ==="price" &&sortValue.value ==="ascending"){
            setFarmProducts(farmProducts.sort((a,b)=>a.price-b.price));
        } else if (filterValue.value ==="price" && sortValue.value ==="descending"){
            setFarmProducts(farmProducts.sort((a,b)=>b.price-a.price));
        } else if (filterValue.value ==="quantity" &&sortValue.value ==="ascending"){
            setFarmProducts(farmProducts.sort((a,b)=>a.quantity-b.quantity));
        } else if (filterValue.value ==="quantity" && sortValue.value ==="descending"){
            setFarmProducts(farmProducts.sort((a,b)=>b.quantity-a.quantity));
        } 
        
        else if (filterValue.value ==="name" && sortValue.value ==="ascending"){
            setFarmProducts(farmProducts.sort((a,b)=>a.name.localeCompare(b.name)));
        } else if (filterValue.value ==="name" && sortValue.value ==="descending"){
            setFarmProducts(farmProducts.sort((a,b)=>b.name.localeCompare(a.name)));
        } 
        
        else if (filterValue.value ==="type" && sortValue.value ==="ascending"){
            setFarmProducts(farmProducts.sort((a,b)=>a.type.localeCompare(b.type)));
        } else if (filterValue.value ==="type" && sortValue.value ==="descending"){
            setFarmProducts(farmProducts.sort((a,b)=>b.type.localeCompare(a.type)));
        }

        // console.log(farmProducts)
        const element = (
            <React.StrictMode>
                <div className = 'flex flex-row sm:flex-col md:flex-row sm:items-center flex-wrap gap-10 justify-center' id = 'product'>
                {farmProducts.map((product)=>
                    <ProductCardUser data={product} items = {addItemsCart} setItems = {setAddItemsCart}/>
                    
                )}
            </div>
            </React.StrictMode>
            
        )

        const root = createRoot(
            document.getElementById("product")
        )

        root.render(element)
    }
 
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

  return (
    <>
    <div className='bg-eggshell flex flex-col px-8 lg:px-32 md:px-24 sm:px-10 pt-32'>
    <div className = 'flex justify-center mb-10'>
      <h1 className='text-midnight-green text-4xl'>Welcome to our shop</h1>
    </div>
    
        <div className='flex poppins-regular items-center gap-4'>
            <div>
                <label htmlFor="filter">Filter by: </label>
                <select name="filter" id="filter" className='bg-midnight-green text-white px-2 py-1 rounded-lg mr-3'>
                    <option value="name">Name</option> 
                    <option value="price">Price</option>
                    <option value="type">Type</option>
                    <option value="quantity">Quantity</option>
                </select>
                </div>
            <div>
                <label htmlFor="sort" >Sort by: </label>
                <select name="sort" id="sort" className='bg-midnight-green text-white px-2 py-1 rounded-lg'>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>
            </div>
            <button onClick={filterOn}className='bg-midnight-green text-white px-3 py-1 rounded-lg'> Apply </button>
        </div>
        <div className='product bg-alabaster min-h-screen p-5 mb-5 rounded-xl mt-4 flex flex-col justify-center items-center'>
            <div className = 'flex flex-row justify-center mb-16 items-center'>
                <label id = 'cart-items' className = "text-3xl mr-16">Number of Items Added to Cart: {numItems}</label>
                <NavLink to='/user/cart'><button onClick = {update} className = "text-3xl bg-midnight-green w-96 h-12 rounded-xl">Proceed to Checkout</button></NavLink>
            </div>
            <div className = 'flex flex-row sm:flex-col md:flex-row sm:items-center flex-wrap gap-10 justify-center' id = 'product'>
                
                {farmProducts.map((product)=>
                    <ProductCardUser data={product} items = {addItemsCart} setItems = {setAddItemsCart}/>
                    
                )}
            </div>
        </div>

        
    </div>
    </>
  )
}

// const itemsCart = []

export function AddToCartFunc (Item, setItemsCart, itemsCart){
    
    
    
    setItemsCart(()=>{
        var nval;
        nval = [...itemsCart, Item]
        return nval
    })

    const element = (
        <React.StrictMode>
            <label className = "text-3xl mr-16">Number of Items Added to Cart: {itemsCart.length}</label>
        </React.StrictMode>
    )
    const root = createRoot(
        document.getElementById("cart-items")
    )
    root.render(element)
    
    console.log(itemsCart)

}





// TEST IF BACKEND UNAVAILABLE

// const Products = [
//     {
//         title: "Cartridge", 
//         price: "3000", 
//         description: "This is the best food in town!!",
//         image : require('../../images/ProductImage/cartridge.png'),
//         key : 1
    
//     },

//     {
//         title: "Rice Cooker", 
//         price: "5000", 
//         description: "This is a drink, I will drink it",
//         image : require('../../images/ProductImage/rice_cooker.png'),
//         key : 2
//     },

//     {
//         title: "Pancit Canton", 
//         price: "4000", 
//         description: "This is a food, I will eat it",
//         image : require('../../images/ProductImage/pancit_canton.png'),
//         key : 3
//     }

    
// ]




export default UserProducts