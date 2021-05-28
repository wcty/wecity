import { InputAdornment, TextField } from '@material-ui/core';
import { SetterOrUpdater } from 'recoil'
import type { NumberProps } from '../types'

type NumberInputProps = {
  input: NumberProps,
  formData: {[prop: string]: any},
  setFormData: SetterOrUpdater<{[prop:string]: any }>,
  classes: {[prop: string]: string}
}

export default function NumberInput ({ input, formData, setFormData, classes }: NumberInputProps) {
  return (
    <TextField 
      key={input.id}
      id={input.id} 
      label={input.label}
      className={classes.text}
      variant="outlined"
      InputProps={ input?.adornment ? {
        endAdornment:<InputAdornment position="end">{input?.adornment}</InputAdornment>
      }:undefined }
      onChange={(e)=>{
        setFormData({ ...formData, [input.id]: e.target.value })
      }}
      defaultValue={formData && formData[input.id]?formData[input.id]:""}
    />
  )
}