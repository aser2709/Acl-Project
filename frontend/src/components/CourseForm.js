import { useState } from 'react'

const CourseForm = () => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [short_summary, setShort] = useState('')
  const [instructor, setInstructor] = useState('')
  const [subject, setSubject] = useState('')
  const [total_hours_course, setTotalHours] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) =>{
    e.preventDefault()

    setInstructor('Asser')
    const course = {title,price,short_summary,subject,total_hours_course,instructor:instructor,rating:0}

    const response = await fetch('/api/courses',{
        method: 'POST',
        body: JSON.stringify(course),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setTitle('')
            setPrice('')
            setShort('')
            setInstructor('')
            setSubject('')
            setTotalHours('')
            setError(null)
            console.log('new course added',json)
        }

  }

  return(
    <form className='create' onSubmit={handleSubmit}>
        <h3>Add a new Course</h3>
        <label>Course Title</label>
        <input
        type="text"
        onChange={(e)=> setTitle(e.target.value)}
        value={title}
        />
        <label>Course price</label>
        <input
        type="number"
        onChange={(e)=> setPrice(e.target.value)}
        value={price}
        />
        <label>Short Summary about the  course</label>
        <input
        type="text"
        onChange={(e)=> setShort(e.target.value)}
        value={short_summary}
        />
        <label>Course Subject:</label>
        <select name="SubjectName" onChange={(e)=> setSubject(e.target.value)}
        value={subject}>
            <option value="">Choose a Subject</option>
            <option value="CS">CS</option>
            <option value="BI">BI</option>
            <option value="Law">Law</option>
            <option value="MN">MN</option>
        </select>
        <label>Total Course Time (in Hours)</label>
        <input
        type="number"
        onChange={(e)=> setTotalHours(e.target.value)}
        value={total_hours_course}
        />
        <button>Add course</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default CourseForm