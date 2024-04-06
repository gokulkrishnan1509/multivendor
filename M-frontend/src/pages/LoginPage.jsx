import React, { useEffect } from "react";
import Login from "../components/login";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const LoginPage =()=>{
const navigate = useNavigate()
   // const{userAuthorized,isSuccess} = useSelector((state)=>state.auth);
   // useEffect(()=>{
   //  if(userAuthorized ===true){
   //     navigate("/")
 
   //  }
   // },[userAuthorized])
    return(
       <>
       <div >
       <Login />

       </div>
       </> 
    )
}

export default LoginPage