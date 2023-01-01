import React from 'react'
import { useEffect, useState } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"
import SingleCourseDetails from '../components/SingleCourseDetails'
import { useAuthContext } from "../hooks/useAuthContext"

import { useNavigate } from 'react-router-dom'
import setWeekWithOptions from 'date-fns/fp/setWeekWithOptions/index.js'


const SingleCourse = () => {
    const [courseRating, setCourseRating] = useState('')
    const [instructorRating, setIntructorRating] = useState('')
    const [courseReview, setCourseReview] = useState('')
    const [instructorReview, setIntructorReview] = useState('')
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const course_id = params.get('courseId');
    const { user } = useAuthContext()
    const { courses, dispatch } = useCoursesContext()

    const [text, setText] = useState('Join Course')

    const handleRating = async (e) => {
        e.preventDefault()
        console.log(courseRating)
        const ratings = { rating: courseRating }
        const response = await fetch('api/courses/' + course_id, {
            method: 'POST',
            body: JSON.stringify(ratings),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
    }



    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch(`/api/courses/${course_id}`, {
                method: "GET",
                body: JSON.stringify(fetchCourses),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET-COURSES', payload: json })
            }
        }

        if (user) {
            fetchCourses()
        }
    }, [dispatch, course_id, user])


    const addCourseReview = async (e) => {
        e.preventDefault()
        const addReview = await fetch('/api/courses/reviewCourse' + course_id, {
            method: 'POST',
            body: JSON.stringify(courseReview),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
    }

    const addInstructorRating = async (e) => {
        e.preventDefault()
        const addReview = await fetch('/api/courses/rateInstructor' + course_id, {
            method: 'POST',
            body: JSON.stringify(instructorRating),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
    }
    const addInstructorReview = async (e) => {
        e.preventDefault()
        const addReview = await fetch('/api/courses/reviewInstructor' + course_id, {
            method: 'POST',
            body: JSON.stringify(instructorRating),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
    }

    const mouseEnter = () => {
        if (courses) {
            setText(courses.price)
        }
    }
    const mouseLeave = () => {
        setText('Join Course')
    }
    const toNavigate = () => {
        navigate('/pay');
    }
    return (
        <div className="home">

            {user && <div className='courses'>
                {courses &&
                    <SingleCourseDetails course={courses} />
                }
                <div className='subtitles-single-course'>
                    {courses && <strong>Subtitles: </strong>}
                    <div className='subtitle-single-course'>
                        {courses &&
                            Array.from(courses.subtitle).map((courses) => (
                                <p>{courses.name}</p>
                            ))}
                    </div>
                </div>

                {
                    user && user.user_.userType == "Individual trainee" && <button className='join-course' onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onClick={toNavigate}>{text}</button>
                }
            </div>}
            {
                !user && <div className='error'>Anuthorized to be here</div>
            }

            <div className='ratings'>
                {user &&
                    <form className='Rate' onSubmit={handleRating}>
                        <label>Rate this course!</label>
                        <input
                            type="rating"
                            onChange={(e) => setCourseRating(e.target.value)}
                            value={courseRating}
                        />
                        <button>Rate</button>
                    </form>
                }

                {user &&
                    <form className='Rate' onSubmit={addCourseReview}>
                        <label>Review this course!</label>
                        <input
                            type="text"
                            onChange={(e) => setCourseReview(e.target.value)}
                            value={courseReview}
                        />
                        <button>Review</button>
                    </form>
                }

                {user &&
                    <form className='Rate' onSubmit={addInstructorRating}>
                        <label>Rate this instructor!</label>
                        <input
                            type="rating"
                            onChange={(e) => setIntructorRating(e.target.value)}
                            value={instructorRating}
                        />
                        <button>Rate</button>
                    </form>
                }

                {user &&
                    <form className='Rate' onSubmit={addInstructorReview}>
                        <label>Review this Instructor!</label>
                        <input
                            type="text"
                            onChange={(e) => setIntructorReview(e.target.value)}
                            value={instructorReview}
                        />
                        <button>Review</button>
                    </form>
                }
            </div>
        </div>

    )
}

export default SingleCourse
