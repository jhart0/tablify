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

  cssLabel: {
    color: '#95b2b8',
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: '1px',
    borderColor: '#95b2b8 !important',
  },
}))

type CodeBoxProps = {
  updateOutput: ((val: string) => void) | null
  output: string
  disabled: boolean
}

const CodeBox = ({ updateOutput, output, disabled }: CodeBoxProps) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(output)

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (updateOutput) {
      const inputValue = event.target.value
      setValue(inputValue)
      updateOutput(inputValue)
    }
  }

  const label = disabled ? 'Converted Code' : 'Paste Code Here'

  return (
    <div className={classes.root}>
      <TextField
        id={'outlined-multiline-static-code-box-' + disabled}
        data-testid={'outlined-multiline-static-code-box' + disabled}
        disabled={disabled}
        label={label}
        multiline={true}
        rows={4}
        variant="outlined"
        value={disabled ? output : value}
        onChange={handleChange}
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused,
          },
        }}
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline,
          },
          inputMode: 'text',
        }}
      />
    </div>
  )
}

export default CodeBox
