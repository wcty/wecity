import { FormControl, InputLabel, Select, MenuItem, Typography, TextField, Button, MobileStepper, CircularProgress, Box } from '@material-ui/core';
import { SetterOrUpdater } from 'recoil'
import type { SelectProps } from '../types'

type SelectInputProps = {
  input: SelectProps,
  formData: {[prop: string]: any},
  setFormData: SetterOrUpdater<{[prop:string]: any }>
}

export default function SelectInput ({ input, formData, setFormData }: SelectInputProps) {
  return (
    <FormControl 
      variant="outlined" key={input.id}
      style={{width: '100%', marginTop:'1rem'}}
    >
      <InputLabel id={input.id} key={input.id+'lbl'} >{input.label}</InputLabel>
      <Select
        key={input.id} 
        labelId={input.id}
        id={input.id}
        value={formData && formData[input.id]?formData[input.id]:undefined}
        onChange={(e)=>{
          setFormData({ ...formData, [input.id]: e.target.value })
        }}
        label={input.label}
      >
        {input.options.filter(f=>f.name!=="all").map(opt=><MenuItem key={opt.name} value={opt.name}>{opt.label}</MenuItem>)}
      </Select>
    </FormControl>
  )
}