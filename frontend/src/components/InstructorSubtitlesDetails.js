import React from "react";
import { useNavigate } from 'react-router-dom'


const InstructorSubtitlesDetails = ({subtitle}) =>{
    const handleClick = () =>{
        console.log(subtitle.name)
    }
    const handleQuizClick = ()=>{
        localStorage.setItem('courseId',subtitle._id)
        window.location.href=`/createQuizsubtitle/${subtitle._id}?subtitleId=${subtitle._id}`
    }
    return (
        <div className='course-details'>
          <h4 onClick={handleClick}>{subtitle.name}</h4>
          <p><strong>Id: </strong>{subtitle._id}</p>
          <button onClick={handleQuizClick}>Create Quiz</button>
        </div>
      )

}

export default InstructorSubtitlesDetails