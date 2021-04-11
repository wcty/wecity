import React, { useState, useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Fab, Collapse } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab';
import { useRecoilState, useRecoilValue } from 'recoil'
import { atoms } from 'misc'
import { Menu as MenuIcon } from '@material-ui/icons'
import Drawer from '../Drawer'

const useStyles = makeStyles(theme => ({
  MenuFab: {
    position: 'absolute',
    left: '1rem',
    zIndex: 12,
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

export default ()=>{
  const classes = useStyles()
  const [alert, setAlert] = useState<null|{description:string}>(null)
  const user = useRecoilValue(atoms.user)
  const [initiativeBar, setInitiativeBar] = useRecoilState(atoms.initiativeBarAtom)
  const [drawer, setDrawer] = useState(false)

  return (
    <>
      <>
        <Fab 
          onClick={()=>{setDrawer(!drawer)}}
          className={classes.MenuFab} 
          style={{
            top: initiativeBar?'unset':'1rem',
            bottom: initiativeBar?'1rem':'unset',
            position:'absolute'
          }}
          aria-label="add"
        >
          <MenuIcon />
        </Fab>
        <Drawer state={drawer} setState={setDrawer}/>
      </>
    { alert && !user && (
      <Collapse in={Boolean(alert)}>
        <Alert severity="info" className={classes.alert} onClose={() => {setAlert(null)}}>
          <AlertTitle>Info</AlertTitle>
          {alert?.description}
        </Alert>
      </Collapse>
    )

    }
    </>
  )
}