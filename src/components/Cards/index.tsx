import { useSetRecoilState } from 'recoil'
import { Route, useHistory } from 'react-router-dom'
import { atoms } from 'misc'
import CreateInitiative from 'components/Cards/CreateInitiative'
import InitiativeFeed from './InitiativeFeed'

export default () => {
  const history = useHistory()
  
  return (<>
    <Route path='/initiative/:initiativeID' >
          <InitiativeFeed />
    </Route>
    <Route path="/create-initiative">
        <CreateInitiative cancel={()=>{ history.push('/') }} />
      </Route>
  </>)
}
