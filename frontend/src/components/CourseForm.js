import { useState } from 'react'
import { useCoursesContext } from "../hooks/useCoursesContext"
import { useAuthContext } from "../hooks/useAuthContext"

const CourseForm = () => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [formValues, setFormValues] = useState([{ name: "", youtubelink: "", short_description: "" }])
  const [youtubeError, setYoutubeError] = useState('');
  const [short_summary, setShort] = useState('')
  const [instructor, setInstructor] = useState('')
  const [subject, setSubject] = useState('')
  const [video_preview, setVideo] = useState('')
  const [total_hours_course, setTotalHours] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const { user } = useAuthContext()
  const { dispatch } = useCoursesContext()

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  }

  let addFormFields = () => {
    setFormValues([...formValues, { name: "", youtubelink: "", short_description: "" }])
  }

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormValues(formValues);
    const subtitle = formValues;
    const course = { title, price, short_summary, subject, total_hours_course, instructor: instructor, rating: 0, subtitle, video_preview };
    const youtubeRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;


    for (var i = 0; i < formValues.length - 1; i++); {
      if (youtubeRegex.test(formValues[i].youtubelink) && youtubeRegex.test(video_preview)) {
        console.log(formValues);
        setYoutubeError('');
        const response = await fetch('/api/courses', {
          method: 'POST',
          body: JSON.stringify(course),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        })

        const json = await response.json()

        if (!response.ok) {
          setError(json.error)
          setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
          setTitle('')
          setPrice('')
          setShort('')
          setInstructor('')
          setSubject('')
          setTotalHours('')
          setVideo('')
          setError(null)
          setFormValues([{ name: "", youtubelink: "" }])
          setEmptyFields([])
          console.log('new course added', json)
          dispatch({ type: 'CREATE_COURSE', payload: json })
        }
      }
      else {
        setYoutubeError('invalid Youtube url');
      }
    }
  }

  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add a new Course</h3>
      <label>Course Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <label>Course price</label>
      <input
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      {formValues.map((element, index) => (
        <div className="form-inline" key={index}>
          <label>subtitle</label>
            <input type="text"
              name="name"
              placeholder='Enter Subtitle' 
              required value={element.name || ""} 
              onChange={e => handleChange(index, e)}
            />
          <label>short description</label>
            <input type="text" 
              name="short_description" 
              placeholder='Enter short description about the subtitle (maxLength 180)' 
              maxLength={180} required value={element.short_description || ""} 
              onChange={e => handleChange(index, e)} 
            />
          <label>url</label>
            <input type="text" 
              name="youtubelink" 
              placeholder='Enter Youtube Link for subtitle' 
              required value={element.youtubelink || ""} 
              onChange={e => handleChange(index, e)} />
          {
            index ?
              <button type="button" className="button remove" onClick={() => removeFormFields(index)}>Remove</button>
              : null
          }
        </div>
      ))}
      <button className="button add" type="button" onClick={() => addFormFields()}>Add more Subtitles</button>
      <label>Short Summary about the  course</label>
      <input
        type="text"
        onChange={(e) => setShort(e.target.value)}
        value={short_summary}
        maxLength={250}
      />
      <label>Instructor</label>
      <input
        type="text"
        onChange={(e) => setInstructor(e.target.value)}
        value={instructor}
      />
      <label>Course Subject:</label>
      <select name="SubjectName" onChange={(e) => setSubject(e.target.value)}
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
        onChange={(e) => setTotalHours(e.target.value)}
        value={total_hours_course}
      />
      <label>Video preview</label>
      <input
        type="text"
        onChange={(e) => setVideo(e.target.value)}
        placeholder='Enter Youtube Link for the course'
        value={video_preview}
      />
      <button>Add course</button>
      {error && <div className='error'>{error}</div>}
      {youtubeError && <div className='error'>{youtubeError} </div>}
    </form>
  )
}

export default CourseForm