import React from 'react'
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

export default function CodeBox() {
  const classes = useStyles()
  const [value, setValue] = React.useState('Paste Code Here to convert')

  const handleChange = (inputValue: string) => {
    setValue(inputValue)
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
