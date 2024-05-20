import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminMasterMedicine from './pages/admin/master-medicine/AdminMasterMedicine'
import AdminAddMedicine from './pages/admin/master-medicine/AdminAddMedicine'
import Admin from './pages/admin/Admin'
import AdminTransaction from './pages/admin/transaction/AdminTransaction'
import AdminDetailTransaction from './pages/admin/transaction/AdminDetailTransaction'
import User from './pages/user/User'
import UserHome from './pages/user/UserHome'
import UserTransaction from './pages/user/UserTransaction'
import UserDetailTransaction from './pages/user/UserDetailTransaction'
import AdminEditMedicine from './pages/admin/master-medicine/AdminEditMedicine'
import AdminMassAddMedicine from './pages/admin/master-medicine/AdminMassAddMedicine'

const NotFoundPage = ()=>{
  return <div>Page not found</div>
}

function App() { 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={LandingPage}/>
        <Route path="/login" Component={Login}/>
        <Route path="/register" Component={Register}/>
 
        <Route path="admin" Component={Admin}>
          <Route index Component={AdminMasterMedicine}/>
          <Route path="medicine/add" Component={AdminAddMedicine}/>
          <Route path="medicine/add/mass" Component={AdminMassAddMedicine}/>
          <Route path="medicine/:medicine_id" Component={AdminEditMedicine}/>
          <Route path="transaction" Component={AdminTransaction}/>
          <Route path="transaction/:id" Component={AdminDetailTransaction}/>
        </Route>
        
        <Route path="user" Component={User}>
          <Route index Component={UserHome}/> 
          <Route path="transaction" Component={UserTransaction}/>
          <Route path="transaction/:id" Component={UserDetailTransaction}/>
        </Route>

        {/* Not Found */}
        <Route path="*" Component={NotFoundPage}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
