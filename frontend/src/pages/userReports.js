import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react"


import reportDetails from "../components/reportDetails"


const YourCourses = () =>{
    const {courses,dispatch}=useCoursesContext()
    const {user} = useAuthContext()
    

    useEffect(()=>{
        const fetchCourses = async () =>{
            const response = await fetch('/api/reports/yourReports', {
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET-COURSES',payload: json})
            }
            
        }
        if(user){
            fetchCourses()
            }
    }, [dispatch, user])    
    return (
        <div className="home">
    
            <div className="courses">
                {courses && Array.from(courses).map((course)=>(
                    <CourseDetails key={course._id} course={course}/>
                ))}
            </div>
             
            <FilterForm/>
            
        </div>
    )
}

export default YourCourses
