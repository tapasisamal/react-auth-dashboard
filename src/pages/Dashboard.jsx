import { useSelector } from "react-redux";
import authService from "../api/auth";
import {logout} from "../store/authSlice"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Dashboard() {
  const user = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logout();   
    dispatch(logout());          
    navigate("/");                
  };


  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.username}</p>
      <p>Email: {user?.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;