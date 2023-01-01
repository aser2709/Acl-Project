import { useState } from "react"
import { useAdminLogin } from "../hooks/useAdminLogin"
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'


const Adminlogin = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext()
  const toHome = () => {
    if (user){
    navigate('/');}}
  const [Username, setUsername] = useState('')
  const [Password, setPassword] = useState('')
  const {adminlogin, error, isLoading} = useAdminLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await adminlogin(Username, Password)
  }

  return (
    
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Login Admin</h3>
      
      <label>Username:</label>
      <input 
        type="Username" 
        onChange={(e) => setUsername(e.target.value)} 
        value={Username} 
      />
      <label>Password:</label>
      <input 
        type="Password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={Password} 
      />
      <button disabled={isLoading}onClick={toHome} >Login Admin</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Adminlogin