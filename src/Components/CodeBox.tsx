import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Editor from 'react-simple-code-editor'
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-csharp'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

type CodeBoxProps = {
  updateOutput: (val: string) => void
  output: string
  disabled: boolean
}

const CodeBox = ({ updateOutput, output, disabled }: CodeBoxProps) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(output)

  const handleChange = (event: string) => {
    setValue(event)
    updateOutput(event)
  }

  const label = disabled ? 'Converted SQL Table' : 'Paste C# Class Here'
  const highlighter = (it: string) => Prism.highlight(it, Prism.languages.csharp, 'csharp')

  return (
    <div className={classes.root}>
      {label}
      <Editor
        id={'code-box-' + disabled}
        data-testid={'code-box' + disabled}
        disabled={disabled}
        value={disabled ? output : value}
        onValueChange={handleChange}
        highlight={highlighter}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
    </div>
  )
}

export default CodeBox
