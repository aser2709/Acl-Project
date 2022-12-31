import { useEffect } from "react"
import { useCoursesContext} from "../hooks/useCoursesContext"
import { useAuthContext } from "../hooks/useAuthContext"

//components
import CourseDetails from "../components/CourseDetails"




const instructorProfile = () => {
    const {courses,dispatch}=useCoursesContext()
    const {user} = useAuthContext()
    

    useEffect(()=>{
        const fetchCourses = async () =>{
            const response = await fetch('/api/courses', {
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
        <div className="instructor">
            <div className="info">
              

            </div>
    
            <div className="courses">
                {courses && courses.map((course)=>(
                    <CourseDetails key={course._id} course={course}/>
                ))}
            </div>
        
            
        </div>
    )
}

export default instructorProfile
    
