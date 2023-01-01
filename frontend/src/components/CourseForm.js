import { useState } from 'react'
import { useCoursesContext } from "../hooks/useCoursesContext"
import { useAuthContext } from "../hooks/useAuthContext"

const CourseForm = () => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [fields, setFields] = useState([{ name: '', youtube: [{youtubelink: '' ,short_description: ''}] }]);
  const [short_summary, setShort] = useState('')
  const [CourseAdded,setCourseAdded] = useState(null)
  const [subject, setSubject] = useState('')
  const [video_preview, setVideo] = useState('')
  const [total_hours_course, setTotalHours] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const { user } = useAuthContext()
  const { dispatch } = useCoursesContext()

  const handleChange = (event, fieldIndex, nestedFieldIndex) => {
    const values = [...fields];
    values[fieldIndex].name = event.target.value;
    setFields(values);
  };
  const handleChangeYoutubelink = (event, fieldIndex, nestedFieldIndex) => {
    const values = [...fields];
    values[fieldIndex].youtube[nestedFieldIndex].youtubelink = event.target.value;
    setFields(values);
  };
  const handleChangeShort = (event, fieldIndex, nestedFieldIndex) => {
    const values = [...fields];
    values[fieldIndex].youtube[nestedFieldIndex].short_description = event.target.value;
    setFields(values);
  };
  const addField = () => {
    setFields([...fields, { name: '', youtube: [{youtubelink: '',short_description: ''}] }]);
  };
  const addNestedField = fieldIndex => {
    const values = [...fields];
    values[fieldIndex].youtube.push({youtubelink: '',short_description: ''});
    setFields(values);
  };
  const removeField = fieldIndex => {
    const values = [...fields];
    values.splice(fieldIndex, 1);
    setFields(values);
  };
  const removeNestedField = (fieldIndex, nestedFieldIndex) => {
    const values = [...fields];
    values[fieldIndex].youtube.splice(nestedFieldIndex, 1);
    setFields(values);
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFields(fields)
    const instructor = user.user_.firstName +" "+user.user_.lastName;
    const subtitle = fields;
    const course = { title, price, short_summary, discount, subject, total_hours_course, instructor: instructor, rating: 1, subtitle: subtitle, video_preview };

    const response = await fetch('/api/courses',{
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
                setCourseAdded("Unsuccessful add of Course")
            }
            if (response.ok) {
              setTitle('')
              setPrice('')
              setDiscount('')
              setShort('')
              setSubject('')
              setTotalHours('')
              setVideo('')
              setError(null)
              setCourseAdded("Successful add of Course")
              const values = [{ name: '', youtube: [{youtubelink: '' ,short_description: ''}] }];
              setFields(values)
              setEmptyFields([])
              console.log('new course added', json)
              dispatch({ type: 'CREATE_COURSE', payload: json })
            }
  }

  return (
    <form className='signup' onSubmit={handleSubmit}>
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
      <label>Discount Percentage</label>
      <input
        type="number"
        onChange={(e) => setDiscount(e.target.value)}
        value={discount}
      />
      {Array.from(fields).map((field, fieldIndex) => (
        <div key={fieldIndex}>
        <label>Subtitle</label>
          <input
            type="text"
            value={field.name}
            onChange={event => handleChange(event, fieldIndex, null)}
          />
          {Array.from(field.youtube).map((youtube, nestedFieldIndex) => (
            <div key={nestedFieldIndex}>
              <label>Youtube</label>
              <input
                type="text"
                value={youtube.youtubelink}
                onChange={event => handleChangeYoutubelink(event, fieldIndex, nestedFieldIndex)}
              />
              <label>Short Description</label>
              <input
              type="text"
              value={youtube.short_description}
              onChange={event => handleChangeShort(event,fieldIndex,nestedFieldIndex)}
              />
              <button type="button" onClick={() => removeNestedField(fieldIndex, nestedFieldIndex)}>
                Remove Links
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addNestedField(fieldIndex)}>
            Add Link
          </button>
          <button type="button" onClick={() => removeField(fieldIndex)}>
            Remove Subtitle
          </button>
        </div>
      ))}
      <button type="button" onClick={addField}>
        Add Subtitle
      </button>
      <label>Short Summary about the  course</label>
      <input
        type="text"
        onChange={(e) => setShort(e.target.value)}
        value={short_summary}
        maxLength={250}
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
      <label for="tos1"> I have read and agreed to the
            <a HREF="javascript:window.open('/tos', 'Terms of service', 'width=900,height=900');"><i> media rights contract</i></a> .
            <input type="checkbox" id="tos1" name="tos1" value="agreed" required/> 
            </label>
      <button>Add course</button>
      {error && <div className='error'>{error}</div>}
      {CourseAdded==="Unsuccessful add of Course" && <div className='error'>{CourseAdded}</div>}
      {CourseAdded==="Successful add of Course" && <div className='success'>{CourseAdded}</div>}
    </form>
  )
}
export default CourseForm