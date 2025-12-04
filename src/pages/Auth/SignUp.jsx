import { Eye, EyeOff } from 'lucide-react';
import {React, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userService from '../../services/user.js';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showComfirmPassword, setShowComfirmPassword] = useState(false);
  const [data,setData] = useState({
        name : "",
        email : "",
        phone : "",
        address : "",
        country : "",
        state : "",
        zip : "",
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
    const handleSubmit = async (e) => {
      e.preventDefault();
      if(data.password !== data.confirm_password){
        toast.error("Password and Confirm Password do not match");
        console.log("Password and Confirm Password do not match");
        return;
      }
      try {
        const response = await userService.signUp(data);
        toast.success(response.data.message);
        navigate("/signin");
      } catch (error) {
        toast.error(error.response?.data?.message || "Sign Up Failed");
      }
    }
  return (
    <div className="max-w-200 mx-auto m-25 bg-white shadow-2xl">
      <ToastContainer />
      <h1 className="text-3xl text-center font-bold p-5">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-5 p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label>Name</label>
              <input type="text" name="name" value={data.name} onChange={handleOnChange} className="w-full h-12 bg-gray-100  rounded-md px-2" />
            </div>

            <div>
              <label>Email</label>
              <input type="email" name="email" value={data.email} onChange={handleOnChange} className="w-full h-12 bg-gray-100  rounded-md px-2" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label>Phone</label>
              <input type="tel" name="phone" value={data.phone} onChange={handleOnChange} className="w-full h-12 bg-gray-100  rounded-md px-2" />
            </div>
            <div>
              <label>Zip</label>
              <input type="text" name="zip" value={data.zip} onChange={handleOnChange} className="w-full h-12 bg-gray-100  rounded-md px-2" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label>State</label>
              <input type="text" name="state" value={data.state} onChange={handleOnChange} className="w-full h-12 bg-gray-100  rounded-md px-2" />
            </div>

            <div>
              <label>Country</label>
              <input type="text" name="country" value={data.country} onChange={handleOnChange} className="w-full h-12 bg-gray-100  rounded-md px-2" />
            </div>
          </div>

          <div>
            <label>Address</label>
            <input type="text" name="address" value={data.address} onChange={handleOnChange} className="w-full h-12 bg-gray-100  rounded-md px-2" />
          </div>




          <div className="w-full text-center bg-red-600 text-white font-bold py-3 rounded-md cursor-pointer hover:bg-red-300">
            <button type="submit" className="cursor-pointer w-full h-full">Sign Up</button>
          </div>

        </div>
      </form>
      <div className="text-center pb-5 block text-red-500 hover:underline">
        <Link to="/signin">Don't have an account? Sign In</Link>
      </div>
    </div>
  )
}

export default SignUp
