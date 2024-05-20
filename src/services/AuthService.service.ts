import { NavigateFunction } from "react-router-dom"
import { accessToken, publicClient, setAccessToken } from "./_client"

type RegisterDRO = BaseDRO & {
  data: {
    name: string,
    password: string,
    role: string,
    user_id: number,
    username: string
  }
}
type LoginDRO = {
    access_token: string,
    name: string,
    role: string, 
    username: string
}

const AuthService = {
  login(username:string,password:string){
    return publicClient.post('/auth/login', {username, password})
  },
  saveUser(data:LoginDRO){
    localStorage.setItem('user', JSON.stringify(data))
    setAccessToken(data.access_token)
  },
  getUser(){
    let user = localStorage.getItem('user')
    if(!user) return null
    let parsedUser = JSON.parse(user)
    if(parsedUser.access_token && !accessToken) setAccessToken(parsedUser.access_token)
    return parsedUser
  },
  logout(nav:NavigateFunction){
    localStorage.removeItem('user')
    setAccessToken('')
    nav('/login')
  },
  registerUser(username:string,password:string,name:string,confirmationPassword:string){
   return publicClient.post('/auth/register', {username, password, name, confirmationPassword})
  },
  
  registerAdmin(username:string,password:string,name:string,confirmationPassword:string){
    return publicClient.post('/auth/register/admin', {username, password, name, confirmationPassword})
  }

}
export default AuthService