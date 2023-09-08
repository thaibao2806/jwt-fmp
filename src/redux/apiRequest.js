import axios from "axios";
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess } from "./authSlice";


export const loginUser  = async(user, dispatch, navigate) => {
    dispatch(loginStart())
    try {
        const res = await axios.post("https://auth-server-fmp.vercel.app/auth/login", user, {
            withCredentials: true
        })
    
        dispatch(loginSuccess(res.data))
        navigate("/")
    } catch (error) {
        dispatch(loginFailed())
    }
}

export const registerUser = async(user, dispatch, navigate) => {
    dispatch(registerStart())
    try {
        await axios.post("https://auth-server-fmp.vercel.app/auth/register", user)
        dispatch(registerSuccess())
        navigate("/login")
    } catch (error) {
        dispatch(registerFailed())
    }
}

export const logOut = async(dispatch, navigate, accessToken, axiosJWT) => {
    dispatch(logoutStart())
    try {
        const res = await axiosJWT.post("https://auth-server-fmp.vercel.app/auth/logout",{}, {
            headers: { 
                Authorization: `Bearer ${accessToken}`,
            },
            withCredential: true

        })
        console.log(res)
        dispatch(logoutSuccess())
        navigate("/login")
    } catch (error) {
        dispatch(logoutFailed())
    }
} 