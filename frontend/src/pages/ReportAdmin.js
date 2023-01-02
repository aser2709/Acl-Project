import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"


import ReportAdminDetails from "../components/ReportAdminDetails"


const AdminReports = () =>{
    const {user} = useAuthContext()
    const {courses,dispatch}=useCoursesContext()
    
    

    useEffect(()=>{
        const fetchReports = async () =>{
        const response = await fetch('/api/reports/allReports', {
                method: 'GET',
                headers: {'Authorization': `Bearer ${user.token}`
            },
            })
            const json = await response.json()
            console.log(json)
            

            if(response.ok){
                dispatch({type:'SET-COURSES',payload: json})
            }


            
        }
        if(user){
            fetchReports()
            }
         }, [dispatch, user])    
    return (
        <div className="report-view">
    
            <div className="reports">

                { courses && Array.from(courses).map((report)=>(
                    <ReportAdminDetails key={courses._id} report={report}/>
                ))}
            </div>
             
            
        </div>
    )
}

export default AdminReports
