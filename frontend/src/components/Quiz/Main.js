import React,{useEffect, useRef, useState} from 'react'
import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { setUserId } from '../../redux/result_reducer'
import { useAuthContext } from '../../hooks/useAuthContext'
import '../Quiz/Main.css'


const Main = () => {
    const inputRef = useRef(null)
    const dispatch = useDispatch()
    const { user } = useAuthContext()
    const params = new URLSearchParams(window.location.search);
    const course_id = params.get('courseId');
    const subtitle_id = params.get('subtitleId');
    const [url,setUrl] = useState('')
    
    useEffect(() => {
        if (course_id !== '') {
          setUrl(course_id);
        } else if (subtitle_id !== '') {
          setUrl(subtitle_id);
        }
      }, [course_id, subtitle_id]);
    
    
    function startQuiz(){
        if(user && user.user_?.firstName && user.user_?.lastName){
            const userName= user.user_.firstName +" "+user.user_.lastName;
            dispatch(setUserId(userName))
        }
    }

  return (
    <div className='container1'>
        <h1 className='title text-light'>Quiz</h1>
            <ol>
                <li>You will be asked questions one after another. </li>
                <li>10 points is awarded for the correct answer. </li>
                <li>Each question has four options. You can choose only one options.</li>
                <li>You can review and change answers before the quiz finish.</li>
                <li>The result will be declared at the end of the quiz. </li>
            </ol>
            <div className='start'>
                <Link className='btn' to={`/quiz/${url}?courseId=${url}`} onClick={startQuiz}>Start Quiz</Link>
            </div>            
</div>
  )
}

export default Main
