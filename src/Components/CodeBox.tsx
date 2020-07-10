import React, { ChangeEvent } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

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
}

const CodeBox = ({ updateOutput }: CodeBoxProps) => {
  const classes = useStyles()
  const [value, setValue] = React.useState('Paste Code Here to convert')

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const inputValue = event.target.value
    setValue(inputValue)
    updateOutput(inputValue)
  }

  return (
    <div className={classes.root}>
      <TextField
        id="outlined-multiline-static-code-box"
        data-testid="outlined-multiline-static-code-box"
        label="Paste Code Here"
        multiline={true}
        rows={4}
        variant="outlined"
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default CodeBox
