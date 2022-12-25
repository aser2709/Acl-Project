import React from 'react'
import { useEffect, useState } from "react"
import { useCoursesContext} from "../hooks/useCoursesContext"
import SingleCourseDetails from '../components/SingleCourseDetails'
import { useAuthContext } from "../hooks/useAuthContext"

import { useNavigate } from 'react-router-dom'


const SingleCourse = () => {
    const [rating, setRating] = useState('')
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const course_id = params.get('courseId');
    const {user} = useAuthContext()
    const {courses,dispatch}=useCoursesContext()
    
    const [text, setText] = useState('Join Course')
    
    const handleRating = async (e) => {
        e.preventDefault()
    
        const response = await fetch('api/courses/' + course_id,{
            method: 'POST',
            body: JSON.stringify({rating}) ,
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
        if(user){
            fetchCourses()
            }
    }, [dispatch,course_id,user])
        
    
    const mouseEnter = () =>{
        if(courses){
            setText(courses.price)
            }
    }
    const mouseLeave = () =>{
        setText('Join Course')
    }
    const toNavigate = () => {
        navigate('/pay');
    }
  return (
    <div className="home">
   
        <div className='courses'>
                {courses && 
                    <SingleCourseDetails course={courses}/>
                }
                <div className='subtitles-single-course'>
                    {courses && <strong>Subtitles: </strong>}
                        <div className='subtitle-single-course'>
                            {courses &&
                                Array.from(courses.subtitle).map((courses) =>(
                                <p>{courses.name}</p>
                                ))}
                        </div>
                        </div>
                      
                
                {
                    user && user.user_.userType=="Individual trainee" &&<button className='join-course' onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onClick={toNavigate}>{text}</button>
                }
        </div>  
        <form className='Rate' onSubmit={handleRating}>
                        <label>Rate this course!</label>
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
