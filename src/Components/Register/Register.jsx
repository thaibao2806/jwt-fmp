import { useState } from "react";
import "./register.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/apiRequest";
const Register = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isValidate, setIsValidate] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const error = useSelector((state) => state.auth.registerUser?.msg);
    const[isFetching, setIsFetching] = useState(false);
    const handleRegister = async(e) => {
        e.preventDefault()
        const newUser = {
            email: email,
            fullName: userName,
            password: password
        }
        if (isFetching) {
          return;
        }
        setIsFetching(true)
        // const errorMessage = await registerUser(newUser, dispatch, navigate);
        if (confirmPassword !== password) {
           setIsValidate("Mật khẩu nhập lại không đúng!!!")
           return;
        } else
        if (!email || !userName || !password || !confirmPassword) {
          setIsValidate("Cần nhập đầy đủ thông tin!!!");
          return;
        } else {
          const errorMessage = await registerUser(newUser, dispatch, navigate);
           setIsFetching(false);
          setIsValidate(errorMessage || error);
           if (!errorMessage) {
             // Đăng nhập thành công, thực hiện chuyển hướng đến trang mới
             navigate("/login"); // Thay đổi '/new-page' thành đường dẫn mà bạn muốn chuyển hướng đến
           }
        }
    }
    return (
      <section className="register-container">
        <div className="register-title"> Register </div>
        <form onSubmit={handleRegister}>
          <div>
            <span className="text-danger mb-2">{isValidate}</span>
          </div>
          <label>EMAIL</label>
          <input
            type="email"
            className="mb-2"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>FullName</label>
          <input
            type="text"
            className="mb-2"
            placeholder="Enter your fullName"
            onChange={(e) => setUserName(e.target.value)}
          />
          <label>PASSWORD</label>
          <input
            type="password"
            className="mb-2"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>CONFIRM PASSWORD</label>
          <input
            type="password"
            className="mb-2"
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {isFetching ? (
            <button type="submit" className="btn btn-primary mt-3" disabled>
              Creating account...
            </button>
          ) : (
            <button type="submit" className="btn btn-primary mt-3">
              Create account
            </button>
          )}
        </form>
      </section>
    );
}
 
export default Register;