import { TextField } from '@material-ui/core';
import { SetterOrUpdater } from 'recoil'
import type { TextProps } from '../types'

type TextInputProps = {
  input: TextProps,
  formData: {[prop: string]: any},
  setFormData: SetterOrUpdater<{[prop:string]: any }>,
  classes: {[prop: string]: string}
}

export default function TextInput ({ input, formData, setFormData, classes }: TextInputProps ) {
  return (
    <TextField 
      key={input.id}
      id={input.id} 
      label={input.label}
      className={classes.text}
      variant="outlined"
      multiline={input.rows? true: undefined}
      rows={input.rows? input.rows: undefined}
      inputProps={ input?.maxLength? { maxLength: input?.maxLength }: undefined }
      onChange={(e)=>{
        setFormData({ ...formData, [input.id]: e.target.value })
      }}
      defaultValue={formData && formData[input.id]?formData[input.id]:""}
      helperText={input.maxLength && `${formData && formData[input.id]?formData[input.id].length:0}/${input.maxLength}`}
    />
  )
}
