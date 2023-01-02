import { Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'


//date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow"




const ReportAdminDetails = ({report}) => {
    
    const navigate = useNavigate();
    const {user} = useAuthContext();
    const resolve = () =>{const fetchReports = async () =>{
        const resolve = {"resolved":true};
        const response = await fetch(`/api/reports/${report._id}`, {
                method: 'PATCH',
                body:JSON.stringify(resolve),
                headers: {'Authorization': `Bearer ${user.token}`,
                
                'Content-Type': 'application/json',

            },
            })
            const json = await response.json()
            console.log(json)

    }

    fetchReports()
}
    const seen = () =>{const fetchReports = async () =>{
    const resolve = {"unseen":false};
    const response = await fetch(`/api/reports/${report._id}`, {
            method: 'PATCH',
            body:JSON.stringify(resolve),
            headers: {'Authorization': `Bearer ${user.token}`,
            
            'Content-Type': 'application/json',

        },
        })
        const json = await response.json()
        console.log(json)

}

fetchReports()
}


    





    return (
        <div className="course-details">
            <h4>{report.course_name}</h4>
            <p><strong>Type: </strong>{report.Type}</p>
            <p><strong>Body: </strong>{report.Body}</p>
            {
                report.unseen==true &&
                <p><strong>Status:</strong><div class = "unresolved">unseen </div></p>
            
            }
            {
                report.unseen==false && 
                <p><strong>Status:</strong><div class = "resolved">Seen </div></p>
            }
            
            {
                report.resolved==false &&
                <p><strong>Status:</strong><div class = "unresolved">Pending </div></p>
            
            }
            {
                report.resolved==true && 
                <p><strong>Status:</strong><div class = "resolved">Resolved </div></p>
            }
            <button className="resolve_button" onClick={resolve}>resolve</button>
            <button className="seen_button" onClick={seen}>seen</button>
        </div>
    )
}

export default ReportAdminDetails