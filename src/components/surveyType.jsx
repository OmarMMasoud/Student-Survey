import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SurveyType = ({ questions }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [degree, setDegree] = useState(null)
  const [filteredQuestions, setFilteredQuestions] = useState(null)

  useEffect(() => {
    if (degree === 'master') {
      setFilteredQuestions(questions)
    } else if (degree === 'bachelor' && questions && questions.length > 0) {
      setFilteredQuestions(questions.filter(question => question.id > 2))
    } else{
      setFilteredQuestions(null)
     }
  }, [degree, questions])


  const handleDegreeChange = (degree) => {
    return () => {
      setDegree(degree)

      if (degree === 'master') {
        setFilteredQuestions(questions)
      } else if (degree === 'bachelor') {
        setFilteredQuestions(questions.filter(question => question.id > 2))
      } else {
        setFilteredQuestions(null)
      }

      navigate('/task', { state: { degree, filteredQuestions } })
    }
  }

  return (
    <div className='surveyType'>
      <h1>Choose your degree:</h1>
      <button id='master' onClick={handleDegreeChange('master')}>Master</button>
      <button id='bachelor' onClick={handleDegreeChange('bachelor')}>bachelor</button>
    </div>
  )
}

export default SurveyType