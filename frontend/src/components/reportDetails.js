import { Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react"


//date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow"




const reportDetails = ({report}) => {


    const {user} = useAuthContext();
    const {dispatch} = useCoursesContext()


// const close = async () => {
//     const title = course.title
//     const subtitle = course.subtitle
//     const _id = course._id
//     const short_summary = course.short_summary
//     const  xCourse = {title,subtitle,short_summary,_id}
//     const email = user.email
//     const RCourse = {xCourse,email}
//         const response = await fetch('api/user/registerCourse',{
//             method: 'PATCH',
//             body: JSON.stringify(RCourse),
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${user.token}`
//             }
//         })
//         if(response.ok)
//         {
//             console.log("Course Registered")
//             setButtonPopup(false);
//         }
// }


    return (
        <div className="reports-details">
            <h4>{report.course_id}</h4>
            <p><strong>Type: </strong>{report.Type}</p>
            <p><strong>Body: </strong>{report.Body}</p>
            <p>{formatDistanceToNow(new Date(report.createdAt), {addSuffix: true})}</p>
            {
                user && report.resolved=="false" && 
                <p><strong>Status: Unresolved </strong>{report.Body}</p>
            
            }
            {
                user && report.resolved=="false" && 
                <p><strong>Status: Resolved </strong>{report.Body}</p>
            }
        </div>
    )
}

export default reportDetails