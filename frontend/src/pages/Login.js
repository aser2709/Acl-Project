import { useState } from "react"

const LoginForm= () =>{
    const [username, setUsername] = useState('')
    const [passsword, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) =>{
        e.preventDefault()

        const user = {username,passsword}
        console.log(user)

        const response = await fetch('/users/login',{
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        console.log(json)

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            console.log('User logged in',json)
        }
    }


    return(
        <form className="signup" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="course-details">
            <label>Username</label>
            <input
            type="text"
            onChange={(e)=> setUsername(e.target.value)}
            value={username}
            />
            <label>Passsword</label>
            <input
            type="text"
            onChange={(e)=> setPassword(e.target.value)}
            value={passsword}
            />
            <button>Log in</button>
            {error && <div className='error'>{error}</div>}
        </div>    
        </form>
    )

}
export default LoginForm