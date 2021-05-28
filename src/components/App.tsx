import { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import Map from './Map'
import { Route, useHistory, useLocation } from 'react-router-dom'
import Login from './Login'
import Intro from './Intro'
// import Cards from './Cards'
import Initiatives from './Initiatives'
import { InitiativeFab, MenuFab, LocateFab, LayersFab } from './Fabs'
import { useRecoilState } from 'recoil'
import { atoms, auth } from 'misc'
import { useLazyQuery, gql, useApolloClient } from '@apollo/client'
import Uploader from './Uploader'
import { useUserLazyQuery } from 'generated'
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
  const [user, setUser] = useRecoilState(atoms.user)
  const url = useLocation()
  const client = useApolloClient()
  const history = useHistory()
  const [satellite, setSatellite] = useRecoilState(atoms.satellite)

  const [getUser, {data:userData}] = useUserLazyQuery()
  
  useEffect(()=>{
    if(userData){
      console.log(userData)
      setUser(userData?.users_by_pk)
      history.push('/')
    }
  },[userData])

  useEffect(()=>{
    auth.onAuthStateChanged((loggedIn) => {
      if(loggedIn){
        const userId = auth.getClaim("x-hasura-user-id");
        console.log(userId)
        getUser({variables:{pk: userId}})
      }else if(loggedIn===false){
        setUser(null)
      }else{
        setUser(null)
        client.resetStore()
      }
    });
  },[])

  return (
    <Box className={classes.root}>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/">
        <Box className={classes.map}>
          <Map />
          <MenuFab />
          {url?.pathname?.includes('/intro') && <Intro />}
          {/* <Cards /> */}
          {user?
            <InitiativeFab active={false} />:
            <InitiativeFab active={true} />
          }
          <LocateFab />
          <LayersFab />

        </Box>
      </Route>
      <Route path='/initiatives' render={()=>user?<Initiatives />:null} />
    </Box>
  )
}
