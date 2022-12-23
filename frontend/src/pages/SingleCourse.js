import React from 'react'
import { useEffect, useState } from "react"
import { useCoursesContext} from "../hooks/useCoursesContext"
import CourseDetails from '../components/CourseDetails'
import { useAuthContext } from '../hooks/useAuthContext'


const SingleCourse = () => {
    const [rating, setRating] = useState('')
    const params = new URLSearchParams(window.location.search);
    const course_id = params.get('courseId');
    const {user} = useAuthContext()
    const {courses,dispatch}=useCoursesContext()
    
    const handleRating = async (e) => {
        e.preventDefault()
    
        const response = await fetch('api/courses/' + course_id,{
            method: 'POST',
            body: JSON.stringify({}) ,
            headers:{
                'Authorization': `Bearer ${user.token}`
             }
        })
        const json = await response.json()
    
        console.log(json)
      }
    


    useEffect(()=>{
        const fetchCourses = async () =>{
            const response = await fetch(`/api/courses/${course_id}`, {
                method: "GET",
                body: JSON.stringify(fetchCourses),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET-COURSES',payload: json})
            }
        }
        fetchCourses()
    }, [dispatch,course_id,user])
  return (
    <div className="home">
        <div className='courses'>
                {courses && 
                    <CourseDetails course={courses}/>
                    }
        </div>  
        <form className="signup" onSubmit={handleRating}>
        <label>Rate this course!:</label>
      <input 
        type="rating" 
        onChange={(e) => setRating(e.target.value)} 
        value={rating} 
      />
      <button>Rate</button>
     
        </form>
    </div>
  )
}

export default SingleCourse
