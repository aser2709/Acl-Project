import { Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'


//date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow"




const RequestAdminDetails = ({request}) => {
    
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
    const fetchCourse = async() =>{
        const response = await fetch(`/api/courses/${request.course_id}`,{
            method: 'GET',
            headers: {'Authorization': `Bearer ${user.token}`,
            
            'Content-Type': 'application/json',

        },
        })
        const json = await response.json()
        console.log(json._id)
        if(response.ok){
            const title = json.title
            const subtitle = json.subtitle
            const _id = json._id
            const short_summary = json.short_summary
            const xCourse = {title,subtitle,short_summary,_id}
            const email = request.Email
            const RCourse = {xCourse,email}
                const addCourse = await fetch('api/user/registerCourse',{
                    method: 'PATCH',
                    body: JSON.stringify(RCourse),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                if(addCourse.ok)
                {
                    fetchRequests()
                }

        }
    }
    fetchCourse()
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