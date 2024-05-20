import React, { useEffect } from 'react'
import AdminNavbar from './components/AdminNavbar'
import { Outlet, useNavigate } from 'react-router-dom'
import AuthService from '../../services/AuthService.service'
import ROLE from '../../enums/RoleEnum'

const Admin: React.FC = () => {
  const nav = useNavigate()
  useEffect(()=>{
    let user = AuthService.getUser()
    if(!user || user.role!=ROLE.ADMIN) nav('/login')
  })
  return (
    <div className="h-screen bg-sky-100">
      <AdminNavbar/>
      <Outlet/>
    </div>
  )
}

export default Admin