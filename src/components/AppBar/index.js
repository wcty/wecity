import React, { Suspense, useRef, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Box,  Avatar, Button, Typography, IconButton, CircularProgress } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import MenuIcon from '@material-ui/icons/Menu';
import firebase from 'firebase'
import useMeasure from "use-measure";
import { barAtom, userAtom, showBarAtom } from 'global/Atoms'
import Drawer from './drawer'
import { useAuth, useUser, useFirestore } from 'reactfire';
import { useSetRecoilState, useRecoilState } from 'recoil';
import {ReactComponent as Logo} from 'assets/images/wecityLogoBlack.svg'
import UserForm from './UserForm'
import { useI18n } from 'global/Hooks'
import { Route } from 'react-router-dom'

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
  const i18n = useI18n()
  const auth = useAuth()
  const user = useUser();
  const setCurrent = useSetRecoilState(userAtom)
  const usersRef = useFirestore().collection('users')
  const [newUser, setNewUser] = useState(false)
  //const [contactData, setContactData] = useState(false)

  useEffect(()=>{
    if(user){
      const users = usersRef.doc(user.uid)
      users.get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          users.onSnapshot((doc) => {
            //console.log(doc)
            // do stuff with the data
          });
        } else {
          console.log('no data')
          if(!user.isAnonymous) setNewUser(user.uid)
          //users.set({...}) // create the document
        }
      });
      setCurrent(JSON.parse(JSON.stringify(user)))
    }
  }, [user, setCurrent, usersRef] )

  // useEffect(()=>{
  //   if(contactData&&usersRef){
  //     console.log(contactData, user.uid)
  //     const users = usersRef.doc(user.uid)
  //     if(users){
  //       users.set(contactData) //
  //     }
  //   }
  // },[contactData, usersRef])

  const provider = new firebase.auth.GoogleAuthProvider()
  const signInWithGoogle = () => {
    auth.signInWithRedirect(provider)
  };

  return (<>
    {newUser &&(<Box style={{
      backgroundColor:'white',
      position: 'fixed',
      flexGrow: 1,
      top: 0, left: 0, bottom: 0, right: 0,
      zIndex: 999,
      overflowY: "auto",  
    }}>
      <UserForm isCreating={newUser} setIsCreating={setNewUser} /*setContactData={setContactData}*//>
    </Box>)}
    <Route path='/settings'><UserForm isCreating={newUser} setIsCreating={setNewUser} /*setContactData={setContactData}*/ /></Route>
    {!user.isAnonymous?  
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
                {i18n('exit')}
              </Button>
            </div>
          :
        <Button onClick={signInWithGoogle} dense="true" color="default" className={classes.button}>
          <AccountCircle  className={classes.progress} />
          {i18n('enter')}
        </Button>}
 </>)
}

export default (props)=>{
  const i18n = useI18n()
  const classes = Styles()
  const barRef = useRef()
  const barMeasure = useMeasure(barRef)
  const setBarDimensions = useSetRecoilState(barAtom)
  const [showBar] = useRecoilState(showBarAtom)

  const [drawer, setDrawer] = useState(false)
  // const theme = useTheme()
  useEffect(()=>{
    setBarDimensions(barMeasure)
    //console.log(barMeasure)
  },[barMeasure, setBarDimensions])

  return (
    <>
      <AppBar elevation={1} style={{ visibility: showBar?'visible':'hidden' }} color="default" position="static" className={classes.appbar} ref={barRef}>
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
              <CircularProgress size={24}  className={classes.progress} />
              <Typography className={classes.progressText} type="button" component="p">
                {i18n('loading')}
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