import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Fab } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  CreateInitiative: {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
  },
}))  

export default ()=>{
  const classes = useStyles()
  const [redirect, setRedirect] = useState()
  useEffect(()=>{
    if(redirect){
      setRedirect(null)
    }
  },[redirect])

  return <>
        {redirect && <Redirect to={redirect}/>}
        <Fab 
          onClick={()=>{
            setRedirect('/create-project')
          }}
          style={{
            zIndex:200
          }}
          className={classes.CreateInitiative} 
          raised="true" 
          aria-label="add"
        >
          <Add />
        </Fab>
      </>
}