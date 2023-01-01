import { useState } from "react"
import { useAdminSignup } from "../hooks/useAdminSignup"
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

const Addadmin = () => {
  const [Password, setPassword] = useState('')
  const [Username, setUsername] = useState('')
  const {adminsignup, error, isLoading} = useAdminSignup()
  const { user } = useAuthContext()
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault()

    await adminsignup(Username,Password)
  }
  const toNavigate = () => {
    navigate('/');
} 

  return (
    <>
    { user && user.user_.userType==="Admin" &&
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Add Admin</h3>
      
      <label>Username</label>
            <input
            type="text"
            onChange={(e)=> setUsername(e.target.value)}
            value={Username}
            />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={Password} 
      />
      <button disabled={isLoading}>Add Admin</button>
      {error && <div className="error">{error}</div>}
    </form>
  }
    {!user && <div className='error'>Anuthorized to be here</div>}
    {!user && <div><button onClick={toNavigate}>Back to home page</button></div>}
    {user && !(user.user_.userType==="Admin") && <div className='error'>Anuthorized to be here</div>}
    {user && !(user.user_.userType==="Admin") && <div><button onClick={toNavigate}>Back to home page</button></div>}
</>
    
  )
}

export default Addadmin