import React from 'react'
import { useNavigate } from 'react-router-dom'

const SurveyType = () => {
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const status = event.target.surveyType.value
    navigate('/task', { state: { status } })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className='selectType'>Are You A Master Or Bacholar Student  ?</h2>
      <div className="choices"><label htmlFor="master">Master</label>
      <input type="radio" id="master" name="surveyType" value="master" />
       <br />
      <label htmlFor="bachelor">Bachelor</label>
      <input type="radio" id="bachelor" name="surveyType" value="bachelor" />
      </div><br />
      <button className='submit' type="submit">Next</button>
    </form>
  )
}

export default SurveyType