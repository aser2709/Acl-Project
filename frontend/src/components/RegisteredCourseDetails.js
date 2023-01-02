import React from 'react'
import { useNavigate } from 'react-router-dom'
import Popup from './Popup';
import ReactPlayer from 'react-player';
import { useState } from 'react';
import { useCoursesContext } from '../hooks/useCoursesContext';
import ProgressBar from 'react-bootstrap/ProgressBar';


const RegisteredCourseDetails = ({course}) => {
  const navigate = useNavigate();
 const [buttonPopup,setButtonPopup] = useState(false);
 const {dispatch} = useCoursesContext()
 
    const handleClick = () =>{
      course.quizTaken = true
        console.log(course._id)
        window.location.href=`/subtitles/${course._id}?courseId=${course._id}`
    }
    const handleQuizClick = ()=>{
     
      localStorage.setItem('courseId',course._id)
      window.location.href=`/quiz?courseId=${course._id}`
      
    }
    var now = Math.floor(Math.random() * 100);
    
    
     
    
  return (
    
    <div className='course-details'>
      <h4 onClick={handleClick}>{course.title}</h4>
      <p><strong>Short Summary: </strong>{course.short_summary}</p>
      <button onClick={handleQuizClick}>Take Quiz</button>
     
      
      <ProgressBar now={now} label={`${now}%`} />

            
    </div>
  )
}

export default RegisteredCourseDetails
