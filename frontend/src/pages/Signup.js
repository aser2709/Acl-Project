import { useState } from "react"


const SignupForm=() =>{
    const [email, setEmail] = useState('')
    const [passsword, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [userType, setUserType] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = {email,passsword,firstName,lastName,username,userType}
        console.log(user)
        const stringuser = JSON.stringify(user)
        console.log(stringuser)

        
        const response = await fetch('/users/',{
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const json = await response.json()
        console.log(json)

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            console.log('User SignedUp',json)
        }
    }


    return(
        <form className="signup" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
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
            <label>First Name</label>
            <input
            type="text"
            onChange={(e)=> setFirstName(e.target.value)}
            value={firstName}
            />
            <label>Last Name</label>
            <input
            type="text"
            onChange={(e)=> setLastName(e.target.value)}
            value={lastName}
            />
            <label>Email</label>
            <input
            type="text"
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
            />
            <label>Choose your type:</label>
            <select name="SubjectName" onChange={(e)=> setUserType(e.target.value)}
            value={userType}>
            <option value="">Choose a Type</option>
            <option value="Instructor">Instructor</option>
            <option value="Individual trainee">Individual trainee</option>
            <option value="Corporate trainee">Corporate trainee</option>
            </select>
            <button>Sign up</button>
            {error && <div className='error'>{error}</div>}
        </div>
        </form>
    )
}

export default SignupForm