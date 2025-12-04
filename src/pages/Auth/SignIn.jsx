import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppContext from '../../context';

function SignIn() {

  const [showPassword, setShowPassword] = useState(false);
  const [data,setData] = useState({
        email : "",
        password : ""
    })

  const navigate = useNavigate();

  const {fetchUserDetails, fetchCart} = useContext(AppContext);

  const handleOnChange = (e) =>{
        const { name , value } = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/signin", data, { withCredentials: true })
      .then((response) => {
        const user = response.data.data
        toast.success("Signed In Successfully");
        fetchUserDetails();
        fetchCart();
        console.log("User after sign in:", user.role == "Admin");
        {user.role == "Admin" ? navigate("/admin") : navigate("/")  }

      })
      .catch((error) => {
        console.error("There was an error!", error);
        toast.error(error.response?.data?.message || "Sign In Failed");
      });
  }

  return (
      <div className="max-w-120 mx-auto m-25 bg-white shadow-2xl">
        <ToastContainer />
        <h1 className="text-3xl text-center font-bold p-5">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-5 p-5">
            <div>
              <label>Email</label>
              <input type="email" name="email" value={data.email} onChange={handleOnChange} className="w-full h-12 bg-gray-100  rounded-md px-2" />
            </div>
            <div>
              <label>Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} name="password" onChange={handleOnChange} className="w-full h-12 bg-gray-100  rounded-md px-2 pr-10"/>
                <div className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" onClick={()=>setShowPassword((preve)=>!preve)}>

                {showPassword ?
                <EyeOff/>
                :
                <Eye />
                }
                </div>
              </div>
            </div>
            <div className="text-right text-red-600 hover:underline">
              <Link to="/">Forgot password?</Link>
            </div>
            <div className="w-full text-center bg-red-600 text-white font-bold py-3 rounded-md cursor-pointer hover:bg-red-300">
              <button type="submit" className="cursor-pointer w-full h-full">Sign In</button>
            </div>
          </div>
        </form>
        <div className="text-center pb-5 block text-red-600 hover:underline">
          <Link to="/signup">Don't have an account? Sign Up</Link>
        </div>
      </div>
  )
}

export default SignIn
