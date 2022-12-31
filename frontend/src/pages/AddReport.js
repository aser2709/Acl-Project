import React from 'react'
import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

import { useNavigate } from 'react-router-dom'


const Addreport = (req,res) => {
    const [Type, setType] = useState('')
    const [Body, setBody] = useState('')
    const [error, setError] = useState(null)
    const { user } = useAuthContext()
    //const {adminsignup, error, isLoading} = useAdminSignup()
  
  
    const handleSubmit = async (e) => {
      
      e.preventDefault()
      const userEmail = user.email;
      const params = new URLSearchParams(window.location.search);
      const courseId = params.get('courseId');
      console.log(courseId);
      const Rreports = {userEmail,courseId,Type,Body}
      

      const response = await fetch('api/reports/createReport',{
        method: 'POST',
        body: JSON.stringify(Rreports),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    })
    if(response.ok)
    {
        console.log("Report Added")
    }
     
    } 

    return (
        <form className="report" onSubmit={handleSubmit}>
          <h3>Add Report</h3>
          
          <label>Type</label>
      <select name="reportType" onChange={(e) => setType(e.target.value)}
           value={Type}>
        <option value="">Choose Report Type</option>
        <option value="Technical">Technical</option>
        <option value="Financial">Financial</option>
        <option value="Other">Other</option>
      </select>
          <label>Write your problem:</label>
          <input 
            type="text" 
            onChange={(e) => setBody(e.target.value)} 
            value={Body} 
          />
          <button>Add Report</button>
          {error && <div className="error">{error}</div>}
        </form>
    
        
        
      )
    }

    export default Addreport