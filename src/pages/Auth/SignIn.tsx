import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { fetchUserDetails, fetchCart } from '../../store/userSlice.js';
import userService, { type UserSignInData, type User } from '../../services/user.js';

function SignIn() {

  const [showPassword, setShowPassword] = useState(false);
  const [data,setData] = useState<UserSignInData>({
        email : "",
        password : ""
    })

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const { name , value } = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response: User = await userService.signIn(data);
      const user = response;
      toast.success("Signed In Successfully");
      dispatch(fetchUserDetails());
      dispatch(fetchCart());
      console.log("User after sign in:", user.isAdmin);
      {user.isAdmin ? navigate("/admin") : navigate("/")  }
    } catch (error: any) {
      console.error("There was an error!", error);
      toast.error(error.response?.data?.message || "Sign In Failed");
    }
  }

  return (
      <div className="max-w-120 mx-auto m-25 bg-white shadow-2xl">
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
        <div className="mt-4 text-center">
          <p className="text-gray-600">Or sign in with:</p>
          <a
              href={`${import.meta.env.VITE_BACKEND_URL}auth/google`}
              className="mt-2 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2
focus:ring-offset-2 focus:ring-indigo-500"
          >
              {/* You can replace this with a Google icon if you have one */}
              <svg className="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 10.233A8.995 8.995 0 0010 1C4.477 1 0 5.477 0 11c0 4.07 2.457 7.55 5.952 8.948l.004-.002.002.002h.001L6 19.999l.001-.001h.004L6 20a10 10 0 0010-10c0-1.748-.484-3.39-1.332-4.81l.002-.002A10 10 0
0010 1c-5.05 0-9 3.655-9 8.233 0 3.328 1.954 6.223 4.808 7.643l.002-.002h.001L5.999 18l.001-.001h.004L6 18c.002.003.004.007.006.011a9.993 9.993 0 003.992 1.996V11.233h-2.999v-2H10V7.233h2.999v2H16V11.233h-2.999v7.766a9.993 9.993 0
001.996-.002.006.011.004.007.002.003L16 19c.001-.002.002-.004.004-.006a8.995 8.995 0 003.992-1.996L20 10.233zM10 17.233c-3.153 0-5.717-2.32-5.717-5.187 0-2.868 2.564-5.187 5.717-5.187s5.717 2.32 5.717 5.187c0 2.868-2.564 5.187-5.717
5.187z" clipRule="evenodd" />
              </svg>
              Sign in with Google
          </a>
        </div>

        <div className="text-center pb-5 block text-red-600 hover:underline">
          <Link to="/signup">Don't have an account? Sign Up</Link>
        </div>
      </div>
  )
}

export default SignIn
