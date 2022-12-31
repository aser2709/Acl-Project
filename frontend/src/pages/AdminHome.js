import React from 'react'
import { useNavigate } from 'react-router-dom'



const AdminHome = () =>{
    
  const navigate = useNavigate();

  const toAddUser = () => {
    navigate('/adduser');}
    const toAddAdmin = () => {
        navigate('/addadmin');}
    return (
        <div className="">
        <button className='Support_Button' onClick={toAddUser}>Add User</button>
        <button className='Support_Button' onClick={toAddAdmin}>Add Admin</button>
         <button className='Support_Button' onClick={toAddAdmin}>Refund</button>
         <button className='Support_Button' onClick={toAddAdmin}>Problems</button>
         <button className='Support_Button' onClick={toAddAdmin}>Requests</button>
         <button className='Support_Button' onClick={toAddAdmin}>Access</button>
         <button className='Support_Button' onClick={toAddAdmin}>Set Promotions</button>
            
        </div>
    )
}

export default AdminHome