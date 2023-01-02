import { Link, useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import React from 'react'
import Sidebar from './Sidebar'
import ReactFlagsSelect from "react-flags-select";
import { useState } from "react";
import SidebarTrainee from './SidebarTrainee'
import SidebarGuest from './SidebarGuest'
import SidebarAdmin from './SideBarAdmin'

const Navbar = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    window.location.reload(false);
    navigate('/');
    logout()
  }
  function Search() {
    navigate('/Search');
  }
  return (
    <header>

      <div className="container">
      {user && user.user_.userType==="Admin" && <SidebarAdmin/>}
      {user && user.user_.userType==="Instructor" && <Sidebar/>}
      {user && (user.user_.userType==="Individual trainee" || user.user_.userType==="Corporate trainee") && <SidebarTrainee/>}
      {!user && <SidebarGuest/>}
        <Link to="/">
          <h1>UdemyPlus</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav><nav>
        <nav>
        {user && (
            <div>
             <button onClick={Search}>Search</button>
            </div>
          )}
        </nav>
        </nav>
        <div className='menu-flags'>
        <ReactFlagsSelect
            selected={selected}
            onSelect={(code) => setSelected(code)}
            searchable={true}
            className="menu-flags"
          />
        </div>
      </div>
    </header>
  )
}

export default Navbar