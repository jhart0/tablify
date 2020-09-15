import React from 'react'
import './App.css'
import CodeBox from './Components/CodeBox'
import InputConversionService from './Services/inputConversionService'

function App() {
  const classInit = `public class foo
{
    public int bar {get;set;}
}`

  const tableInit = `create table foo
(
  bar int
)`

  const [classDef, setClass] = React.useState(classInit)
  const [tableDef, setTable] = React.useState(tableInit)

  const handleClassChange = (val: string) => {
    val = InputConversionService.convertToSql(val)
    setTable(val)
  }

  const handleTableChange = (val: string) => {
    // TODO: Implement convert to c# service
    setClass(val)
  }

  return (
    <div className="App" id="app-wrapper" data-testid="app-wrapper">
      <header className="App-header">
        <h2>Tablify</h2>
        <CodeBox
          data-testid={'input-box'}
          updateOutput={handleClassChange}
          output={classDef}
          disabled={false}
        />
        <CodeBox
          data-testid={'output-box'}
          updateOutput={handleTableChange}
          output={tableDef}
          disabled={true}
        />
      </header>
    </div>
  )
}

export default App
