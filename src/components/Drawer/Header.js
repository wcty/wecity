import React, { Suspense, useRef, useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { ListItem, ListItemAvatar, ListItemText, Toolbar, Box,  Avatar, Button, Typography, IconButton, CircularProgress } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import MenuIcon from '@material-ui/icons/Menu';
import { showBarAtom } from 'global/Atoms'
import { useAuth, useUser, useFirestore } from 'reactfire';
import { useRecoilState } from 'recoil';
import {ReactComponent as Logo} from 'assets/images/wecityLogoBlack.svg'
import { useI18n } from 'global/Hooks'
import { useHistory, Link } from 'react-router-dom'
import { signInWithGoogle } from 'global/Misc'

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
  const history = useHistory()


  return !user || user.isAnonymous?
    <ListItem button style={{height:'5rem'}} onClick={signInWithGoogle(auth)}>        
      <ListItemAvatar>
        <AccountCircle color='primary'/>
      </ListItemAvatar> 
      <ListItemText 
        secondary={i18n('enter')}
        secondaryTypographyProps={{style: {color: "#ffffff", fontWeight: "lighter"}}}
      />
    </ListItem>
    :
    <ListItem>
      <ListItemAvatar>
        <Avatar
          alt={user.displayName}
          src={user.photoURL}
          className={classes.userProfileAvatar}
          onClick={()=>history.push('/settings')} 
        />
      </ListItemAvatar>         
      <ListItemText 
        primary={user.displayName}
        secondary={i18n('exit')}
        primaryTypographyProps={{component: Link, to: "/settings", style: {color: "#ffffff", fontWeight: "normal", textTransform: "uppercase", textDecoration:"none"}}}
        secondaryTypographyProps={{component: Link, onClick: ()=>auth.signOut(), style: {color: "#ffffff", fontWeight: "lighter"}}}
      />
    </ListItem>
}

export default (props)=>{
  const i18n = useI18n()
  const classes = Styles()
  const [showBar] = useRecoilState(showBarAtom)
  const [drawer, setDrawer] = useState(false)
  const theme = useTheme()

  return (
    <>
      <Toolbar >
        <Logo style={{ height:"20px"}}></Logo>
      </Toolbar>
      <div
        style={{backgroundColor: theme.palette.primary.dark }}
      >
        <Suspense fallback={ 
          <ListItem>
            <ListItemAvatar>
              <CircularProgress size={24}  className={classes.progress} />
            </ListItemAvatar>         
            <ListItemText 
              primary={i18n('loading')}
              primaryTypographyProps={{style: {color: "#ffffff", fontWeight: "lighter"}}}
            />
          </ListItem>
        }>
          <LogIn />
        </Suspense>
      </div>
    </>
    )
}