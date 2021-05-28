
export interface ImageProps {
  type: "image"
  id: string
  imgPath?: string
  label: string
}

export interface SelectProps {
  type: "select"
  id: string
  label: string
  options: {
    name: string
    label: string
  }[]
}

export type FormGetterProps = (
  ImageProps|NoteProps|TextProps|SelectProps|NumberProps|ElementsProps
)[][]

export interface FormProps {
  formGetter:  ()=>FormGetterProps
  nextButton?: null|FormButton
  backButton?: null|FormButton
  directory?: string
  variant?: "text" | "progress" | "dots" | undefined
  floating: boolean
  finished: boolean
  setFinished: SetterOrUpdater<boolean>
}

export type NoteProps = {
  type: "note"
  id: string
  label: string
}

export type TextProps = {
  type: "text"
  id: string
  label: string
  rows?: number
  maxLength?: number
}

export type NumberProps = {
  type: "number"
  id: string
  label: string
  maxLength?: number
  adornment?: string
}

export type ElementsProps = {
  id: string
  type: 'elements'
  elements: JSX.Element[]
}
export type FormButtonProps = {
  activeStep: number, 
  setActiveStep: SetterOrUpdater<number>, 
  maxSteps: number, 
  valid: boolean, 
  formData: any
}

type FormButton = ( props: FormButtonProps ) => JSX.Element
