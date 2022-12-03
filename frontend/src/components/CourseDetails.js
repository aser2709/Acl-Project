import { Link } from "react-router-dom"
import { useCoursesContext } from "../hooks/useCoursesContext"
import { useAuthContext } from "../hooks/useAuthContext"

//date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const CourseDetails = ({ course }) => {
    
    const {dispatch} = useCoursesContext()
    const {user} = useAuthContext()


const handleClick = async () =>{

    if(!user){
        return
    }

    const response = await fetch('/api/courses/' + course._id,{
        method: 'DELETE',
        headers:{
            'Authorization': `Bearer ${user.token}`
         }
    })
    const json = await response.json()

    if (response.ok){
    dispatch({type:'DELETE_COURSE', payload: json})
    }
}
    return (
        <div className="course-details">
            <Link onClick={() => window.location.href=`/course?courseId=${course._id}`}>
            <h4>{course.title}</h4>
            </Link>
            <p><strong>Length (weeks): </strong>{course.length}</p>
            <p><strong>Price: </strong>{course.price}</p>
            <p><strong>Subtitle: </strong>{course.subtitle}</p>
            <p><strong>Short Summary: </strong>{course.short_summary}</p>
            <p><strong>Instructor: </strong>{course.instructor}</p>
            <p><strong>Subject: </strong>{course.subject}</p>
            <p><strong>Rating: </strong>{course.rating}</p>
            <p>{formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )

}

export default CourseDetails