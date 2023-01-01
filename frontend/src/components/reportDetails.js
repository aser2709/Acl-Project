import { Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react"


//date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow"




const ReportDetails = ({report}) => {





    return (
        <div className="course-details">
            <h4>{report.course_name}</h4>
            <p><strong>Type: </strong>{report.Type}</p>
            <p><strong>Body: </strong>{report.Body}</p>
            
            {
                report.resolved==false &&
                <p><strong>Status:</strong><div class = "unresolved">Pending </div></p>
            
            }
            {
                report.resolved==true && 
                <p><strong>Status:</strong><div class = "resolved">Resolved </div></p>
            }
        </div>
    )
}

export default ReportDetails