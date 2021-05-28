import { useState } from 'react'
import { FormControl, TextField, Button } from '@material-ui/core'
import { auth } from 'misc'
import { useHistory } from 'react-router'

export default function Login () {
  const [credentials, setCredentials] = useState({email:'', password:''})
  const history = useHistory()
  return <div style={{ left:'calc(50vw - 150px)', top:'calc(50vh - 150px)', position:'absolute', backgroundColor:'#ccc', zIndex:5 }}>
    <FormControl style={{ zIndex: 5, padding:'1rem'}}>
      <TextField 
        id="email" 
        label="Email"
        value={credentials.email}
        onChange={(e)=>setCredentials({...credentials, email:e.target.value})}
        variant="standard" />
      <TextField 
        id="password" 
        label="Password"
        value={credentials.password}
        onChange={(e)=>setCredentials({...credentials, password:e.target.value})}
        variant="standard" />
        <div style={{display:'flex'}}>
          <Button 
            style={{marginTop:'1rem'}}
            variant="outlined"
            onClick={()=>{
              if( credentials.email && credentials.password ) {
                auth.login(credentials)
              }
          }}>
            Login
          </Button>
          <Button 
            style={{marginTop:'1rem', marginLeft:'0.5rem'}}
            variant="outlined"
            onClick={()=>{
              if( credentials.email && credentials.password ) {
                auth.register(credentials)
              }
          }}>
            Register
          </Button>
        </div>
        <div style={{display:'flex',}}>
          <Button 
            style={{marginTop:'1rem'}}
            variant="outlined"
            onClick={()=>auth.login({ provider: 'google' })}
          >
            Google
          </Button>
          <Button 
            style={{marginTop:'1rem', marginLeft:'0.5rem'}}
            variant="outlined"
            onClick={()=>auth.login({ provider: 'facebook' })}
          >
            Facebook
          </Button>
        </div>
    </FormControl>
  </div>
}
