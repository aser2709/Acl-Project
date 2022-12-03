import React from 'react'
import { useEffect } from "react"
import { useCoursesContext} from "../hooks/useCoursesContext"
import CourseDetails from '../components/CourseDetails'



const SingleCourse = () => {

    const params = new URLSearchParams(window.location.search);
    const course_id = params.get('courseId');
    const {courses,dispatch}=useCoursesContext()
    

    useEffect(()=>{
        const fetchCourses = async () =>{
            const response = await fetch(`/api/courses/${course_id}`, {
                method: "GET",
                body: JSON.stringify(fetchCourses),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET-COURSES',payload: json})
            }
        }
        fetchCourses()
    }, [dispatch])
  return (
    <div className="home">
        <div className='courses'>
                {courses && 
                    <CourseDetails course={courses}/>
                    }
        </div>  
    </div>
  )
}

export default SingleCourse
