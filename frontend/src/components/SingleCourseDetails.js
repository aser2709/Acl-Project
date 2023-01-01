import React, { useEffect } from 'react'
import ReactPlayer from 'react-player/youtube'
import { useState } from 'react'
import { useCoursesContext } from "../hooks/useCoursesContext"
import { useAuthContext } from "../hooks/useAuthContext"


const SingleCourseDetails = ({ course }) => {
  const { user } = useAuthContext()
  const { dispatch } = useCoursesContext()
  const ref = React.createRef();
  const options = {
    orientation: 'portrait',
    unit: 'cm',
    format: [10, 10.6]
  };
  const url = `${course.video_preview}`;

  const [instructorRating, setInstructorRating] = useState(0)

  const calc_ratings = (ratings) => {
    let total = 0.0
    let count = 0.0
    for (let rating in ratings) {
      total += parseFloat(rating)
      count += 1.0
    }

    return parseFloat(total) / parseFloat(count)

  }


  useEffect(() => {
    const fetchCourses = async () => {
        const response = await fetch('/api/user/viewRating/' + course.user_id, {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'SET-COURSES', payload: json })
        }
    }

}, [])

  return (
    <div className='single-course-details' ref={ref}>
      <h4 className='course-title-single'>{course.title}</h4>
      <div>
        <ReactPlayer url={url} controls={true} width={980} height={630} />
        <div className='short_description'>
          {course.short_summary}
        </div>
      </div>
      <p><strong>Length (hours): </strong>{course.total_hours_course}</p>
      <p><strong>Subject: </strong>{course.subject}</p>
      <p><strong>Instructor: </strong>{course.instructor}</p>
      

    </div>
  )
}

export default SingleCourseDetails
