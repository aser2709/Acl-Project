import React from 'react'
import { useNavigate } from 'react-router-dom'

const RegisteredCourseDetails = ({course}) => {
  const navigate = useNavigate();

    const handleClick = () =>{
        console.log(course._id)
        window.location.href=`/subtitles/${course._id}?courseId=${course._id}`
    }
    const handleQuizClick = ()=>{
      localStorage.setItem('courseId',course._id)
      window.location.href=`/quiz?courseId=${course._id}`
    }
  return (
    <div className='course-details'>
      <h4 onClick={handleClick}>{course.title}</h4>
      <p><strong>Short Summary: </strong>{course.short_summary}</p>
      <button onClick={handleQuizClick}>Take Quiz</button>
    </div>
  )
}

export default RegisteredCourseDetails
