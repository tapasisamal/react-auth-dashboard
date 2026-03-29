import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authService from "../api/auth"
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

function Register() {

    const {register, handleSubmit} = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const onSubmit = async (data) => {

        try{
            await authService.createAccount(data)
            await authService.login({
                email: data.email,
                password: data.password
            })
            const user = await authService.getUser()
            
            dispatch(login(user.data))
            navigate("/dashboard");

        }catch(error) {
            console.log("register error:", error)
        }
    }
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Create Account</h2>

            <input
            type="text"
            placeholder="Enter username"
            {...register("username", {required: true})}
            />

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

            <button type="submit">Sign up</button>
        </form>
    )
}

export default Register