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

  const {fetchUserDetails} = useContext(AppContext);

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
        console.log(response.data);
        const user = response.data.data
        toast.success("Signed In Successfully");
        {user.role == "Admin" ? navigate("/admin") : navigate("/")  }
        fetchUserDetails();
        window.location.reload();

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
            <Link to="/" className="text-right">Forgot password?</Link>
            <div className="w-auto mx-auto ext-center bg-red-500 text-white font-bold p-3 rounded-md cursor-pointer hover:bg-blue-300">
              <button type="submit" className="cursor-pointer">Sign In</button>
            </div>
          </div>
        </form>
        <Link to="/signup" className="text-center pb-5 block">Don't have an account? Sign Up</Link>
      </div>
  )
}

export default SignIn
