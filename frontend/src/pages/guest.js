import { useEffect } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"


//Components

import GuestCourses from "../components/guestCourses"




const Guest = () => {
const {courses, dispatch} = useCoursesContext()


useEffect(() => {
const fetchCourses = async () => {
    const response = await fetch('/api/guest')
    const json = await response.json()

    if(response.ok){
   dispatch({type:'SET_COURSES',payload: json})
     }
}

fetchCourses()


}, [dispatch])
    return (
        <div className="home">
            <div className="courses">
                {courses && courses.map((course) =>
               (
            <GuestCourses key={course._id} course={course} />
            ))}
            </div>
            
            <label>test</label>
        </div>
    )
}
export default Guest