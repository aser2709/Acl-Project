import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap'
import { useState } from 'react'


const AddYoutubeLink = () => {
    const [ebededLink, setebededLink] = useState('')
    const [inputList,setinputList]= useState([{Subtitle:'',YoutubeLink:''}])

    const handleinputchange=(e,index)=>{
        const {Subtitle,value}=e.target;
        const list=[...inputList];
        list[index][Subtitle]=value;
        setinputList(list);
        console.log(list)
    }
    const handleaddclick=()=>{
        setinputList([...inputList,{Subtitle:'',YoutubeLink:''}])
    }
    const handleremove=index=>{
        const list=[...inputList];
        list.splice(index,1);
        setinputList(list);
        console.log(list)
    }
    
  return (
    <div>
        <Container>
        <div className="ratio ratio-16x9">
            <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" title="YouTube video" allowFullScreen></iframe>
        </div>
        </Container>
      { inputList.map( (x,i)=>{
        return(
        <Container>
            <label>Subtitle</label>
            <input type={"text"} name={"Subtitle"} placeholder={"Enter Subtitle"} onChange={e=>handleinputchange(e,i)}/>
            <label>YouTube Link</label>
            <input type={"text"} name={"YoutubeLink"} placeholder={"Enter youtube embedded link"} onChange={e=>handleinputchange(e,i)}/>
            {
                inputList.length!==1 &&
                <button className="btn btn-danger" onClick={(i)=>handleremove(i)}>Remove Subtitle</button>
                
            }
            {
                inputList.length-1==i &&
                <button className="btn btn-success" onClick={handleaddclick}>Add More Subtitles</button>
            }
        </Container>
    )
})}
    </div>
  )
}

export default AddYoutubeLink
