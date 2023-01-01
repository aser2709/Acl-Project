import React from 'react'
import { useState,useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'


const Profile = () => {

  const [oldPassword,setOldPassword] = useState('');
  const [newPassword,setNewPassword] = useState('');
  const [error, setError] = useState(null)
  const [EmailError,setEmailError]  = useState(null);
  const [biographyError,setBiographyError]  = useState(null);
  const [mssg, setMssg] = useState(null)
  const [mssgEmail, setMssgEmail] = useState(null)
  const [mssgBio, setMssgBio] = useState(null)
  const { user } = useAuthContext()
  const navigate = useNavigate();
  const { logout } = useLogout()
  const [newEmail, setNewEmail] = useState("")
  const [biography,setBiography] = useState("")
  const toNavigate = () => {
    navigate('/');
  }

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
  const handleChange = async (e) =>{
    e.preventDefault();
    try{
      const getuser = JSON.parse(localStorage.getItem('user'));
      const email = getuser.email;
      const user = {email, newEmail};
      console.log(user);
      const response = await fetch('/api/user/change_email',{
      method: 'PATCH',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const json = await response.json()
    if(!response.ok){
      setEmailError(json.error)
      setMssgEmail(null)
    }
    if(response.ok){
      setNewEmail("")
      setEmailError(null)
      setMssgEmail(json.mssg)
      console.log('Email changed',json)
      window.location.reload(false);
      logout()
    }
    }
    catch(error){
      setEmailError("Login First")
    }

  }
  const handleNew = async (e) =>{
    e.preventDefault();
    try{
      const getuser = JSON.parse(localStorage.getItem('user'));
      const email = getuser.email;
      const user = {email, biography};
      console.log(user);
      const response = await fetch('/api/user/change_biography',{
      method: 'PATCH',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const json = await response.json()
    if(!response.ok){
      setBiographyError(json.error)
      setMssgBio(null)
    }
    if(response.ok){
      setBiographyError(null)
      setMssgBio(json.mssg)
      console.log('Biography Changed',json)
    }
    }
    catch(error){
      setError("Login First")
    }

  }



  

  

  useEffect(()=>{
    const fetchBiography = async() => {
      const getuser = JSON.parse(localStorage.getItem('user'));
      const email = getuser.email;
      const response = await fetch('/api/user/get_biography/bio', {
            method: "GET",
            
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
                'body' : email
                
            }
        })
        const json = await response.json()
        console.log(json)
        setBiography(json[0].biography)
    }
   
    if(user){
    fetchBiography()
    }
}, [user])


  return (
    <>
    { user &&
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
      { user && user.user_.userType==="Instructor" && 
      <form onSubmit={handleChange}>
      <h1>Change Your Email</h1>
       
        <label>new Email</label>
        <input type="text"
        onChange={(e)=> setNewEmail(e.target.value)}
        value={newEmail}/>
        <button>Change Email</button>
        {EmailError && <div className='error'>{EmailError}</div>}
        {mssgEmail && <div className='mssg'>{mssgEmail}</div>}
      </form>
      }
      {user && user.user_.userType==="Instructor" && 
      <form onSubmit={handleNew}>
      <h1>Change Your Biography</h1>
       
        <label>edit Biography</label>
        <input type="text"
        onChange={(e)=> setBiography(e.target.value)}
        value={biography}/>
        <button>Change Biography</button>
        {biographyError && <div className='error'>{biographyError}</div>}
        {mssgBio && <div className='mssg'>{mssgBio}</div>}
      </form>
      }
    </div>
  }
  {!user && <div className='error'>Anuthorized to be here</div>}
  {!user && <div><button onClick={toNavigate}>Back to home page</button></div>}
  </>


  )
}

export default Profile
