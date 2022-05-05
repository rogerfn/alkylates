import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from './../../actions/auth';

const Logout = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout())

   }, [])

 
  return <Navigate
    to="/"
  >
  </Navigate>;
};

export default Logout;
