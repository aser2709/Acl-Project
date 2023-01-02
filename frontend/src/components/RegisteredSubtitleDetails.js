import React from "react";
import { useNavigate } from 'react-router-dom'
import Popup from './Popup';
import ReactPlayer from 'react-player';
import { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
 var now = 0
const RegisteredSubtitleDetails = ({subtitle}) =>{
  const [buttonPopup,setButtonPopup] = useState(false);

  
const url = `${subtitle.youtube[0].youtubelink}`;
 
  subtitle.now = now
   const watchVideo = async () => {
    setButtonPopup(true);
    subtitle.videoWatched = true

   }
   if(subtitle.videoWatched){
    if(now < 100)
    now+=25
   }
    
    const handleClick= () =>{
        //console.log(subtitle._id)
        console.log(subtitle.name)
        
        
    }
    const handleQuizClick = ()=>{
      localStorage.setItem('courseId',subtitle._id)
      window.location.href=`/subtitlequiz?subtitleId=${subtitle._id}&subtitleName=${subtitle.name}`
      subtitle.quizTaken = true;
    }
    if(subtitle.quizTaken){
      if(now < 100)
      now+=25
     }
    return (
        <div className='course-details'>
           <ProgressBar now={now} label={`${now}%`} />
          <h4 onClick={handleClick}>{subtitle.name}</h4>
          <p><strong>Id: </strong>{subtitle._id}</p>
          <button onClick={handleQuizClick}>Take Quiz</button>
          <button className="buy-course" onClick={watchVideo}>Watch Video</button>

          <Popup className=".popup-vid" trigger={buttonPopup} setTrigger={setButtonPopup}>
            <ReactPlayer url={url} controls={true} width={720} height={480}/>
            </Popup>
        </div>
      )
}
export var now
export default RegisteredSubtitleDetails