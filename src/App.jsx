import React, { useState } from 'react';
import './App.css';
import Navbar from './components/navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function App() {
  const [code, setCode] = useState(''); // State to store code input
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleClose2 = () => setShow2(false);
  const handleShow1 = () => setShow1(true);
  const handleShow2 = () => setShow2(true);

  const timeComplexity = async () => {
    handleShow1();
    await handleAnalyzeClickTime();
  };

  const memoryComplexity = async () => {
    handleShow2();
    await handleAnalyzeClickMemory();
  };

  const handleAnalyzeClickTime = async () => {
    try {
      const response = await fetch('https://levilyze-backend.onrender.com/analyze/time', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }), // Ensure this field matches what backend expects
      });
      
      const data = await response.json();
      console.log('Response data:', data); // Log the response data
      setResult1(data.result); // Adjust based on backend response
    } catch (error) {
      console.error('Error analyzing time complexity:', error);
      setResult1("An error occurred while analyzing the time complexity.");
    }
  };

  const handleAnalyzeClickMemory = async () => {
    try {
      const response = await fetch('https://levilyze-backend.onrender.com/analyze/memory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }), // Ensure this field matches what backend expects
      });
      
      const data = await response.json();
      console.log('Response data:', data); // Log the response data
      setResult2(data.result); // Adjust based on backend response
    } catch (error) {
      console.error('Error analyzing memory:', error);
      setResult2("An error occurred while analyzing the memory taken.");
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
        <div className="btn-hldr">
          <button className="main-btn" onClick={timeComplexity}>
              Time Complexity
          </button>
          <button className='main-btn' onClick={memoryComplexity}>
              Memory Taken
          </button>
        </div>
        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>Time Complexity</Modal.Title>
          </Modal.Header>
          <Modal.Body>{result1}</Modal.Body>
        </Modal>
        <Modal show={show2} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>Memory</Modal.Title>
          </Modal.Header>
          <Modal.Body>{result2}</Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default App;
