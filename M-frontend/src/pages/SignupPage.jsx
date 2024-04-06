import React, { useEffect } from "react";
import Signup from "../components/signup"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const SignupPage = function(){
    const navigate = useNavigate();
    // const{userAuthorized} = useSelector((state)=>state.auth);
    

    // useEffect(()=>{
    // if(userAuthorized ===true){
    //     navigate("/")
    // }
    // },[userAuthorized]) 
    return(
        <>
         <Signup/>
        </>
    )
}

export default SignupPage;