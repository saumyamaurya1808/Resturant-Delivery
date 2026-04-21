
import userModel from "../models/userModel.js"

// add items to user cart
const addToCart = async(req,res)=>{
    try {
        let userData= await userModel.findById(req.body.userId);
        if (!userData) {
            return res.json({success:false,message:"User not found"});
        }
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
            
        }    
        else{
            cartData[req.body.itemId]+=1;

        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true, message:"Added to cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//remove item
const removeFromCart = async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.json({success:false,message:"User not found"});
        }
        let cartData = userData.cartData;
        // let cartData= await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true, message:"Removed from cart"});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
        
    }
}

//fetch user cart data 
//pta nhi q connect nhi ho rha h catch server pr run ho rha h
const getCart = async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        res.json({success:true, cartData});


    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}


export {addToCart,removeFromCart,getCart}