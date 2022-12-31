import React from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import { useCoursesContext} from "../hooks/useCoursesContext"
import { useEffect, useState } from "react"
import RegisteredSubtitleDetails from '../components/RegisteredSubtitleDetails'

export const RegisteredSubtitles = () => {

    const params = new URLSearchParams(window.location.search);
    const course_id = params.get('courseId');
    const {user} = useAuthContext()
    const {courses,dispatch}=useCoursesContext()

    useEffect(()=>{
        const fetchCourses = async () =>{
            const response = await fetch(`/api/user/registeredCourse/subtitles/${course_id}`, {
                method: "GET",
                body: JSON.stringify(fetchCourses),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                    'body': user.email
                }
            })
            const json = await response.json()
            //console.log(json[0].subtitle)

            if(response.ok){
                dispatch({type:'SET-COURSES',payload: json})
            }
        }
        if(user){
            fetchCourses()
            }
    }, [dispatch,course_id,user])

  return (
    <div>
        {user && courses && Array.from(courses[0].subtitle).map((course)=>(
            <RegisteredSubtitleDetails key={courses[0].subtitle._id} subtitle={course}/>
        ))}
    </div>
  )
}
