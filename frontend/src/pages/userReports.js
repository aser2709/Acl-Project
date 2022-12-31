import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"


import ReportDetails from "../components/reportDetails"


const UserReports = () =>{
    const {user} = useAuthContext()
    const {courses,dispatch}=useCoursesContext()
    
    

    useEffect(()=>{
        const fetchReports = async () =>{
        const userEmail = user.email;
        const response = await fetch('/api/reports/yourReports', {
                method: 'GET',
                headers: {'Authorization': `Bearer ${user.token}`,
                email: userEmail
            },
            })
            const json = await response.json()
            

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
                    <ReportDetails key={courses} report={report}/>
                ))}
            </div>
             
            
        </div>
    )
}

export default UserReports
