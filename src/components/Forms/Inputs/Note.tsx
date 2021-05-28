import { Typography } from '@material-ui/core';
import type { NoteProps } from '../types'

type NoteInputProps = {
  input: NoteProps,
  classes: {[prop: string]: string}
}

export default function NoteInput ({ input, classes }: NoteInputProps) {
  return (
    <Typography
      key={input.id}
      id={input.id} 
      className={classes.text}
      variant="body2"
      style={{
        textAlign:'center',
      }}
    >
      {input.label}
    </Typography>
  )
}