import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useLocation ,useNavigate } from 'react-router-dom';

const Task = () => {
  const location = useLocation();
  const { status } = location.state || {};
  const [questions, setQuestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [answers, setAnswers] = useState(
    questions.reduce((acc, question) => {
      acc[question.id] = '';
      return acc;
    }, {})
  );
  useEffect(() => {
    const fetchQuestions = async (status) => {
      try {
        const response = await axios.get('http://localhost:3002/questions')
        if (status === 'bachelor') {
          setQuestions(response.data.filter(question => question.id >= 3))
        } else {
          setQuestions(response.data)
        }
      } catch (error) {
        console.error('Error fetching questions:', error)
      }
    }
    const { status } = location.state || {}
    fetchQuestions(status)
  }, [status])
  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    try {
      const studentId = uuidv4();
      const studentName = name;
      const questionsResponse = await axios.get('http://localhost:3002/questions');
      let questionsArray = [];
      if (status === 'bachelor') {
        questionsArray = questionsResponse.data.filter(question => questions.some(q => q.id === question.id)).slice(-2).map(question => question.id);
      } else {
        questionsArray = questionsResponse.data.map(question => question.id);
      }
      const newStudent = {
        id: studentId,
        name: studentName,
        status: status,
        questions: questionsArray,
        answers: Object.values(answers)
      };
      const studentsResponse = await axios.post('http://localhost:3002/students', newStudent);
      const answersArray = Object.values(answers);
      const jsonString = JSON.stringify(
        {
          ...newStudent,
          answers: answersArray.map((answer, index) => ({
            question: questions[index].question,
            answer: answer,
          })),
        },
        null,
        '\n'
      );
      console.log('New student added to server:\n', jsonString);
    } catch (error) {
      console.error('Error posting answers:', error);
    }
  };

  return (
    <div className='task'>
      <h2>Student Name</h2>
      <p>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </p>
      {questions && (
        <ul>
          {questions.map((question, index) => (
            <li key={question.id}>
              <h3>{question.question}</h3>
              <p>{question.description}</p>
              {index !== questions.length - 1 ? (
                <ul>
                  {question.answer &&
                    question.answer.map((choice, index) => (
                      <li key={index}>
                        <input
                          type="radio"
                          id={`question-${question.id}-choice-${index}`}
                          name={`question-${question.id}`}
                          value={choice}
                          checked={answers[question.id] === choice}
                          onChange={() => handleAnswerChange(question.id, choice)}
                        />
                        <label htmlFor={`question-${question.id}-choice-${index}`}>
                          {choice}
                        </label>
                      </li>
                    ))}
                </ul>
              ) : (
                <textarea
                  value={answers[question.id]}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                />
              )}
            </li>
          ))}
        </ul>
      )}
      {!questions && <p>Loading questions...</p>}
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Task;