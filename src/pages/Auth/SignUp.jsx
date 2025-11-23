import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import {React, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showComfirmPassword, setShowComfirmPassword] = useState(false);
  const [data,setData] = useState({
        name : "",
        email : "",
        password : "",
        confirm_password : ""
    })

  const navigate = useNavigate();

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
    if(data.password !== data.confirm_password){
      toast.error("Password and Confirm Password do not match");
      console.log("Password and Confirm Password do not match");
      return;
    }
    axios.post("/signup", data)
      .then((response) => {
        toast.success(response.data.message);
        navigate("/signin");
      })
      .catch((error) => {
        // console.error("There was an error!", error);
        toast.error(error.response.data.message);
      });

  }
  return (
    <div className="max-w-120 mx-auto m-25 bg-white shadow-2xl">
      <ToastContainer />
      <h1 className="text-3xl text-center font-bold p-5">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-5 p-5">
          <div>
            <label>Name</label>
            <input type="text" name="name" value={data.name} onChange={handleOnChange} className="w-full h-12 bg-gray-100  rounded-md px-2" />
          </div>

          <div>
            <label>Email</label>
            <input type="email" name="email" value={data.email} onChange={handleOnChange} className="w-full h-12 bg-gray-100  rounded-md px-2" />
          </div>

          <div>
            <label>Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} name="password" value={data.password} onChange={handleOnChange} className="w-full h-12 bg-gray-100  rounded-md px-2 pr-10"/>
              <div className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" onClick={()=>setShowPassword((preve)=>!preve)}>

                {showPassword ?
                <EyeOff/>
                :
                <Eye />
                }
              </div>
            </div>
          </div>

          <div>
            <label>Confirm Password</label>
            <div className="relative">
              <input type={showComfirmPassword ? "text" : "password"} name="confirm_password" value={data.confirm_password} onChange={handleOnChange} className="w-full h-12 bg-gray-100  rounded-md px-2"/>
              <div className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" onClick={()=>setShowComfirmPassword((preve)=>!preve)}>

                  {showComfirmPassword ?
                  <EyeOff/>
                  :
                  <Eye />
                  }
              </div>
            </div>
          </div>

          <div className="w-auto mx-auto ext-center bg-red-500 text-white font-bold p-3 rounded-md cursor-pointer hover:bg-blue-300">
            <button type="submit" className="cursor-pointer">Sign Up</button>
          </div>

        </div>
      </form>
      <Link to="/signin" className="text-center pb-5 block">Don't have an account? Sign In</Link>
    </div>
  )
}

export default SignUp
