import React, { useState } from 'react'
import './App.css'

const formatCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function calculateWeeklyIncome(taxableYearlyIncome) {
  return taxableYearlyIncome > 0 
    ? formatCurrency.format(taxableYearlyIncome / 52) 
    : formatCurrency.format(0)
}

function calculateHourlyRate(taxableYearlyIncome, hours) {
  return hours > 0 
    ? formatCurrency.format(taxableYearlyIncome / 52 / hours)
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

function calculateTaxOwed(taxableYearlyIncome) {

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

  if (taxableYearlyIncome > 0) {
    if (taxableYearlyIncome <= bracket1) {
      taxOwed += calculateTax(taxableYearlyIncome, rate1)
    } else {
      taxOwed += calculateTax(bracket1, rate1)
      if (taxableYearlyIncome <= bracket2) {
        taxOwed += calculateTax((taxableYearlyIncome - bracket1), rate2)
      } else {
        taxOwed += calculateTax((bracket2 - bracket1), rate2)
        if (taxableYearlyIncome <= bracket3) {
          taxOwed += calculateTax((taxableYearlyIncome - bracket2), rate3)
        } else {
          taxOwed += calculateTax((bracket3 - bracket2), rate3)
          taxOwed += calculateTax((taxableYearlyIncome - bracket3), rate4)
        }
      }
    }
  }

  return formatCurrency.format(taxOwed)
}

function App() {
  const [taxableYearlyIncome, setTaxableYearlyIncome] = useState(null)
  const [hours, setHours] = useState(40)

  return (
    <div className="App">
      <header className="App-header">
        <p>Income Calculator</p>
      </header>
      <div className="body-content">

        <div className="inputs body-column">
          <div className="div-input-money">
            <p>Taxable Yearly Income</p>
            <input 
            type="number" 
            className="input-money" 
            value={taxableYearlyIncome} 
            onChange={(e) => setTaxableYearlyIncome(e.target.value)} />
          </div>
          <div className="div-input-time">
            <p>Hours per week</p>
            <input 
            type="number" 
            className="input-time" 
            value={hours} 
            onChange={(e) => setHours(e.target.value)} />
          </div>
        </div>

        <div className="outputs body-column">
          <p><b>Results</b></p>
          <p>{ formatCurrency.format(taxableYearlyIncome) } / year</p>
          <p>{ calculateWeeklyIncome(taxableYearlyIncome) } / week</p>
          { 
            hours 
            ? <p>{ calculateHourlyRate(taxableYearlyIncome, hours) } / hour</p>
            : null
          }
          <p>{ calculateTaxOwed(taxableYearlyIncome) } Tax owed</p>
        </div>

      </div>
    </div>
  )
}

export default App
