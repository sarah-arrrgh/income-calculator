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

// TaxRates variable could look something like:
// incomeUpTo: taxRate
// eg.
// {
//   0: 10.5,
//   14000: 17.5,
//   48000: 30,
//   70000: 33
// }

// want this to take variable 'TaxRates' eventually, 
// single source of truth, 
// can be updated, 
// maybe diff folks have diff tax rates? 
// diff tax codes?

function calculateTaxOwed(salary) {

  const bracket1 = 14000
  const bracket2 = 48000
  const bracket3 = 70000

  const rate1 = 10.5
  const rate2 = 17.5
  const rate3 = 30
  const rate4 = 33

  let taxOwed = 0

  function calculateTax(amount, rate) {
    return amount / 100 * rate
  }

  if (salary > 0) {
    if (salary <= bracket1) {
      taxOwed += calculateTax(salary, rate1)
    } else {
      taxOwed += calculateTax(bracket1, rate1)
      if (salary <= bracket2) {
        taxOwed += calculateTax((salary - bracket1), rate2)
      } else {
        taxOwed += calculateTax((bracket2 - bracket1), rate2)
        if (salary <= bracket3) {
          taxOwed += calculateTax((salary - bracket2), rate3)
        } else {
          taxOwed += calculateTax((bracket3 - bracket2), rate3)
          taxOwed += calculateTax((salary - bracket3), rate4)
        }
      }
    }
  }
  return formatCurrency.format(taxOwed)
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
          { calculateTaxOwed(salary) } Tax owed
        </div>
      </div>
    </div>
  );
}

export default App;
