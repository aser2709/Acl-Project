import React from 'react'
import { useEffect } from "react"
import { useCoursesContext} from "../hooks/useCoursesContext"
import { useAuthContext } from "../hooks/useAuthContext"
import {  useNavigate } from 'react-router-dom'


//components
import InstructorCourseDetails from '../components/InstructorCourseDetails'
import FilterForm from "../components/FilterForm"



export const InstructorCourses = () => {
    const {courses,dispatch}=useCoursesContext()
    const {user} = useAuthContext()
    
    
    const navigate = useNavigate();

    const toNavigate = () => {
        navigate('/');
      }

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
    <div className='home'>
        {!user && <div className='error'>Anuthorized to be here</div>}
        {!user && <div><button onClick={toNavigate}>Back to home page</button></div>}
        <div className="courses">
                {user && user.user_.userType==="Instructor" && courses && Array.from(courses).map((course)=>(
                    <InstructorCourseDetails key={course._id} course={course}/>
                ))
                }
            </div>
            { user && user.user_.userType==="Instructor" && <FilterForm/>}

    </div>
  )
}
