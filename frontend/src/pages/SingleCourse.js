import React from 'react'
import { useEffect } from "react"
import { useCoursesContext} from "../hooks/useCoursesContext"
import SingleCourseDetails from '../components/SingleCourseDetails'
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'


const SingleCourse = () => {
    
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const course_id = params.get('courseId');
    const {courses,dispatch}=useCoursesContext()
    const {user} = useAuthContext()
    const [text, setText] = useState('Join Course')
    
    useEffect(()=>{
        const fetchCourses = async () =>{
            const response = await fetch(`/api/courses/${course_id}`, {
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
    }, [dispatch,user])
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
    </div>
  )
}

export default SingleCourse
