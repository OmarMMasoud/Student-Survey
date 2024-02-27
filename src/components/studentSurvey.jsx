import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentSurvey() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3002/students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.log('Error fetching students:', error);
      });
  }, []);

  const handleNewSurveyClick = () => {
    navigate('/surveyType');
  }

  return (
    <div className='survey'>
      <button onClick={handleNewSurveyClick}>New Survey</button>
      {students.map(student => (
        <div className='studentCard' key={student.id}>
          <h3 className='status'>{student.status}</h3>
          <h2 className='studentName'>{student.name}</h2>
          <ul className="questions-answers">
            {student.questions.map((question, questionIndex) => (
              <li className='list' key={question.id}>
                <span className="question">{`Q${question}`}</span>
                {student.answers[questionIndex] && (
                  <span className="answer">{student.answers[questionIndex]}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default StudentSurvey;