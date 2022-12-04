import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

import { useAdminsignup } from "../hooks/useAdminsignup"

const AdminHome = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [userType, setUserType] = useState('')
  const {signup, error, isLoading} = useSignup()


  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password, firstName,lastName,username,userType)
    await admin(Username,Password)
  } 

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Add User</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
        <label>First Name</label>
            <input
            type="text"
            onChange={(e)=> setFirstName(e.target.value)}
            value={firstName}
            />
            <label>Last Name</label>
            <input
            type="text"
            onChange={(e)=> setLastName(e.target.value)}
            value={lastName}
            />
            <label>Username</label>
            <input
            type="text"
            onChange={(e)=> setUsername(e.target.value)}
            value={username}
            />
            <label>Register as:</label>
            <select name="SubjectName" onChange={(e)=> setUserType(e.target.value)}
            value={userType}>
            <option value="">Choose a Type</option>
            <option value="Instructor">Instructor</option>
            <option value="Individual trainee">Individual trainee</option>
            <option value="Corporate trainee">Corporate trainee</option>
            </select>

      <button disabled={isLoading}>Add User</button>
      {error && <div className="error">{error}</div>}
    </form>

    
    
  )
}

export default AdminHome