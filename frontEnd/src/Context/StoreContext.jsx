import { createContext, useEffect, useState } from "react";
import {food_list} from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider=(props)=>{

    const [cartItems, setCartItems] = useState({});
    const url="http://localhost:4000"
    const [token, setToken] = useState("");
    const [food_list,setFoodList] = useState([])

    const addToCart= async (itemId)=>{
        // chatgpt code start
        setCartItems((prev) => {
    try {
        // Guard against null/undefined prev state
        const currentState = prev || {};
        // Safely get current count
        const currentCount = currentState[itemId] || 0;
        // Return new state with updated count
        return {
            ...currentState,
            [itemId]: currentCount + 1
        };
    } catch (error) {
        console.error('Error updating cart:', error);
        // Return unchanged state if error occurs
        return prev;
    }
});
// chagpt code end
        // setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

        // if (token) {
        //     await axios.post(
        //         `${url}/api/cart/add`,
        //         { itemId },
        //         { headers: { Authorization: `Bearer ${token}` } }
        //     );
        // }
// self code start
        // if(!cartItems[itemId]){
        //     setCartItems((prev)=>({...prev,[itemId]:1}))
        // }
        // else{
        //     setCartItems((prev)=>({...prev,[itemId]: prev[itemId]+1}))
        // }
        // if (token) {
        //     await axios.post(url + "/api/cart/add", {itemId}, {
        //         headers:{token}
        //     })
        // }
        // self code end
    }
    const removeFromCart =async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if (token) {
            await axios.post(url + "/api/cart/remove",{itemId},{
                headers:{token}
            })
        }
    }

    const getTotalCartAmount = ()=>{
        let totalAmount =0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                 let itemInfo = food_list.find((product)=>product._id === item)
                totalAmount += itemInfo.price*cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async()=>{
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data)
    }
    const loadCartData = async(token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{
            headers:{token}
        })
        setCartItems(response.data.loadCartData);
    }

    useEffect(()=>{
        
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])
    const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    
    return(
       <StoreContext.Provider value={contextValue}>
            {props.children}
       </StoreContext.Provider> 
        //chatgpt
        // <StoreContext.Provider value={{ addToCart, removeFromCart, url }}>
        //     {props.children}
        // </StoreContext.Provider>

    )
}

export default StoreContextProvider