import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useAuthContext } from "../hooks/useAuthContext"


/** redux axtions */
import * as Action from '../redux/question_reducer'

/** fetch questions hook to fetch api data and set value to store*/
export const useFetchQuestion = () => {

    const dispatch = useDispatch();
    const [getData, setGetData] = useState({ isLoading: false, apiData: [], serverError: null });
    const { user } = useAuthContext()
    const params = new URLSearchParams(window.location.search);
    const course_id = params.get('courseId');

    useEffect(() => {
        setGetData(prev => ({ ...prev, isLoading: true }));

        /** async function fetch backend data */
        (async () => {
            try {
                
                const response = await fetch(`/api/courses/coursequiz/${course_id}`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json = await response.json()
                const questions = json[0].exercise.questions;
                const answers = json[0].exercise.answers;


                if (questions.length > 0) {
                    setGetData(prev => ({ ...prev, isLoading: false }));
                    setGetData(prev => ({ ...prev, apiData: questions }));

                    /** dispatch an action */
                    dispatch(Action.startExamAction({question: questions,answers}))
                } else {
                    throw new Error("No Questions Available")
                }
            } catch (error) {
                setGetData(prev => ({ ...prev, isLoading: false }));
                setGetData(prev => ({ ...prev, serverError: error }))
            }
        })();
    }, [dispatch])

    return [getData, setGetData];
}


/** MoveAction Dispatch function */
export const MoveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction());
    } catch (error) {
        console.log(error)
    }
}

/** PrevAction Dispatch function */
export const MovePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction());
    } catch (error) {
        console.log(error)
    }
}