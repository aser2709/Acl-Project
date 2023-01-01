import { useEffect } from "react"
import { useCoursesContext} from "../hooks/useCoursesContext"
import { useAuthContext } from "../hooks/useAuthContext"


//components
import CourseDetails from "../components/CourseDetails"
import FilterForm from "../components/FilterForm"




const YourCourses = () =>{
    const {courses,dispatch}=useCoursesContext()
    const {user} = useAuthContext()
    const GuestToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk1ZDdkNDM0MmQ2NTUxY2ViODdmZDAiLCJpYXQiOjE2NzIzMzkwMTcsImV4cCI6MTY3MjU5ODIxN30.zdRMhR6GflLf6QI28SfgeZMISMc9sMtNGUFec-wn1C4'
    

    useEffect(()=>{
        const fetchCourses = async () =>{
            const response = await fetch('/api/courses/courses', {
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()
            if(response.ok){
                dispatch({type:'SET-COURSES',payload: json})
            }
            
        }
        const fetchGuest = async () =>{
            const response = await fetch('/api/courses/courses', {
                headers: {'Authorization': `Bearer ${GuestToken}`},
            })
            const json = await response.json()
            if(response.ok){
                dispatch({type:'SET-COURSES',payload: json})
            }
           
    
        }
        if(!user){
            fetchGuest()
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