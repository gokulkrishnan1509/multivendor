import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

const SellerProtected = ({ children }) => {
  const { isSeller,isSuccess, isLoading } = useSelector((state) => state.shop);

  if (isLoading === false) {
    <Loader/>
    if (!isSuccess) {
      return <Navigate to="/" replace={true}
/>;
    }
  }
  return children;
};

export default SellerProtected;
