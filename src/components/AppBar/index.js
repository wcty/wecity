import React, { Suspense, useRef, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Paper, Avatar, Button, Typography, IconButton, CircularProgress } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import MenuIcon from '@material-ui/icons/Menu';
import firebase from 'firebase'
import useMeasure from "use-measure";
import { barAtom, userAtom } from 'global/Atoms'
import Drawer from './drawer'
import { useAuth, useUser } from 'reactfire';
import { useRecoilState } from 'recoil';
import ErrorBoundary from 'global/ErrorBoundary'
import {ReactComponent as Logo} from 'assets/images/wecityLogoBlack.svg'

const Styles = makeStyles( theme => ({
  appbar: {
    zIndex: 10,
  },
  button: {
    margin: theme.spacing(0),
    marginLeft: 'auto'
  },
  progress: {
    color: 'black',
    marginRight: theme.spacing(1),
  },
  progressText: {
    ...theme.typography.button,
    marginRight: '1rem',
    color: 'black'
  },
  progressLoaderContainer: {
    display: 'flex',
    marginLeft: 'auto'
  },
  userProfileContainer: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 0
  },
  userProfileAvatar: {
    height: 24,
    width: 24,
    marginRight: theme.spacing(1),
  },
}))

const LogIn = ()=>{
  const classes = Styles()

  const auth = useAuth()
  const user = useUser();
  const [current, setCurrent] = useRecoilState(userAtom)
  useEffect(()=>{
    setCurrent(JSON.parse(JSON.stringify(user)))
  }, [user] )
  const provider = new firebase.auth.GoogleAuthProvider()
  const signInWithGoogle = () => {
    auth.signInWithRedirect(provider)
  };

  return(
          user?  
            <div className={classes.userProfileContainer}>

              {/* <Typography className={classes.progress}  type="body1" component="p">
                { user.displayName }
              </Typography> */}
              <Avatar
                alt={user.displayName}
                src={user.photoURL}
                className={classes.userProfileAvatar}
                onClick={()=>auth.signOut()} 
              />
              <Button 
                onClick={()=>auth.signOut()} 
                dense="true" 
                color="default" 
                className={classes.button}
              >
                Logout
              </Button>
            </div>
          :
        <Button onClick={signInWithGoogle} dense="true" color="default" className={classes.button}>
          <AccountCircle  className={classes.progress} />
          Login
        </Button>
  )
}

const Bar = (props)=>{

  const classes = Styles()
  const barRef = useRef()
  const barMeasure = useMeasure(barRef)
  const [barDimensions, setBarDimensions] = useRecoilState(barAtom)
  const [drawer, setDrawer] = useState(false)
  useEffect(()=>{
    setBarDimensions(barMeasure)
    //console.log(barMeasure)
  },[barMeasure])
  return (
    <>
      <AppBar elevation={1} position="static" className={classes.appbar} ref={barRef}>
        <Toolbar >
        <IconButton onClick={()=>{setDrawer(!drawer)}} 
          edge="start" 
          className={classes.menuButton} 
          color="default" 
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Logo style={{ height:"20px"}}></Logo>

        {/* <Typography type="title" color="inherit" className={classes.flex} style={{marginLeft: 15}}>
        </Typography> */}
        <Suspense fallback={            
            <div className={classes.progressLoaderContainer}>
              <CircularProgress size={24} color="default" className={classes.progress} />
              <Typography className={classes.progressText} type="button" component="p">
                Loading
              </Typography>
            </div>
          }>
          <LogIn />
          <Drawer state={drawer} setState={setDrawer}/>
        </Suspense>
        </Toolbar>
      </AppBar>
    </>
    )
}

export default Bar