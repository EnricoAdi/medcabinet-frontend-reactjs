import { useEffect, useState } from 'react'
import UserNavbar from './components/UserNavbar'
import { Outlet, useNavigate } from 'react-router-dom'
import AuthService from '../../services/AuthService.service'
import ROLE from '../../enums/RoleEnum'

const User = () => {
  const [name, setName] = useState('...')
  const nav = useNavigate()
  useEffect(()=>{
    let user = AuthService.getUser()
    // console.log(user.role)
    if(user && user.role==ROLE.USER) setName(user.name)
    else nav('/login')
  })
  return (
    <div className="h-screen bg-sky-100">
      <UserNavbar name={name}/>
      <Outlet/>
    </div>
  )
}

export default User