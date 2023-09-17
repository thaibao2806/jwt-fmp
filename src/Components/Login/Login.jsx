import {  useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [isValidate, setIsValidate] = useState("");
    const [isFetching, setIsFetching] = useState(false)
    const error = useSelector((state)=> state.auth.login?.msg)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async (e) => {
      e.preventDefault();
      if(isFetching) {
        return
      }

      setIsFetching(true)
      const newUser = {
        email: email,
        password: password,
      }; // Lưu thông báo lỗi vào biến
      if (!email || !password) {
        setIsValidate("Cần điền đầy đủ thông tin!!");
        return;
      } else {
        const errorMessage = await loginUser(newUser, dispatch, navigate);
        setIsFetching(false);
        // Xử lý lỗi từ API login
        setIsValidate(errorMessage || error);
        if (!errorMessage) {
          // Đăng nhập thành công, thực hiện chuyển hướng đến trang mới
          navigate("/"); // Thay đổi '/new-page' thành đường dẫn mà bạn muốn chuyển hướng đến
        }
        setIsFetching(false)
      }
    };
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
          {isFetching ? (
            <button type="submit" className="btn btn-primary mt-3" disabled>
              Log in...
            </button>
          ) : (
            <button type="submit" className="btn btn-primary mt-3">
              {" "}
              Log in{" "}
            </button>
          )}
        </form>
        <div className="login-register"> Don't have an account yet? </div>
        <Link className="login-register-link" to="/register">
          Register one for free{" "}
        </Link>
      </section>
    );
}
 
export default Login;