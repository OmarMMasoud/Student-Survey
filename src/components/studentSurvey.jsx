import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const StudentSurvey = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchAnswers = async (studentId) => {
    try {
      const response = await axios.get(`http://localhost:3001/students/${studentId}/answers`);
      return response.data;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/students');
      const studentsWithAnswers = await Promise.all(
        response.data.map(async (student) => {
          const answers = await fetchAnswers(student.id);
          return { ...student, answers };
        })
        
      );
      setStudents(studentsWithAnswers);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNewSurveyClick = () => {
    navigate('./surveyType');
  };

  return (
    <div className="survey">
      <button id="newSurvey" onClick={handleNewSurveyClick}>
        New Survey
      </button>
      {students.map((student, index) => (
  <div key={student.id} className="studentCard">
          <p className="status">{student.status}</p>
          <h2 className="studentName">{student.name}</h2>
          <ul className="questions">
  {student.questions &&
    student.questions.map((question, index) => (
      <li key={question.id} className="q">
        <span>{index + 1}.</span>
        {question}
      </li>
    ))}
</ul>
<ul className="answers">
  {student.answers &&
    student.answers.map((answer, index) => (
      <li key={answer.id} className="q">
        {index + 1}.<span>{answer}</span>
      </li>
    ))}
</ul>
        </div>
      ))}
    </div>
  ); }
  export default StudentSurvey