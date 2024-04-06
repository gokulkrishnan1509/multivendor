import { createReducer } from "@reduxjs/toolkit";


const initialState={
    isLoading:false,
    coupon:null,
    success:false,
    error:null,
    getShopToken:[]
}

const couponReducer = createReducer(initialState,(builder)=>{
    builder.addCase("couponCreateRequest",(state)=>{
        state.isLoading=true
    }).addCase("couponCreateSuccess",(state,action)=>{
        state.isLoading=false;
        state.coupon=action.payload;
        state.success=true;
    }).addCase("couponCreateFail",(state,action)=>{
        state.isLoading=false;
        state.error=action.payload;
        state.success=false;
    }).addCase("clearCreateCouponSuccess",(state)=>{
        state.error=null;
        state.success=false
    }).addCase("couponGetRequest",(state)=>{
        state.isLoading=true;
    }).addCase("couponGetSuccess",(state,action)=>{
        state.isLoading=false;
        state.getShopToken=action.payload.couponCodes,
        state.success=true
    }).addCase("couponGetFail",(state,action)=>{
        state.isLoading=false;
        state.error=action.payload;
        state.success=false;
    }).addCase("clearGetCouponSuccess",(state)=>{
        state.error=null;
        state.success=false
    })
})



export default couponReducer;