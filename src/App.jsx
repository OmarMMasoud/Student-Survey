import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import axios from 'axios'

// components 
import Nav from './components/nav'
import StudentSurvey from './components/studentSurvey'
import SurveyType from './components/surveyType'
import Task from './components/task'


const App = () => {
  return (
    <Router>
      <div className="div">
        <Nav />
        <Routes>
          <Route exact path="/" element={<StudentSurvey />} />
          <Route path="/surveyType" element={<SurveyType />} />
          <Route path="/Task" element={<Task/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App