import React, { useEffect } from 'react'
import '../Quiz/Result.css'
import { Link } from 'react-router-dom'
import ResultTable from './ResultTable'
import { useDispatch, useSelector } from 'react-redux'

/** Import Actions */
import { resetAllAction } from '../../redux/question_reducer'
import { resetResultAction } from '../../redux/result_reducer'
import { attemps_Number, earnPoints_Number, flagResult } from '../../pages/helper/quizHelper'


export default function Result() {

    const dispatch = useDispatch()
    const { questions: { queue, answers }, result: { result, userId } } = useSelector(state => state)
    const params = new URLSearchParams(window.location.search);
    const course_id = params.get('courseId');
    const subtitle_id = params.get('subtitleId');

    useEffect(() => {
    })

    const totalPoints = queue.length * 10;
    const attempts = attemps_Number(result);
    const earnPoints = earnPoints_Number(result, answers, 10)
    const flag = flagResult(totalPoints, earnPoints)

    function onRestart() {
        dispatch(resetAllAction())
        dispatch(resetResultAction())
    }
    return (
        <div className='container1'>
            <h1 className='title text-light'>Quiz</h1>


            <div className='result flex-center'>
                <div className='flex'>
                    <span>Username</span>
                    <span className='bold'>Daily Tuition</span>
                </div>
                <div className='flex'>
                    <span>Total Quiz Points : </span>
                    <span className='bold'>{totalPoints || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total Questions : </span>
                    <span className='bold'>{ queue.length || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total Answered Questions : </span>
                    <span className='bold'>{ attempts || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total Earn Points : </span>
                    <span className='bold'>{earnPoints || 0}</span>
                </div>
                <div className='flex'>
                    <span>Quiz Result</span>
                    <span style={{color : `${flag ? "#111" : "#111"}`,backgroundColor: `${flag ? "#270" : "#e7195a"}`}} className='bold'>{flag ? "Passed" : "Failed"}</span>
                </div>
            </div>

            <div className='start'>
                <Link className='btn' to={`/quiz?courseId=${course_id}`} onClick={onRestart}>Restart</Link> 
            </div>
            {/** result table*/}
            <div className='container1'>
                <ResultTable></ResultTable>
            </div>

        </div>
    )
}
