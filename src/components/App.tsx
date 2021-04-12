import React, { useEffect, useRef, Suspense, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import Map from './Map'
import { Route } from 'react-router-dom'
import Login, {  OauthLogin } from './Login'
import MenuFab from './Fabs/MenuFab'
import { useRecoilState } from 'recoil'
import { cookies, atoms, refreshJWT } from 'misc'
import { useLazyQuery, gql } from '@apollo/client'
import Uploader from './Uploader'

const useStyles = makeStyles(theme => ({

  root:{
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  map: {
    top: 0,
    width: '100%',
    height: `100%`,
    position: 'fixed',
    zIndex:0,
	},
	sidebar: {
		marginTop: `100%`,
		width: '100%',
		
		[theme.breakpoints.up('sm')]: {
			marginTop: 0,
			width: '50%',
			maxWidth: 400,
			justify: "flex-end",
			float: "right",
    }
  }  
}))


export default () => {
  const classes = useStyles()
  const [auth, setAuth]  = useRecoilState(atoms.auth)
  const [user, setUser] = useRecoilState(atoms.user)

  const [getUser, {data:userData}] = useLazyQuery(gql`
    query getUser ($pk: uuid!) {
      users_by_pk(id: $pk) {
        avatar_url
        created_at
        display_name
      }
  }`, {variables:{pk:auth?.user.id}})
  
  useEffect(()=>{
    //Startup auto-login
    const token = cookies.get('refresh_token')
    // console.log('refresh_token: ', token)
    if(token){
      refreshJWT(token, setAuth)
    }
  },[])

  useEffect(()=>{
    if(auth){
      if(!userData){
        // console.log('get user', auth)
        getUser()
      }else{
        console.log('set user', userData)
        setUser({...auth?.user, ...userData?.users_by_pk})
      }
    }
  },[auth, userData])

  return (
    <Box className={classes.root}>
      <Uploader/>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/oauth/success">
        <OauthLogin/>
      </Route>
      <Route path="/">
        <Box className={classes.map}>
          <Map />
          <MenuFab />
        </Box>
      </Route>
    </Box>
  )
}
