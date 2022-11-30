import { useEffect } from "react"
import { useCoursesContext} from "../hooks/useCoursesContext"
import { useAuthContext } from "../hooks/useAuthContext"

//components
import CourseDetails from "../components/CourseDetails"
import FilterForm from "../components/FilterForm"



const Home = () =>{
    const {courses,dispatch}=useCoursesContext()
    

    useEffect(()=>{
        const fetchCourses = async () =>{
            const response = await fetch('/api/courses')
            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET-COURSES',payload: json})
            }
        }

        fetchCourses()
    }, [dispatch])


    return (
        <div className="home">
    
            <div className="courses">
                {courses && courses.map((course)=>(
                    <CourseDetails key={course._id} course={course}/>
                ))}
            </div>
        
            <FilterForm/>
            
        </div>
    )
}

export default Home