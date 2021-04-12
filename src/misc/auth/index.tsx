import { SetterOrUpdater } from 'recoil'
import { cookies, atoms, setRecoilExternalState } from '../'
import { client, history } from '../../index'

const setAuth = (res:JWTResponse|null)=>setRecoilExternalState(atoms.auth, res)
const setUser = (res:any)=>setRecoilExternalState(atoms.user, res)

export const logout = ()=>{
  console.log('logout')
  fetch(`https://auth.weee.city/auth/logout`,{
    method: 'POST',
    credentials: 'include'
  })
  setAuth(null)
  setUser(null)
  cookies.remove('refresh_token')
  client.resetStore()
  jwtToken.current=null
}

export const register = async (credentials:{email:string, password:string})=>{
  console.log('register')
  const jwt_token = await (await fetch(`https://auth.weee.city/auth/register`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    //credentials: 'include',
    body: JSON.stringify(credentials)
  })).json()
  console.log(jwt_token)
  // setRecoilExternalState(atoms.auth, null)
  // setRecoilExternalState(atoms.user, null)
  // cookies.remove('refresh_token')
  // client.resetStore()
  // jwtToken.current=null
}

export const login = async (credentials:{email:string, password:string})=>{
  
  console.log('login')
  const res =  await (await fetch(`https://auth.weee.city/auth/login`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    //credentials: 'include',
    body: JSON.stringify(credentials)
  })).json()
  if(res.jwt_token) {
    jwtToken.current=res.jwt_token
    setAuth(res)
    return true;
    // history.push('/')
    // cookies.set('refresh_token', res.refresh_token, { path: '/' })
  }else{ return false; }
}

export type JWTResponse = {
  jwt_expires_in: number,
  jwt_token: string,
  refresh_token?: string,
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

        const { refresh_token } = res
        if(refresh_token){
          cookies.set('refresh_token', refresh_token, { path: '/' })
          setTimeout(()=>refreshJWT(refresh_token, setAuth), Number(res.jwt_expires_in)-1000)  
        }
      }
    })
}

