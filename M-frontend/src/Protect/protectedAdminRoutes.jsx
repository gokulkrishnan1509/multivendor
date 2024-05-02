import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { GetLoginUser, isAunthundicatedUser } from "../features/user/userSlice";

const AdminProtectRoute = ({ children }) => {
  const { userAuthorized, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(isAunthundicatedUser());
      dispatch(GetLoginUser())
      
 
  }, [dispatch]);

  if (!userAuthorized) {
    return <Navigate to="/login" replace={true}></Navigate>;
  } else if (user.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtectRoute;
