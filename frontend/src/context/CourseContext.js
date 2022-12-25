import { createContext, useReducer } from "react";

export const CourseContext = createContext()

export const courseReducer = (state,action)=>{
    switch(action.type){
        case 'SET-COURSES':
            return {
                courses: action.payload
            }
        case 'CREATE-COURSE':
            return{
                courses: [action.payload, ...state.courses]
            }
        case 'Single-Course':
            return {
                courses: state.courses.filter(w => w._id === action.payload._id) 
            }
            case 'DELETE_COURSE':
                return{
                    courses: state.courses.filter((w) => w._id !== action.payload._id)
                }
                
        default:
            return state
    }
}

export const CourseContextProvider = ({ children }) => {
    const [state,dispatch] = useReducer(courseReducer,{
        courses:null
    })


    return (
        <CourseContext.Provider value={{...state,dispatch}}>
            {children}
        </CourseContext.Provider>
    )
}