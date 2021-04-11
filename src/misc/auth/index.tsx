import { SetterOrUpdater } from 'recoil'
import * as atoms from '../recoil/atoms'
import { setRecoilExternalState } from '../recoil/RecoilExternalStatePortal'
import { cookies } from '../'
import { useApolloClient } from '@apollo/client'
import { client } from '../../index'

export const logout = ()=>{
  console.log('logout')
  fetch(`https://auth.weee.city/auth/logout`,{
    method: 'POST',
    credentials: 'include'
  })
  setRecoilExternalState(atoms.auth, null)
  setRecoilExternalState(atoms.user, null)
  cookies.remove('refresh_token')
  client.resetStore()
  jwtToken.current=null
}

export type JWTResponse = {
  jwt_expires_in: number,
  jwt_token: string,
  refresh_token: string,
  user:{
    id: string|null,
    email: string|null,
    display_name: string|null
  }
}

export var jwtToken = {
  current: null as string|null
};

export function refreshJWT (token:string, setAuth:SetterOrUpdater<any>) {
  fetch(`https://auth.weee.city/auth/token/refresh?refresh_token=${token}`)
    .then(res=>res.json())
    .then((res:JWTResponse)=>{
      if(res.jwt_token){
        setAuth(res)
        jwtToken.current=res.jwt_token
        cookies.set('refresh_token', res.refresh_token, { path: '/' })
        setTimeout(()=>{
          refreshJWT(res.refresh_token, setAuth)
        }, Number(res.jwt_expires_in)-1000)
      }
    })
}

