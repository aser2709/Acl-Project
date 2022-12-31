import React, { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';


const CreateQuiz = () => {
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], id: 1 }]);
  const [answers, setAnswers] = useState(['']);
  const [errors, setErrors] = useState([]);
  const [QuizAdded,setQuizAdded] = useState(null)
  const { user } = useAuthContext()
  const params = new URLSearchParams(window.location.search);
  const course_id = params.get('courseId');
  //console.log(course_id);
  

  const handleAddQuestion = () => {
    // Generate a unique ID for the new question
    const id = Date.now();
    setQuestions([...questions, { question: '', options: ['', '', '', ''], id }]);
    setAnswers([...answers, '']);
    setErrors([...errors, '']);
  }

  const handleRemoveQuestion = (id) => {
    if(questions.length>1){
    setQuestions(questions.filter(q => q.id !== id));
    setAnswers(answers.slice(0, answers.length - 1));
    setErrors(errors.slice(0, errors.length - 1));
    }
  }

  const handleQuestionChange = (event, id) => {
    const updatedQuestions = questions.map(q => {
      if (q.id === id) {
        return { ...q, question: event.target.value };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  }

  const handleOptionChange = (event, id, optionIndex) => {
    const updatedQuestions = questions.map(q => {
      if (q.id === id) {
        const updatedOptions = [...q.options];
        updatedOptions[optionIndex] = event.target.value;
        return { ...q, options: updatedOptions };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  }

  const handleAnswerChange = (event, index) => {
    const value = event.target.value;
    // Check if the value is a valid number between 0 and 3
    if (!isNaN(value) && value !== '' && value >= 0 && value <= 3) {
      const updatedAnswers = [...answers];
      updatedAnswers[index] = Number(value);
      setAnswers(updatedAnswers);
      const updatedErrors = [...errors];
      updatedErrors[index] = '';
      setErrors(updatedErrors);
    } else {
      const updatedErrors = [...errors];
      updatedErrors[index] = 'Please enter a number between 0 and 3';
      setErrors(updatedErrors);
    }
  }
  const submitValue = async (e) => {
    e.preventDefault()
    const response = await fetch(`/api/courses/coursequiz/${course_id}`,{
      method: 'POST',
      body: JSON.stringify({questions,answers}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    if (!response.ok) {
      setErrors(json.error)
      setQuizAdded("Unsuccessful add of Quiz")
    }
    if (response.ok){
      setQuestions([{ question: '', options: ['', '', '', ''], id: 1 }]);
      setAnswers(['']);
      setQuizAdded("Successful add of Quiz")
    }

    console.log({'questions': questions, 'answers': answers})


  }

  return (
    <div className='signup'>
        <form>
        <h1>Create Exercise</h1>
      {questions.map((q, index) => (
        <><label>Question {`${index+1}`}</label><div key={q.id}>
              <input type="text" value={q.question} placeholder="Write your question here" onChange={(e) => handleQuestionChange(e, q.id)} />
              <label>Options</label>
              {q.options.map((option, optionIndex) => (
                  <input key={optionIndex} type="text" value={option} placeholder="Write your choices here" onChange={(e) => handleOptionChange(e, q.id, optionIndex)} />
              ))}
              <button type="button" onClick={() => handleRemoveQuestion(q.id)}>Remove question</button>
          </div></>
      ))}
      <button type="button" onClick={handleAddQuestion}>Add question</button>
      
      {answers.map((answer, index) => (
        <><>
        <label>Answer {`${index + 1}`} (Value should be by index from 0 to 3)</label>
        </><div key={index}>
              <input type="text" value={answer} placeholder="Write answer for each question here" onChange={(e) => handleAnswerChange(e, index)} />
              {errors[index] && <div className='error'>{errors[index]}</div>}
          </div></>
      ))}
      <button type="button" onClick={submitValue}>Submit</button>
      {QuizAdded &&  QuizAdded==="Unsuccessful add of Course" && <div className='error'>{QuizAdded}</div>}
      {QuizAdded && QuizAdded==="Successful add of Course" && <div className='success'>{QuizAdded}</div>}
      </form>
    </div>
  );
  
  
  
}


export default CreateQuiz