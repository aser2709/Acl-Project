import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"


import RequestAdminDetails from "../components/RequestAdminDetails"


const Adminrequest = () =>{
    const {user} = useAuthContext()
    const {courses,dispatch}=useCoursesContext()
    
    

    useEffect(()=>{
        const fetchRequests = async () =>{
        const response = await fetch('/admin/allRequests', {
                method: 'GET',
                headers: {'Authorization': `Bearer ${user.token}`
            },
            })
            const json = await response.json()
            console.log(json)
            

            if(response.ok){
                dispatch({type:'SET-COURSES',payload: json})
            }


            
        }
        if(user){
            fetchRequests()
            }
         }, [dispatch, user])    
    return (
        <div className="request-view">
    
            <div className="request">

                { courses && Array.from(courses).map((request)=>(
                    <RequestAdminDetails key={courses._id} request={request}/>
                ))}
            </div>            
        </div>
    )
}

export default Adminrequest
