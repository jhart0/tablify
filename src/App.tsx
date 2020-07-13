import React from 'react'
import './App.css'
import CodeBox from './Components/CodeBox'
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
        <CodeBox
          data-testid={'input-box'}
          updateOutput={handleChange}
          output={value}
          disabled={false}
        />
        <CodeBox data-testid={'output-box'} updateOutput={null} output={value} disabled={true} />
      </header>
    </div>
  )
}

export default App
