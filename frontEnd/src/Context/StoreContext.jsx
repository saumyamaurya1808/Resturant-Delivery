import { createContext, useEffect, useState } from "react";
import {food_list} from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider=(props)=>{

    const [cartItems, setCartItems] = useState({});
    const url = import.meta.env.VITE_API_URL || "http://localhost:4000"
    const [token, setToken] = useState("");
    const [food_list,setFoodList] = useState([])

    const addToCart = async (itemId) => {
        setCartItems((prev) => {
            try {
                const currentState = prev || {};
                const currentCount = currentState[itemId] || 0;
                return {
                    ...currentState,
                    [itemId]: currentCount + 1
                };
            } catch (error) {
                console.error('Error updating cart:', error);
                return prev;
            }
        });

        if (token) {
            try {
                await axios.post(
                    url + "/api/cart/add",
                    { itemId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            } catch (error) {
                console.error('Failed to sync cart add with server:', error);
            }
        }
    }
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const currentCount = prev[itemId] || 0;
            if (currentCount <= 1) {
                const { [itemId]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [itemId]: currentCount - 1 };
        });

        if (token) {
            try {
                await axios.post(
                    url + "/api/cart/remove",
                    { itemId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            } catch (error) {
                console.error('Failed to sync cart remove with server:', error);
            }
        }
    }

    const getTotalCartAmount = () =>{
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
    const logout = () => {
        localStorage.removeItem("token")
        setToken("")
        setCartItems({})
    }

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(
                url + "/api/cart/get",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (response.data.success) {
                setCartItems(response.data.loadCartData)
            } else {
                logout()
            }
        } catch (error) {
            console.error("Failed to load cart data:", error)
            logout()
        }
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const storedToken = localStorage.getItem("token")
            if (storedToken) {
                setToken(storedToken)
                await loadCartData(storedToken)
            }
        }
        loadData();
    }, [])
    const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        logout
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