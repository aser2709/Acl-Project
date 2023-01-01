import { useState } from "react";
import { useAuthContext } from "./useAuthContext";



export const useAdminSignup = () => {

    const[error, setError] = useState(null)
    const[isLoading, setisLoading] = useState(null)
    const {dispatch} = useAuthContext()

   
const adminsignup = async (Username,Password) =>{

    setisLoading(true)
    setError(null)

    const response = await fetch('/api/admin/signup',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body:JSON.stringify({Username,Password})
 })

const json = await response.json()

if (!response.ok){
    setisLoading(false)
    setError(json.error)
}
if(response.ok){
//save the user to local storage
localStorage.setItem('user',JSON.stringify(json))

//update auth context
dispatch({type:'LOGIN',payload: json})

setisLoading(false)


}
}

return {adminsignup, isLoading, error}
}