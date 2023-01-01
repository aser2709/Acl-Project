import React from "react";
import { useNavigate } from 'react-router-dom'


const RegisteredSubtitleDetails = ({subtitle}) =>{
    
    const handleClick= () =>{
        //console.log(subtitle._id)
        console.log(subtitle.name)
        
        
    }
    const handleQuizClick = ()=>{
      localStorage.setItem('courseId',subtitle._id)
      window.location.href=`/subtitlequiz?subtitleId=${subtitle._id}&subtitleName=${subtitle.name}`
    }
    return (
        <div className='course-details'>
          <h4 onClick={handleClick}>{subtitle.name}</h4>
          <p><strong>Id: </strong>{subtitle._id}</p>
          <button onClick={handleQuizClick}>Take Quiz</button>
        </div>
      )
}

export default RegisteredSubtitleDetails