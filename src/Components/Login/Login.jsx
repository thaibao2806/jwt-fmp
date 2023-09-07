import { useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [isValidate, setIsValidate] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
     
    const handleLogin = (e) => {
        e.preventDefault();
        const newUser = {
          email: email,
          password: password,
        };
        if(!email || !password) {
          setIsValidate("Cần điền đầy đủ thông tin!!")
          return 
        }else {
          loginUser(newUser, dispatch, navigate);
          setIsValidate("")
        }
    }
    return (
      <section className="login-container">
        <div className="login-title"> Log in</div>
        <form onSubmit={handleLogin}>
          <div>
            <span className="text-danger">{isValidate}</span>
          </div>
          <label>EMAIL</label>
          <input
            type="email"
            className="mb-2"
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>PASSWORD</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary mt-3">
            {" "}
            Log in{" "}
          </button>
        </form>
        <div className="login-register"> Don't have an account yet? </div>
        <Link className="login-register-link" to="/register">
          Register one for free{" "}
        </Link>
      </section>
    );
}
 
export default Login;