import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

const StudentType = ({ degree }) => {
  const [name, setName] = useState('')
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState(Array(questions.length).fill(''))


  const [studentsData, setStudentsData] = useState([])
  useEffect(() =>{
    const fetchQuestions = async () =>{
      try {
        const response = await axios.get('http://localhost:3001/questions')
        setQuestions(response.data)
        } catch (err) {
        console.error(err)
      }
    }

    fetchQuestions()
  }, [degree])

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

 const handleAnswerChange = (index, e) => {
  setAnswers(prevAnswers => [...prevAnswers.slice(0, index), e.target.value, ...prevAnswers.slice(index + 1)]);
}
  const handleRadioChange = (index, answer, questions, answers, setAnswers) =>{
    setAnswers(prevAnswers => [...prevAnswers.slice(0, index), { answer }, ...prevAnswers.slice(index + 1)])
  }

  const handleSubmit = async () =>{
    try {
      const answersArray = answers.map(({ answer }) => (
        {  answer: answer || '' 
 
      }))

      const newStudent = {
        id: uuidv4(),
        name,
        status: degree === 'master' ? 'master' : 'Bacholar',
        questions: questions.map((q) => q.id),
        answers: answersArray,
      }

      await axios.post('http://localhost:3001/survey', newStudent)
      setStudentsData((prevStudentsData) => [...prevStudentsData, newStudent])
      console.log('Survey submitted successfully')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h2>{degree === 'master' ? 'Bachelor Student' : 'Master Student'}</h2>
      <h3>Name: <input type="text" value={name} onChange={handleNameChange} /></h3>
      {questions.map((question, index) => (
        <div key={question.id}>
         <h2>{question.question}</h2>
          <h4>{question.description}</h4>
          {index === questions.length - 1 ? (
            <textarea
              placeholder={question.placeholder}
              value={answers[index]?.answer || ''}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
          ) : (
            <>
              {question.answer &&
                question.answer.map((answer, answerIndex) => (
                  <div key={answerIndex}>
                    <input
                    type="radio"
                    value={answer}
                    checked={answers[index]?.answer === answer}
                    onChange={() => handleRadioChange(index, answer, questions, answers, setAnswers)}
                  />
                     <label>{answer}</label>
                  </div>
                ))}
            </>
          )}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default StudentType