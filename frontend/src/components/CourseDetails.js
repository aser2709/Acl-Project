import { Link } from "react-router-dom"
import { useCoursesContext } from "../hooks/useCoursesContext"
import { useAuthContext } from "../hooks/useAuthContext"
import Popup from "../components/Popup"
import { useState } from "react"

//date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow"


const CourseDetails = ({course}) => {

    const {dispatch} = useCoursesContext()
    const {user} = useAuthContext()
    const [buttonPopup,setButtonPopup] = useState(false);


const handleClick = async () =>{

    if(!user){
        return
    }

    const response = await fetch('api/courses/' + course._id,{
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
const buyCourse = async () =>{
    setButtonPopup(true);
}
const close = () => {
    setButtonPopup(false);
}


    return (
        <div className="course-details">
            <Link onClick={() => window.location.href=`/course?courseId=${course._id}`}>
            <h4>{course.title}</h4>
            </Link>
            <p><strong>Short Summary: </strong>{course.short_summary}</p>
            <p><strong>Length (weeks): </strong>{course.total_hours_course}</p>
            <p><strong>Instructor: </strong>{course.instructor}</p>
            <p><strong>Subject: </strong>{course.subject}</p>
            <p><strong>Rating: </strong>{course.rating}</p>
            <h1 className="h1-price">Price: {course.price}</h1>
            <p>{formatDistanceToNow(new Date(course.createdAt), {addSuffix: true})}</p>
            {
                user && user.user_.userType=="Instructor" &&
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
            }
            {
                user && user.user_.userType=="Individual trainee" &&
                <button className="buy-course" onClick={buyCourse}>Register</button>
            }
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <h3>You sure you want to register for {course.title}</h3>
                <button className="yes-course" onClick={close}>yes</button>
            </Popup> 
        </div>
    )
}

export default CourseDetails