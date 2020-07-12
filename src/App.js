import React, { useState } from 'react';
import './App.css';

function App() {
  const [salary, setSalary] = useState(0)
  const [hours, setHours] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Income Calculator
        </p>
      </header>
      <div className="body-content">
        <div className="inputs body-column">
          <div className="div-input-money">
            <p>Salary</p>
            <input type="number" className="input-money" value={salary} onChange={(e) => setSalary(e.target.value)} />
          </div>
          <div className="div-input-time">
            <p>Hours per week</p>
            <input type="number" className="input-time" value={hours} onChange={(e) => setHours(e.target.value)} />
          </div>
        </div>
        <div className="outputs body-column">
          <p>Results</p>
          <p>${salary} / year</p>
          <p>${salary > 0 ? (salary / 52).toFixed(2) : salary} / week</p>
          {
            hours > 0 
            ? <p>${(salary / 52 / hours).toFixed(2)} / hour</p> 
            : null
          }
        </div>
      </div>
    </div>
  );
}

export default App;
