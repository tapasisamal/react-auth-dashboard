import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authService from "../api/auth";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {

    const {register, handleSubmit} = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = async (data) => {

        try{

            await authService.login(data);

            const user = await authService.getUser();

            dispatch(login(user.data));

            navigate("/dashboard");
        }catch(error) {
            console.log("login error:", error)
        }
    }
    return(

        <div>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Login</h2>

                <input
                type="email"
                placeholder="Enter your email"
                {...register("email",{required: true})}
                />

               <input
               type="password"
               placeholder="Enter your password"
               {...register("password", {required: true})}
               />

               <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login