import { useState, useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Fab, Collapse } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useI18n, atoms } from 'misc'
import { AddLocation } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  InitiativeFab: {
    position: 'absolute',
    right: '1rem',
    zIndex: 5,
    background: '#ffffff'
  },
  alert: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    maxWidth: '60%',
    zIndex: 5
  }
}))  

export default ({ active }:{ active: boolean })=>{
  const classes = useStyles()
  const [alert, setAlert] = useState<{description:string}|null>(null)
  const user = useRecoilValue(atoms.user)
  const setSelected = useSetRecoilState(atoms.selectedAtom)
  const [initiativeBar, setInitiativeBar] = useRecoilState(atoms.initiativeBarAtom)
  const i18n = useI18n()
  const history = useHistory()

  return (
    <>
      <>
        <Fab 
          onClick={()=>{
            if(active){
              history.push('/create-initiative')
              setSelected(null)
              setInitiativeBar(false)
            }else{
              setAlert({description: i18n('alertYouNeedToLogin')})
            }
          }}
          className={classes.InitiativeFab} 
          style={{
            top: initiativeBar?'unset':'1rem',
            bottom: initiativeBar?'1rem':'unset',
            zIndex: 1,
            position: 'absolute'
          }}
          aria-label="add"
        >
          <AddLocation />
        </Fab>
      </>
    { alert && !user && (
      <Collapse in={Boolean(alert)}>
        <Alert severity="info" className={classes.alert} onClose={() => {setAlert(null)}}>
          <AlertTitle>Info</AlertTitle>
          {alert.description}
        </Alert>
      </Collapse>
    )

    }
    </>
  )
}