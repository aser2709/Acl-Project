import { useAuthContext } from "../hooks/useAuthContext"
import CourseForm from "../components/CourseForm";



const AddCourse=() =>{
    const { user } = useAuthContext()
    return(
        <div>
            {user && user.user_.userType==="Instructor" && <CourseForm/>}
            {!user && <div className='error'>Anuthorized to be here</div>}
            {user && user && (user.user_.userType==="Individual trainee" || user.user_.userType==="Corporate trainee") &&
            <div className='error'>Anuthorized to be here</div>}
        </div>
    )
}

export default AddCourse