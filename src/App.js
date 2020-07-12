import React, { useState } from 'react';
import './App.css';

var formatCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function App() {
  const [salary, setSalary] = useState(null)
  const [hours, setHours] = useState(null)

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
          <p>{formatCurrency.format(salary)} / year</p>
          <p>{salary > 0 ? formatCurrency.format(salary / 52) : formatCurrency.format(salary)} / week</p>
          {
            hours > 0 
            ? <p>{formatCurrency.format(salary / 52 / hours)} / hour</p> 
            : null
          }
        </div>
      </div>
    </div>
  );
}

export default App;
