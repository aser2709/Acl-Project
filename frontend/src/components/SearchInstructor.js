import { useEffect,useState } from "react"
import { useCoursesContext} from "../hooks/useCoursesContext"
import { useAuthContext } from "../hooks/useAuthContext"

//components
import CourseDetails from "./CourseDetails"
import FilterForm from "./FilterForm"



const Search = () =>{
    
    const {courses,dispatch}=useCoursesContext()
    const {user} = useAuthContext()
    
    
    const [course,setCourse] = useState ("")
    const [cour,setCour] = useState ("")
  
    const [filtered,setFiltered] = useState ([])
    const searchAll = ["subject","instructor","title"]


    useEffect(()=>{
        
        
            const fetchCourses = async () =>{
                const response = await fetch('/api/courses', {
                    headers: {'Authorization': `Bearer ${user.token}`},
                })
                const json = await response.json()
    
                if(response.ok){
                    dispatch({type:'SET-COURSES',payload: json})
                }
              }
              if(user){
                fetchCourses()
                }
            }
           
        , [dispatch, user])
        function see(){
            let filteredArray=[]
           
            filteredArray = course.filter(item => searchAll.some((word)=> item[word].toString().includes(cour.toString())));
       
            setFiltered(filteredArray);
            
           
        }
    return(
        <div className="SearchInstrctor">
            
        <input value={cour} onChange={(e)=> setCour(e.target.value)} placeholder="Search"></input>
        <button onClick={see} >Search</button>
        {filtered&& filtered.map((el, index) => (
         <div> <CourseDetails key={el._id} course={el}/></div>

            ))}
    </div>
    )
}


export default Search





