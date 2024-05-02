import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { isAunthundicatedUser } from "../features/user/userSlice";

const ProtectedRoute = ({ children }) => {
  // const { isSuccess, isLoading, userAuthorized } = useSelector((state) => state.auth);
  
  const { userAuthorized ,user} = useSelector((state) => state.auth);
const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(isAunthundicatedUser())
  },[dispatch])
  if (!userAuthorized) {
      return <Navigate to="/login" replace={true} />;
  }
  return children;

};

export default ProtectedRoute;
