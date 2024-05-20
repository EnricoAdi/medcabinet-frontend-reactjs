import { Link, useNavigate } from "react-router-dom"
import AuthService from "../../../services/AuthService.service"

const AdminNavbar = () => {
  const nav = useNavigate()
  const onLogout = ()=>{
    AuthService.logout(nav)
  }
  return (
    <div className="h-12 w-full bg-sky-500 text-white text-sm ">
        <div className="absolute top-3 px-20 font-bold">Welcome, Admin!</div>

        <div className="top-3 flex justify-end h-full items-center mr-24 space-x-4">
          <Link to="/admin">Medicine</Link>
          <Link to="/admin/transaction">Transaction</Link>
          <button className="bg-red-600 rounded-md text-xs px-3 py-2 hover:bg-red-700 font-bold inline-block" onClick={onLogout}>Logout</button> 
        </div>

     </div>
  )
}

export default AdminNavbar