import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [needs, setNeeds] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/needs')
      .then(response => {
        setNeeds(response.data)
      })
  }, [])

  return (
    <div>
      <h1>Needfull</h1>
      <ul>
        {needs.map((need: any) => (
          <li key={need.id}>
            {need.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
