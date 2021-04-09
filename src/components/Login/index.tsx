import React, { useState } from 'react'
import { FormControl, TextField, Button } from '@material-ui/core'

export default function Login () {
  const [login, setLogin] = useState({email:'', password:''})

  return <div style={{ left:'calc(50vw - 150px)', top:'calc(50vh - 150px)', position:'absolute', backgroundColor:'#ccc', zIndex:5}}>
    <FormControl style={{ zIndex: 5, padding:'1rem'}}>
      <TextField 
        id="email" 
        label="Email"
        value={login.email}
        onChange={(e)=>setLogin({...login, email:e.target.value})}
        variant="standard" />
      <TextField 
        id="password" 
        label="Password"
        value={login.password}
        onChange={(e)=>setLogin({...login, password:e.target.value})}
        variant="standard" />
        <Button 
          style={{marginTop:'1rem'}}
          variant="outlined"
          onClick={()=>{
          console.log('register')
        }}>
          Register
        </Button>
        <div style={{display:'flex',}}>
          <Button 
            style={{marginTop:'1rem'}}
            variant="outlined"
            onClick={()=>{
              console.log('Google')
          }}>
            Google
          </Button>
          <Button 
            style={{marginTop:'1rem', marginLeft:'0.5rem'}}
            variant="outlined"
            onClick={()=>{
              console.log('Facebook')
          }}>
            Facebook
          </Button>
        </div>
    </FormControl>
  </div>
}