import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useService from '../../hooks/useService';
import AuthService from '../../services/AuthService.service';
import ROLE from '../../enums/RoleEnum';

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false) 
  const nav = useNavigate()
  
  const onLogin = async()=>{
    if(username=="" || password==""){
      alert("Please provide complete data")
      return
    }
    setIsLoading(true)
    
    let result = await useService(AuthService.login(username, password), nav, undefined, undefined,true,undefined,false)
    if(result){
      let {access_token, name, username, role} = result.data
      AuthService.saveUser({access_token, name, username, role})
      if(role==ROLE.ADMIN) nav("/admin")
      else nav("/user")
    }    
    setIsLoading(false)
  }
  useEffect(()=>{
    let user = AuthService.getUser()
    if(user){
      if(user.role==ROLE.ADMIN) nav("/admin")
      else nav("/user")
    }
  },[])
  return (
    <div className="bg-sky-700 h-screen flex justify-center py-44"> 
      <div className="px-4 py-5 bg-white rounded-md h-fit">
          <h2 className="text-2xl text-center font-bold">LOGIN</h2> 
          <div className="mb-3 mt-5"> 
              <div className="text-sm">Username</div>
              <input type="text" className="border-2 rounded w-full p-1" onChange={(e)=>setUsername(e.target.value)}/>

              <div className="text-sm mt-2 mb-1">Password</div>
              <input type="password" className="border-2 rounded w-full p-1" onChange={(e)=>setPassword(e.target.value)}/>
  
              <button className="bg-blue-500 text-white w-full mt-5 px-4 py-2 hover:bg-sky-500 rounded-md font-bold inline-block" onClick={onLogin}>{isLoading? "Loading..":"Login"}</button> 
          </div>
          <p className="text-sm">Don't have an account? <Link className="text-blue-500" to="/register">Register Now</Link> </p>  
          <p className="text-sm"><Link className="text-blue-500" to="/">Back to home</Link> </p>
          
      </div> 
  </div> 
  );
}

export default Login