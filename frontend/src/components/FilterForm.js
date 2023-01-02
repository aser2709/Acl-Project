import { useState } from "react"
import { useCoursesContext } from "../hooks/useCoursesContext"


const FilterForm = () => {
    const { dispatch } = useCoursesContext()
    const [lowprice, setlowPrice] = useState('0')
    const [highprice, sethighPrice] = useState('15000')
    const [highRating, setHighRating] = useState('5')
    const [error, setError] = useState(null)
    const [lowRating, setLowRating] = useState('0')
    const [subjectName, setSubjectName] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        var par = document.getElementsByName('SubjectName')[0];
        var index = par.selectedIndex
        setSubjectName(par.options[index].value);
        var course = ""
        if (subjectName === "") {
            course = {
                "$and": [
                    { "price": { "$gte": lowprice, "$lte": highprice } },
                ]
            }
        }
        else {
            course = {
                "$and": [
                    { "price": { "$gte": lowprice, "$lte": highprice } },
                    { "subject": subjectName }
                ]
            }
        }
        const response = await fetch('/filtercourse', {
            method: "POST",
            body: JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setError(null)
            dispatch({ type: 'SET-COURSES', payload: json })
        }
    }
    const ResetSubmit = () => {
        setHighRating(5);
        setLowRating(0);
        sethighPrice(15000);
        setlowPrice(0);
        setSubjectName("");
        document.getElementsByName('SubjectName')[0].selectedIndex = 0;
    }
    const SubjectFilter = () => {
        var par = document.getElementsByName('SubjectName')[0];
        var index = par.selectedIndex
        setSubjectName(par.options[index].value);
    }
    return (
        <form className='filter' onSubmit={handleSubmit}>
        <h1>Filter Courses</h1>
        <h3>Price</h3>
        <label>Min Price:</label>
        <input
            type="number"
            onChange={(e) => setlowPrice(e.target.value)}
            value={lowprice}
        />
        <label>Max Price:</label>
        <input
            type="number"
            onChange={(e) => sethighPrice(e.target.value)}
            value={highprice}
        />
        <h3>Rating</h3>
        <label>Min Rating:</label>
        <input
            type="number"
            onChange={(e) => setLowRating(e.target.value)}
            value={lowRating}
        />
        <label>Max Rating:</label>
        <input
            type="number"
            onChange={(e) => setHighRating(e.target.value)}
            value={highRating}
        />
        <h3>Subject</h3>
        <label>Subject Name:</label>
        <select name="SubjectName" onChange={SubjectFilter}>
            <option value="">Choose a Subject</option>
            <option value="CS">CS</option>
            <option value="BI">BI</option>
            <option value="Law">Law</option>
            <option value="MN">MN</option>
        </select>

        <button>Filter</button>

        <button onClick={ResetSubmit}>Reset</button>

        {error && <div className="error">{error}</div>}
    </form>
    )
}

export default FilterForm