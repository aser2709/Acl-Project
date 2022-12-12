import React from 'react'
import { useState } from 'react'

const Profile = () => {

  const [oldPassword,setOldPassword] = useState('');
  const [newPassword,setNewPassword] = useState('');
  const [error, setError] = useState(null)
  const [mssg, setMssg] = useState(null)
  


  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const getuser = JSON.parse(localStorage.getItem('user'));
      const email = getuser.email;
      const user = {email,oldPassword,newPassword};
      console.log(user);
      const response = await fetch('/api/user/change_password',{
      method: 'PATCH',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const json = await response.json()
    if(!response.ok){
      setError(json.error)
      setMssg(null)
    }
    if(response.ok){
      setNewPassword('')
      setOldPassword('')
      setError(null)
      setMssg(json.mssg)
      console.log('password change Successfully',json)
    }
    }
    catch(error){
      setError("Login First")
    }
    
  }

  return (
    <div className='change_password'>  
      <form onSubmit={handleSubmit}>
        <h1>Change Your Password</h1>
        <label>current password</label>
        <input type="password" 
        onChange={(e)=> setOldPassword(e.target.value)}
        value={oldPassword}/>
        <label>new password</label>
        <input type="password"
        onChange={(e)=> setNewPassword(e.target.value)}
        value={newPassword}/>
        <button>Change Password</button>
        {error && <div className='error'>{error}</div>}
        {mssg && <div className='mssg'>{mssg}</div>}
      </form>
    </div>
  )
}

export default Profile
