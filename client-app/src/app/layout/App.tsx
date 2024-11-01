import { useEffect, useState } from 'react';
import axios from 'axios';
import { Assessment } from '../models/assessment';

function App() {

  const [assessments, setAssessments] = useState<Assessment[]>([]);


  useEffect(() => {
    axios.get<Assessment[]>('http://localhost:5000/api/assessments')
      .then(response => {
        console.log(response);
        setAssessments(response.data);
      })
  }, []);

  return (
    <div>
      <h1>Assessments</h1>
      <ul>
        {assessments.map(assessment => (
          <ul key={assessment.id}>
            {assessment.date}
          </ul>
        ))}
      </ul>
    </div>
  );
}
export default App