import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from '../../services/AuthService.service';
import useService from '../../hooks/useService';

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false) 

  const nav = useNavigate()
  
  const onRegister = async()=>{
    if(username=="" || name == "" || password==""||confirm==""){
      alert("Please provide complete data")
      return
    }
    setIsLoading(true)
    
    await useService(AuthService.registerUser(username, password, name, confirm), nav, ()=>{nav("/login")})    
    setIsLoading(false)
  }
  return (
    <div className="bg-sky-700 h-screen flex justify-center py-44"> 
      <div className="px-3 py-4 bg-white rounded-md h-fit">
          <h2 className="text-2xl text-center font-bold">REGISTER</h2> 
          <div className="mb-3 mt-5"> 
              <div className="text-sm">Full Name</div>
              <input type="text" className="border-2 rounded w-full p-1" onChange={(e)=>setName(e.target.value)}/>

              <div className="text-sm">Username</div>
              <input type="text" className="border-2 rounded w-full p-1" onChange={(e)=>setUsername(e.target.value)}/>

              <div className="text-sm mt-2 mb-1">Password</div>
              <input type="password" className="border-2 rounded w-full p-1" onChange={(e)=>setPassword(e.target.value)}/>
  
              <div className="text-sm mt-2 mb-1">Password Confirmation</div>
              <input type="password" className="border-2 rounded w-full p-1" onChange={(e)=>setConfirm(e.target.value)}/>

              <button className="bg-blue-500 text-white w-full mt-5 px-4 py-2 rounded-md hover:bg-sky-500 font-bold inline-block" onClick={onRegister}>{isLoading ? "Loading..":"Register"}</button> 
          </div>
          <p className="text-sm">Already have an account? <Link className="text-blue-500" to="/login">Login</Link> </p>
          <p className="text-sm"><Link className="text-blue-500" to="/">Back to home</Link> </p>
          
      </div> 
  </div> 
  )
}

export default Register