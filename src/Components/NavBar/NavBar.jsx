import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logOut, resetLoginError } from "../../redux/apiRequest";
import { createAxios } from "../../createInstance";
import { logoutSuccess } from "../../redux/authSlice";
import { useState } from "react";

const NavBar = () => {
  const user = useSelector((state) => state.auth.login.currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let axiosJWT = createAxios(user, dispatch, logoutSuccess)
  const[isFetching, setIsFetching] = useState(false);
  const handleLogout = () => {
    if(isFetching) {
      return
    }
    setIsFetching(true)
    try{
      dispatch(resetLoginError());
      logOut(dispatch, navigate, user?.data.token, axiosJWT);
    } catch (error){
      console.log(error)
    } finally {
      setIsFetching(false)
    }
    
  }
  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home"> Home </Link>
      {user? (
        <>
        <p className="navbar-user">Hi, <span> {user.data.email}  </span> </p>
        <Link to="/login" className="navbar-logout" onClick={handleLogout}> Log out</Link>
        </>
      ) : (    
        <>
      <Link to="/login" className="navbar-login"> Login </Link>
      <Link to="/register" className="navbar-register"> Register</Link>
      </>
)}
    </nav>
  );
};

export default NavBar;
