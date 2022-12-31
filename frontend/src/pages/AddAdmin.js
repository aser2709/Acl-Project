import { useState } from "react"
import { useAdminSignup } from "../hooks/useAdminSignup"

const Addadmin = () => {
  const [Password, setPassword] = useState('')
  const [Username, setUsername] = useState('')
  const {adminsignup, error, isLoading} = useAdminSignup()


  const handleSubmit = async (e) => {
    e.preventDefault()

    await adminsignup(Username,Password)
  } 

  return (
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

    
    
  )
}

export default Addadmin