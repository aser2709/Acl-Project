import { useCoursesContext } from '../hooks/useCoursesContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const GuestCourses = ({ course }) => {
  const { dispatch } = useCoursesContext()

 

  return (
    <div className="Course-details">
      <h4 onClick={() => window.location.href=`/login`}>{course.title}</h4>
            <p><strong>Short Summary: </strong>{course.short_summary}</p>
            <p><strong>Length (hours): </strong>{course.total_hours_course}</p>
            <p><strong>Instructor: </strong>{course.instructor}</p>
            <p><strong>Subject: </strong>{course.subject}</p>
            <h1 className="h1-price">Price: {course.price}</h1>
            <p>{formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>
    </div>
  )
}

export default GuestCourses