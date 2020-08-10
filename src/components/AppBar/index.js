import React, { Suspense, useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Avatar, Button, Typography, IconButton, CircularProgress } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import MenuIcon from '@material-ui/icons/Menu';
import firebase from 'firebase'
import useMeasure from "use-measure";
import { barAtom, userAtom } from 'global/Atoms'

import { useAuth, useUser } from 'reactfire';
import { useRecoilState } from 'recoil';

const Styles = makeStyles( theme => ({
  appbar: {
    zIndex: 999
  },
  button: {
    margin: theme.spacing(0),
    marginLeft: 'auto'
  },
  progress: {
    color: 'inherit',
    marginRight: theme.spacing(1),
  },
  progressText: {
    ...theme.typography.button,
    color: 'inherit',
    marginRight: '1rem'
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

              <Typography className={classes.progress}  type="body1" component="p">
                { user.displayName }
              </Typography>
              <Avatar
                alt={user.displayName}
                src={user.photoURL}
                className={classes.userProfileAvatar}
              />
              <Button onClick={()=>auth.signOut().then(()=>{console.log("logout")})} dense="true" color="inherit" className={classes.button}>
                {/* <AccountCircle /> */}
                Logout
              </Button>
            </div>
          :
        <Button onClick={signInWithGoogle} dense="true" color="inherit" className={classes.button}>
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

  useEffect(()=>{
    setBarDimensions(barMeasure)
    //console.log(barMeasure)
  },[barMeasure])
  return (
      <AppBar position="static" className={classes.appbar} ref={barRef}>
        <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography type="title" color="inherit" className={classes.flex} style={{marginLeft: 15}}>
          Wecity
        </Typography>
        <Suspense fallback={            
            <div className={classes.progressLoaderContainer}>
              <CircularProgress size={24} className={classes.progress} />
              <Typography className={classes.progressText} type="button" component="p">
                Loading
              </Typography>
            </div>
          }>
          <LogIn />
        </Suspense>
        </Toolbar>
      </AppBar>
    )
}

export default Bar