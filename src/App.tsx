import React from 'react'
import './App.css'
import CodeBox from './Components/CodeBox'
import OutputBox from './Components/OutputBox'
import InputConversionService from './Services/inputConversionService'

function App() {
  const [value, setValue] = React.useState('')

  const handleChange = (val: string) => {
    val = InputConversionService.convertToSql(val)
    setValue(val)
  }

  return (
    <div className="App" id="app-wrapper" data-testid="app-wrapper">
      <header className="App-header">
        <p>Tablify</p>
        <CodeBox updateOutput={handleChange} />
        <OutputBox output={value} />
      </header>
    </div>
  )
}

export default App
