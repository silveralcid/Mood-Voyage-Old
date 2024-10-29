import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import NeedsForm from './components/form';

interface Need {
  id: number;
  name: string;
  category: string;
  rating: number;
  date: string;
}

function App() {
  const [needs, setNeeds] = useState<Need[]>([]);

  useEffect(() => {
    fetchNeeds();
  }, []);

  const fetchNeeds = () => {
    axios.get('http://localhost:5000/api/needs')
      .then(response => {
        setNeeds(response.data);
      })
      .catch(error => {
        console.error('Error fetching needs:', error);
      });
  };

  const handleFormSubmit = (formData: any) => {
    axios.post('http://localhost:5000/api/needs', formData)
      .then(response => {
        console.log('Need added successfully:', response.data);
        fetchNeeds(); // Refresh the needs list after adding a new need
      })
      .catch(error => {
        console.error('Error adding need:', error);
      });
  };

  return (
    <div>
      <h1>Needfull</h1>
      <NeedsForm onSubmit={handleFormSubmit} />
      <h2>Current Needs</h2>
      <ul>
        {needs.map((need: Need) => (
          <li key={need.id}>
            Name: {need.name} - Category: {need.category} - Rating: {need.rating} - Date: {need.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;