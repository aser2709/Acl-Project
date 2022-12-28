import React from 'react'

const RegisteredCourseDetails = ({course}) => {

    const handleClick = () =>{
        console.log(course._id)
    }
  return (
    <div className='course-details'>
      <h4 onClick={handleClick}>{course.title}</h4>
      <p><strong>Short Summary: </strong>{course.short_summary}</p>
    </div>
  )
}

export default RegisteredCourseDetails
