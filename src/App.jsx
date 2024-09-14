import React, { useState } from 'react';
import './App.css';
import Navbar from './components/navbar';

function App() {
  const [code, setCode] = useState(''); // State to store code input
  const [result, setResult] = useState(''); // State to store the result

  // Function to handle the button click
  // Ensure this matches what the backend expects
const handleAnalyzeClick = async () => {
  try {
    const response = await fetch('https://levilyze-backend.onrender.com/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }), // Ensure this field matches what backend expects
    });
    
    const data = await response.json();
    console.log('Response data:', data); // Log the response data
    setResult(data.result); // Set the result in the state
  } catch (error) {
    console.error('Error analyzing time complexity:', error);
    setResult("An error occurred while analyzing the time complexity.");
  }
};

  

  return (
    <>
      <div className="main">
        <Navbar />
        <br />
        <textarea 
          name="code" 
          id="codeInput" 
          rows="10" 
          cols="50"
          placeholder="Paste your code here..." 
          value={code}
          onChange={(e) => setCode(e.target.value)} 
        />
        <br />
        <button onClick={handleAnalyzeClick}>Analyze Time Complexity</button>
        <div>
          <h2>Result:</h2>
          <p>{result}</p>
        </div>
      </div>
    </>
  );
}

export default App;
