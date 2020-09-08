import React, { useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Fab, Collapse } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {  selectedAtom, initiativeBarAtom, creatingAtom, userAtom, mapAtom } from 'global/Atoms'
import { AddLocation } from '@material-ui/icons'
import useMeasure from "use-measure";
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  InitiativeFab: {
    position: 'absolute',
    right: '1rem',
    zIndex: 5
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
  const [isCreating, setIsCreating] = useRecoilState(creatingAtom)
  const [alert, setAlert] = useState(null)
  const user = useRecoilValue(userAtom)
  const fabRef = useRef()
  const setSelected = useSetRecoilState(selectedAtom)
  const [initiativeBar, setInitiativeBar] = useRecoilState(initiativeBarAtom)
  const [redirect, setRedirect] = useState(null)


  return (
    <>
    {redirect && <Redirect to={redirect} />}
      <>
        <Fab 
          onClick={()=>{
            if(active){
              setRedirect('/create-initiative')
              setIsCreating(true)
              setSelected(null)
              setInitiativeBar(false)
            }else{
              setAlert({description: "Ви маєте увійти щоб створити ініціативу, проект або ресурс"})
            }
          }}
          ref={fabRef}
          className={classes.InitiativeFab} 
          style={{
            top: initiativeBar?'unset':'1rem',
            bottom: initiativeBar?'1rem':'unset',

          }}
          raised="true" 
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