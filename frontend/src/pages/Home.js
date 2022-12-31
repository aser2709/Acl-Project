import { useEffect } from "react"
import { useCoursesContext} from "../hooks/useCoursesContext"
import { useAuthContext } from "../hooks/useAuthContext"
import {  useNavigate } from 'react-router-dom'

//components
import CourseDetails from "../components/CourseDetails"
import FilterForm from "../components/FilterForm"
import RegisteredCourseDetails from "../components/RegisteredCourseDetails"



const Home = () =>{
    const {courses,dispatch}=useCoursesContext()
    const {user} = useAuthContext()
    const navigate = useNavigate();

    const toNavigate = () => {
        navigate('/');
      }

    useEffect(()=>{
        if(user && user.user_.userType==="Instructor"){
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
        }
        if(user && (user.user_.userType==="Individual trainee" || user.user_.userType==="Corporate trainee")){
            const fetchCourses = async () =>{
                const response= await fetch('/api/user/registeredCourse/all',{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                        'body': user.email,
                    }
                })
                const json = await response.json()
                if(response.ok){
                    dispatch({type:'SET-COURSES',payload: json})}
            }
            if(user){
                fetchCourses()
            }
        }
        
    }, [dispatch, user])
    
    return (
        <div className="home">
            {!user && <div className='error'>Anuthorized to be here</div>}
            {!user && <div><button onClick={toNavigate}>Back to home page</button></div>}
            <div className="courses">
                {user && user.user_.userType==="Instructor" && courses && Array.from(courses).map((course)=>(
                    <CourseDetails key={course._id} course={course}/>
                ))
                }
                {
                   user && (user.user_.userType==="Individual trainee" || user.user_.userType==="Corporate trainee")
                   && courses &&courses.registeredCourses && Array.from(courses.registeredCourses).map((course)=>(
                    <RegisteredCourseDetails key={course._id} course={course}/>
                   ))
                }
            </div>
            { user && user.user_.userType==="Instructor" && <FilterForm/>}
        </div>
    )
}

export default Home