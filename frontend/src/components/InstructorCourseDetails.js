import React from 'react'
import { useCoursesContext } from "../hooks/useCoursesContext"
import { useAuthContext } from "../hooks/useAuthContext"
import formatDistanceToNow from "date-fns/formatDistanceToNow"


const InstructorCourseDetails = ({course}) => {

    const {dispatch} = useCoursesContext()
    const {user} = useAuthContext()

    const handleNavigate = ()=>{
            window.location.href=`/createQuizcourse/${course._id}?courseId=${course._id}`
    }
    const NavigateSubtitle =()=>{
        window.location.href=`/instructorsubtitles/${course._id}?courseId=${course._id}`
    }
    const handleClick = async () =>{

        if(!user){
            return
        }
    
        const response = await fetch('api/courses/' + course._id,{
            method: 'DELETE',
            headers:{
                'Authorization': `Bearer ${user.token}`
             }
        })
        const json = await response.json()
    
        if (response.ok){
        dispatch({type:'DELETE_COURSE', payload: json})
        }
    }


  return (
    <div className="course-details">
            <h4 onClick={NavigateSubtitle}>{course.title}</h4>
            <p><strong>Short Summary: </strong>{course.short_summary}</p>
            <p><strong>Length (hours): </strong>{course.total_hours_course}</p>
            <p><strong>Subject: </strong>{course.subject}</p>
            <h1 className="h1-price">Price: {course.price}</h1>
            <p>{formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
            <button className='create-course-quiz' onClick={handleNavigate}>Create Quiz</button>
    </div>
  )
}

export default InstructorCourseDetails
