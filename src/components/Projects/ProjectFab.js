import React, { useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Fab, Collapse } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab';
import { useRecoilState, useRecoilValue } from 'recoil'
import {  selectedAtom, creatingAtom, userAtom, mapAtom } from 'global/Atoms'
import { AddLocation, MyLocation, Add } from '@material-ui/icons'
import useMeasure from "use-measure";

const useStyles = makeStyles(theme => ({
  createFab: {
    position: 'fixed',
    bottom: '1rem',
    right: '2rem',
  },
}))  

export default ({ active, getMarker, isCreating, setIsCreating })=>{
  const classes = useStyles()

  return !isCreating && (
    <>
        <Fab 
          onClick={()=>{
            if(active){
              setIsCreating(true)
            }
          }}
          style={{
            zIndex:200
          }}
          className={classes.createFab} 
          raised="true" 
          aria-label="add"
        >
          <Add />
        </Fab>
      </>
  )
}