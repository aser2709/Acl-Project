import React from 'react'
import ReactPlayer from 'react-player/youtube'
import { useCoursesContext} from "../hooks/useCoursesContext"


const SingleCourseDetails = ({course}) => {

    const {dispatch} = useCoursesContext()
    const ref = React.createRef();
    const options = {
        orientation: 'portrait',
        unit: 'cm',
        format: [10,10.6]
      };
    const url = `${course.video_preview}`;

  return (
    <div className='single-course-details' ref={ref}>
        <h4 className='course-title-single'>{course.title}</h4>
        <div>
            <ReactPlayer url={url} controls={true} width={980} height={630}/>
                <div className='short_description'>
                    {course.short_summary}
                </div>
        </div>
        <p><strong>Length (hours): </strong>{course.total_hours_course}</p>
        <p><strong>Subject: </strong>{course.subject}</p>
        <p><strong>Rating: </strong>{course.rating.get}</p>
        <p><strong>Instructor: </strong>{course.instructor}</p>
    </div>
  )
}

export default SingleCourseDetails
