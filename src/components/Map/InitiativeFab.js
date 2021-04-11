import React, { useState, useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Fab, Collapse } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {  selectedAtom, initiativeBarAtom, creatingAtom, user } from 'misc/atoms'
import { AddLocation } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { useI18n } from 'misc/hooks'

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

export default ({ active, getMarker })=>{
  const classes = useStyles()
  const setIsCreating = useSetRecoilState(creatingAtom)
  const [alert, setAlert] = useState(null)
  const user = useRecoilValue(user)
  const fabRef = useRef()
  const setSelected = useSetRecoilState(selectedAtom)
  const [initiativeBar, setInitiativeBar] = useRecoilState(initiativeBarAtom)
  const i18n = useI18n()
  const history = useHistory()

  return (
    <>
      <>
        <Fab 
          onClick={()=>{
            if(active){
              history.push('/create-initiative')
              setIsCreating(true)
              setSelected(null)
              setInitiativeBar(false)
            }else{
              setAlert({description: i18n('alertYouNeedToLogin')})
            }
          }}
          ref={fabRef}
          className={classes.InitiativeFab} 
          style={{
            top: initiativeBar?'unset':'1rem',
            bottom: initiativeBar?'1rem':'unset',
            zIndex: 1,
          }}
          raised="true" 
          aria-label="add"
        >
          <AddLocation />
        </Fab>
      </>
    { alert && user.isAnonymous && (
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