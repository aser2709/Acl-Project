import { Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'


//date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow"




const RequestAdminDetails = ({request,}) => {
    
    const navigate = useNavigate();
    const {user} = useAuthContext();
    const resolve = () =>{const fetchRequests = async () =>{
        const resolve = {"Request":true};
        const response = await fetch(`/admin/${request._id}`, {
                method: 'PATCH',
                body:JSON.stringify(resolve),
                headers: {'Authorization': `Bearer ${user.token}`,
                
                'Content-Type': 'application/json',

            },
            })
            const json = await response.json()
            console.log(json)

    }

    fetchRequests()
}

    





    return (
        <div className="course-details">
            <h4>{request.course_name}</h4>
            <p><strong>User Email: </strong>{request.Email}</p>
            
            {
                request.Request==false &&
                <p><strong>Status:</strong><div class = "unresolved"> Can't be Accessed </div></p>
            
            }
            {
                request.Request==true && 
                <p><strong>Status:</strong><div class = "resolved"> Can be Accessed </div></p>
            }
            <button className="resolve_button" onClick={resolve}>Grant Access</button>
        </div>
    )
}

export default RequestAdminDetails