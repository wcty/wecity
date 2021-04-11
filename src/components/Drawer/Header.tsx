import React, { Suspense, useRef, useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { ListItem, ListItemAvatar, ListItemText, Toolbar, Box,  Avatar, Button, Typography, IconButton, CircularProgress } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import MenuIcon from '@material-ui/icons/Menu';
import { useRecoilState } from 'recoil';
import {ReactComponent as Logo} from 'assets/images/wecityLogoBlack.svg'
import { useI18n } from 'misc/hooks'
import { useHistory, Link } from 'react-router-dom'
import { jwtToken, logout, atoms } from 'misc'

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

const LogIn = (props:any)=>{
  const classes = Styles()
  const i18n = useI18n()
  const [auth, setAuth]:any = useRecoilState(atoms.auth);
  const [user, setUser]:any = useRecoilState(atoms.user);
  const history = useHistory()


  return !user ?
    <ListItem button style={{height:'5rem'}} onClick={()=>{console.log('google signin'); history.push('/login'); props.setState(false)}}>        
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
          alt={user?.display_name||undefined}
          src={user?.avatar_url||undefined}
          className={classes.userProfileAvatar}
          onClick={()=>history.push('/settings')} 
        />
      </ListItemAvatar>         
      <ListItemText 
        primary={user?.display_name}
        secondary={i18n('exit')}
        primaryTypographyProps={{component: Link, to: "/settings", style: {color: "#ffffff", fontWeight: "normal", textTransform: "uppercase", textDecoration:"none"}}}
        secondaryTypographyProps={{component: Link, to:"#", onClick: logout, style: {color: "#ffffff", fontWeight: "lighter"}}}
      />
    </ListItem>
}

export default (props:any)=>{
  const i18n = useI18n()
  const classes = Styles()
  const [showBar] = useRecoilState(atoms.showBarAtom)
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
          <LogIn {...props} />
        </Suspense>
      </div>
    </>
    )
}