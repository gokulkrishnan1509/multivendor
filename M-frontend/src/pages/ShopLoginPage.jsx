import React, { useEffect } from "react";
import ShopLogin from "../components/Shop/ShopLogin"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetState } from "../features/seller/sellerSlice";

function ShopLoginPage(){
    
    const {shopAuthendicate,isSeller,isLoading} =useSelector((state)=>state.shop)
    const navigate = useNavigate()
    const dispatch = useDispatch()

   useEffect(()=>{
    if(isSeller){
        navigate(`/dashboard`)
      
    }
   },[isSeller,isLoading])

    return(
        <>
        <ShopLogin/>
        </>
    )
}

export default ShopLoginPage