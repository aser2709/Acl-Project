import React, { useEffect, useState } from 'react'
import Questions from './Questions'
import { MoveNextQuestion, MovePrevQuestion } from '../../hooks/FetchQuestions';
import { PushAnswer } from '../../hooks/setResult';

/** redux store import */
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'


export default function Quiz() {

  const [check, setChecked] = useState(undefined)
  const result = useSelector(state => state.result.result);
  const { queue, trace } = useSelector(state => state.questions);
  const dispatch = useDispatch()
  const params = new URLSearchParams(window.location.search);
  const course_id = params.get('courseId');
  const subtitle_id = params.get('subtitleId');

  useEffect(() => {
    
  })


  /** set Result value*/
  function onChecked(check) {
    setChecked(check)
  }

  /** Finish Exam after the last exam*/
  if (result.length && result.length >= queue.length) {
    return <Navigate to={`/result/${course_id}?courseId=${course_id}`} replace={true}></Navigate>
  }

  /** Next button*/
  function onNext() {
    if (trace < queue.length) {
      /** Update the trace value by one using Move  */
      dispatch(MoveNextQuestion());
      /** insert a new result in the array */
      if (result.length <= trace) {
        dispatch(PushAnswer(check));
      }
    }
    /** reset the value of the checked variable*/
    setChecked(undefined)

  }
  /** Prev button*/
  function onPrev() {
    if (trace > 0) {
      /** Update the trace value by one using Move  */
      dispatch(MovePrevQuestion());
    }
  }

  return (
    <div className='container1'>
      <h1 className='title text-light'>Quiz</h1>

      { /* display questions */}
      <Questions onChecked={onChecked} />

      <div className='grid'>
        {
          trace > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div> 
        }
        <button className='btn next' onClick={onNext}>Next</button>
      </div>

    </div>
  )
}
