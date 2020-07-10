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

type OutputBoxProps = {
  output: string
}

const OutputBox = ({ output }: OutputBoxProps) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <TextField
        id="outlined-multiline-static-output-box"
        data-testid="outlined-multiline-static-output-box"
        label="Converted Code"
        multiline={true}
        rows={4}
        variant="outlined"
        value={output}
      />
    </div>
  )
}

export default OutputBox
