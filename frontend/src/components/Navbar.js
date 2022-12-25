import { Link, useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import React from 'react'
import Sidebar from './Sidebar'
import ReactFlagsSelect from "react-flags-select";
import { useState } from "react";
import SidebarTrainee from './SidebarTrainee'
import SidebarGuest from './SidebarGuest'

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
  return (
    <header>
      <div className="container">
      {!user && <SidebarGuest/>}
        {user && user.user_.userType==="Instructor" && <Sidebar/>}
        {user && (user.user_.userType==="Individual trainee" || user.user_.userType==="Corporate trainee") && <SidebarTrainee/>}
        <Link to="/">
          <h1>Coree</h1>
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
          <ReactFlagsSelect
            selected={selected}
            onSelect={(code) => setSelected(code)}
          />
        </nav>
      </div>
    </header>
  )
}

export default Navbar