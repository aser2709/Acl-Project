import React from "react";


const RegisteredSubtitleDetails = ({subtitle}) =>{
    
    const handleClick= () =>{
        //console.log(subtitle._id)
        const id = subtitle._id
        const name = subtitle.name
        localStorage.setItem('subtitleId', {id,name})
    }
    return (
        <div className='course-details'>
          <h4 onClick={handleClick}>{subtitle.name}</h4>
          <p><strong>Id: </strong>{subtitle._id}</p>
        </div>
      )
}

export default RegisteredSubtitleDetails