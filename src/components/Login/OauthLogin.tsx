import React, { useEffect, useState } from 'react'
import { FormControl, TextField, Button } from '@material-ui/core'
import { useLocation } from 'react-router-dom'
import { SetterOrUpdater, useRecoilState } from 'recoil';
import { Redirect } from 'react-router-dom'
import { refreshJWT, atoms } from 'misc'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function OauthLogin () {
  const [auth, setAuth] = useRecoilState(atoms.auth)
  let query = useQuery()
  
  useEffect(()=>{
    const token = query.get("refresh_token")
    if(token) refreshJWT(token, setAuth)
  },[])
  
  return <Redirect to='/' />
}