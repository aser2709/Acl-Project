import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

const Support = () => {
  const { user } = useAuthContext()
  const navigate = useNavigate();

  const toNavigate = () => {
    navigate('/');
}
  return (
    <div>
      {user && (user.user_.userType==="Individual trainee" || user.user_.userType==="Corporate trainee") &&<button className='Support_Button'>Request a refund</button>}
      {!user && <div className='error'>Anuthorized to be here</div>}
      {!user && <div><button onClick={toNavigate}>Back to home page</button></div>}
    </div>
  )
}
export default Support
