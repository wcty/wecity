import React from 'react'
import { useSetRecoilState } from 'recoil'
import { Route, useHistory } from 'react-router-dom'
import * as atoms from 'misc/atoms'
import CreateInitiative from 'components/Cards/CreateInitiative'
import InitiativeFeed from './InitiativeFeed'
import { Box } from '@material-ui/core'

export default ({ mapRef, loaded, getMarker }) => {
  const setIsCreating = useSetRecoilState(atoms.creatingAtom)
  const history = useHistory()
  
  return (<>
    <Route path='/initiative/:initiativeID' >
          <InitiativeFeed mapRef={mapRef} loaded={loaded} getMarker={getMarker} />
      </Route>
    <Route path="/create-initiative">
        {loaded && 
        <CreateInitiative 
          getMarker={getMarker} 
          loaded={loaded} 
          mapRef={mapRef} 
          cancel={()=>{setIsCreating(false); history.push('/') }} 
        />}
      </Route>
  </>)
}
