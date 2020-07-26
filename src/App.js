import React, { useState } from 'react';
import './App.css';

const formatCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function calculateWeeklyIncome(salary) {
  return salary > 0 
    ? formatCurrency.format(salary / 52) 
    : formatCurrency.format(salary)
}

function calculateHourlyRate(salary, hours) {
  return hours > 0 
    ? <p>{formatCurrency.format(salary / 52 / hours)} / hour</p>
    : null
}
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
          <p><b>Results</b></p>
          <p>{ formatCurrency.format(salary) } / year</p>
          <p>{ calculateWeeklyIncome(salary) } / week</p>
          { calculateHourlyRate(salary, hours) }
        </div>
      </div>
    </div>
  );
}

export default App;
