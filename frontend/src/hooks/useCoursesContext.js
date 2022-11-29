import { CourseContext } from "../context/CourseContext";
import { useContext } from "react";

export const useCoursesContext= () =>{
    const context = useContext(CourseContext)

    if(!context){
        throw Error('useCourseContext must be used inside an CourseContextProvider')
    }
    return context
}