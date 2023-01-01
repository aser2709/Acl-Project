import { Link } from "react-router-dom"
import { useCoursesContext } from "../hooks/useCoursesContext"
import { useAuthContext } from "../hooks/useAuthContext"
import Popup from "../components/Popup"
import { useEffect, useState } from "react"

//date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow"


const CourseDetails = ({ course }) => {

    const { dispatch } = useCoursesContext()
    const { user } = useAuthContext()
    const [buttonPopup, setButtonPopup] = useState(false);
    const [rateCourse, setRateCourse] = useState(0)
    const [rateInstructor, setRateInstructor] = useState(0)

    useEffect(() => {
        fetch('api/courses/viewRating/' + course._id, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then((resp) => resp.json()).then((data) => {
            setRateCourse(data)
        })
    }, [])
    
    useEffect(() => {
        
        fetch('api/users/viewRating/' + course.user_id, {
           
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then((resp) => resp.json()).then((data) => {
            setRateInstructor(data)
        })
    }, [])

    const handleClick = async () => {

        if (!user) {
            return
        }

        const response = await fetch('api/courses/' + course._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_COURSE', payload: json })
        }
    }
    const buyCourse = async () => {
        setButtonPopup(true);
    }
    const close = async () => {
        const title = course.title
        const subtitle = course.subtitle
        const _id = course._id
        const short_summary = course.short_summary
        const xCourse = { title, subtitle, short_summary, _id }
        const email = user.email
        const RCourse = { xCourse, email }

        const response = await fetch('api/user/registerCourse', {
            method: 'PATCH',
            body: JSON.stringify(RCourse),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        if (response.ok) {
            console.log("Course Registered")
            setButtonPopup(false);
        }
    }


    return (
        <div className="course-details">
            <h4 onClick={() => window.location.href = `/course?courseId=${course._id}`}>{course.title}</h4>
            <p><strong>Short Summary: </strong>{course.short_summary}</p>
            <p><strong>Length (hours): </strong>{course.total_hours_course}</p>
            <p><strong>Instructor: </strong>{course.instructor}</p>
            <p><strong>Instructor Rating: </strong>{rateInstructor}</p>
            <p><strong>Subject: </strong>{course.subject}</p>
            <p><strong>Course Rating: </strong>{rateCourse}</p>
            
            <h1 className="h1-price">Price: {course.price}</h1>
            {parseInt(course.discount) > 0 ? <h4 className="h1-price">After Discount: {course.price - (course.price * parseInt(course.discount) / 100)}</h4> : ''}
            <p>{formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}</p>
            {
                user && user.user_.userType == "Instructor" &&
                <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
            }
            {
                user && user.user_.userType == "Individual trainee" &&
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