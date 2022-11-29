import { Link } from "react-router-dom"

const CourseDetails = ({ course }) => {
    return (
        <div className="course-details">
            <Link onClick={() => window.location.href=`/course?courseId=${course._id}`}>
            <h4>{course.title}</h4>
            </Link>
            <p><strong>Price: </strong>{course.price}</p>
            <p><strong>Rating: </strong>{course.rating}</p>
            <p><strong>Subject: </strong>{course.subject}</p>
        </div>
    )

}

export default CourseDetails