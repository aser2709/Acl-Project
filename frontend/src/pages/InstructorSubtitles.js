import React from 'react'
import { useEffect } from "react"
import { useCoursesContext} from "../hooks/useCoursesContext"
import { useAuthContext } from "../hooks/useAuthContext"
import {  useNavigate } from 'react-router-dom'
import RegisteredSubtitleDetails from '../components/RegisteredSubtitleDetails'
import InstructorSubtitlesDetails from '../components/InstructorSubtitlesDetails'

const InstructorSubtitles = () => {

    const {user} = useAuthContext()
    const {courses,dispatch}=useCoursesContext()
    const params = new URLSearchParams(window.location.search);
    const course_id = params.get('courseId');


    useEffect(()=>{
        const fetchSubtitles = async () =>{
            const response = await fetch(`/api/courses/subtitles/${course_id}`,{
                method: "GET",
                body: JSON.stringify(fetchSubtitles),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                }
            })
            const json = await response.json()
            console.log(json.subtitle)
            if(response.ok){
                dispatch({type:'SET-COURSES',payload: json})
            }
        }
        if(user){
            fetchSubtitles()
        }
    }, [dispatch,course_id,user])


  return (
    <div>
            {user && courses && Array.from(courses.subtitle).map((course)=>(
                <InstructorSubtitlesDetails key={courses.subtitle._id} subtitle={course}/>
            ))}
    </div>
  )
}
export default InstructorSubtitles
