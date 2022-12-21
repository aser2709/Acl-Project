import React from 'react'
import { useState } from 'react'

const Support = () => {

  const [formValues, setFormValues] = useState([{ name: "", youtube: [{youtubelink:"",short_description:""}] }])
  
  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    if(e.target.name=="youtube"){
      newFormValues[i][e.target.name][0][e.target.id] = e.target.value;
    }else
    {
      newFormValues[i][e.target.name] = e.target.value;
    }
    setFormValues(newFormValues);
    console.log(newFormValues)
    console.log(newFormValues[i]["name"]);
  }
  let addFormFields = () => {
    setFormValues([...formValues, { name: "", youtube: [{youtubelink:"",short_description:""}] }])  
  }
  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formValues)
  }
  return (
    <form className='create' onSubmit={handleSubmit}>
      {formValues.map((element,index) => (
        <div className="form-inline" key={index} >
          <label>Subtitle</label>
          <input
          type="text"
          name="name"
          placeholder='Enter Subtitle' 
              required value={element.name || ""} 
              onChange={e => handleChange(index, e)}
          />
          <label>url</label>
          <input type="text" 
              name="youtube"
              id="youtubelink"
              placeholder='Enter Youtube Link for subtitle'  
              onChange={e => handleChange(index, e)} />
          <label>short description</label>
          <input type="text" 
              name="youtube"
              id="short_description"
              placeholder='Enter short description about the subtitle (maxLength 180)' 
              maxLength={180} 
              onChange={e => handleChange(index, e)} 
          />
          {
            index ?
              <button type="button" className="button remove" onClick={() => removeFormFields(index)}>Remove Subtitle</button>
              : null
          }
        </div>
      ))}
      <button className="button add" type="button" onClick={() => addFormFields()}>Add more url</button>
      <button className="button add" type="button" onClick={() => addFormFields()}>Add more Subtitles</button>
    </form>
  )
}

export default Support
