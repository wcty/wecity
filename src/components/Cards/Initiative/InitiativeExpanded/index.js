import React, { useState, useEffect, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, List, ListItem, ListItemText, Button, Collapse, TextField, IconButton } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { useRecoilState, useRecoilValue } from 'recoil'
import * as Atoms from 'global/Atoms'
import { useStorage, useUser } from 'reactfire'
import { useI18n } from 'global/Hooks'
import { DeleteObject, getFeed } from 'global/Misc'
import moment from 'moment'
import { useParams, Route, useHistory } from 'react-router-dom'
import { Share, Close } from '@material-ui/icons'
import SelectRole from './SelectRole'
import InitiativeForMembers from './InitiativeForMembers/'
import { useQuery, useMutation } from '@apollo/client'
import { getInitiative, updateInitiativeMember, deleteInitiative } from 'global/Queries'
import ImageViewer from 'react-simple-image-viewer'

const useStyles = makeStyles((theme)=>({
  alert: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    zIndex: 999,
    maxWidth: 'calc( 100% - 4rem )'
  }
}))

export default ({ isViewerOpen, setIsViewerOpen, initiative })=>{
  const classes = useStyles()
  const { initiativeID, postID } = useParams();
  const vars = {variables: {UID: initiativeID}}
  const { data, refetch } = useQuery(getInitiative, vars);
  const user = useUser()
  const [next, setNext] = useRecoilState(Atoms.nextAtom)
  const [joining, setJoining] = useRecoilState(Atoms.joiningAtom)
  const images = useStorage().ref().child('initiatives')
  const i18n = useI18n()
  const [alert, setAlert] = useState( null )
  const history = useHistory()
  const [feed, setFeed] = useRecoilState(Atoms.initiativeFeed)
  const [last, setLast] = useRecoilState(Atoms.lastAtom)

  const [updateMember] = useMutation(updateInitiativeMember,{
    onCompleted(data) {
      const { updateInitiativeMember } = data
      console.log(data)
      setFeed(f=>{
        const index = f.map(v=>v._id).indexOf(updateInitiativeMember._id)
        const newArray = [...f]
        newArray[index]=updateInitiativeMember
        return newArray
      })
    }
  })
  const [deleteInitiativeMutation, removeData] = useMutation(deleteInitiative, {
    onCompleted(data) {
      const { deleteInitiative:{_id} } = data
      console.log(data)
      if(last.features.find(l=>l._id===_id)){
        setLast(l=>({type:'FeatureCollection', features: last.features.filter(f=>f._id!==_id)}))
      }
      if(next.features.find(l=>l._id===_id)){
        setLast(l=>({type:'FeatureCollection', features: next.features.filter(f=>f._id!==_id)}))
      }
      setFeed(getFeed({last, next}))
    }
  })
  const [deleted, setDeleted] = useState()

  return <> 
    { alert && (<Collapse in={Boolean(alert)}>
      <Alert severity="info" className={classes.alert} onClose={() => {setAlert(null)}}>
        <AlertTitle>Info</AlertTitle>
        {alert==='loading'?i18n('loading'):
        <>{i18n('alertLinkWasCopied')}<br/>
        <form>
          <TextField style={{paddingBottom:'0.5rem', paddingTop:'0.5rem', width:'100%'}} value={alert}/>
        </form>
        </>}
      </Alert>
    </Collapse>)}
    { isViewerOpen && (<>
      <IconButton 
        aria-label="return"
        style={{position:"absolute", zIndex: 1000, right:"1.5rem", top:"0.5rem"}}
        onClick={()=>{
          setIsViewerOpen(false)
        }}
      >
        <Close  color="primary" />
      </IconButton>
      <ImageViewer
        src={ [initiative.properties.imageURL.l] }
        currentIndex={ 0 }
        onClose={ ()=>{ setIsViewerOpen(false) } }
        zIndex={9}
        backgroundStyle={{zIndex:30, backgroundColor:'white', position: 'absolute', width:'100%', height: '100%'}}
      />
    </>)}
    { joining ? 
      <Box style={{padding: '2rem', paddingTop:0}}><SelectRole refetch={()=>{refetch()}} /></Box>
      :
      <Box style={{padding: '2rem', paddingTop: 0, paddingBottom: 0 }}>
        <List key='elements' disablePadding>
          {initiative.properties.problem&& (<ListItem disableGutters>
            <ListItemText
              primary={i18n('initiativeProblem')}
              secondary={initiative.properties.problem}
            />
          </ListItem>)}
          {initiative.properties.outcome&& (<ListItem disableGutters>
            <ListItemText
              primary={i18n('initiativeExpectedResult')}
              secondary={initiative.properties.outcome}
            />
          </ListItem>)}
          {initiative.properties.context && (<ListItem disableGutters>
            <ListItemText
              primary={i18n('initiativeCurrentState')}
              secondary={initiative.properties.context}
            />
          </ListItem>)}
          {initiative.properties.timestamp && (<ListItem disableGutters>
          <ListItemText
            primary={i18n('initiativeDateAdded')}
            secondary={moment(initiative.properties.timestamp.toDate()).format('DD.MM.YYYY')}
          />
        </ListItem>)}
        </List>
        <Box style={{display: "flex", justifyContent: "space-between", marginBottom: '1rem'}}>
          <Button onClick={()=>{
              if(alert!=="loading"){
                setAlert("loading")                
                fetch('https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyC0R35s-u9bZCZOpwg8jVIzYg77HeKgr0Y', {
                  method: 'post',
                  body: JSON.stringify({
                    "dynamicLinkInfo": {
                      "domainUriPrefix": "https://weee.city/in",
                      "link": `https://weee.city/initiative/${initiative.properties.uid}`,
                      "socialMetaTagInfo": {
                        "socialTitle": initiative.properties.name,
                        "socialDescription": initiative.properties.problem,
                        "socialImageLink": initiative.properties.imageURL.l,
                      }
                    },
                    "suffix": {
                      "option": "SHORT"
                    },
                  }),
                }).then(function(response) {
                  return response.json();
                }).then(function(text) {
                  console.log(text)
                  var dummy = document.createElement('input')
                  //text = `https://wecity.page.link/?link=https://weee.city/initiative/${initiative.properties.uid}&st=${initiative.properties.name}&sd=${initiative.properties.problem}&si=${encodeURI(initiative.properties.imageURL.l)}`;
                  document.body.appendChild(dummy);
                  dummy.value = text.shortLink;
                  dummy.select();
                  document.execCommand('copy');
                  document.body.removeChild(dummy);
                  setAlert(text.shortLink)                
                });
              }
              }}>
              <Share style={{paddingRight:"0.5rem"}} /> {i18n('initiativeShare')}
            </Button>
          { !user.isAnonymous && initiative && !initiative.properties.members.find(u=>u.uid===user.uid) && <Button 
            size="small" 
            variant="contained"  
            color="secondary"
            onClick={async ()=>{    
              console.log('Приєднатися')
              setJoining(true)
          }}>
            {i18n('join')}
          </Button>}
          { !user.isAnonymous && initiative && initiative.properties.members.find(u=>u.uid===user.uid) && (<>
              {initiative.properties.members.length<2 ?
              <Button 
                size="small" 
                variant="outlined"  
                color="secondary"
                onClick={()=>DeleteObject(initiative, null, images, 'initiatives', ()=>{
                  if(!deleted){
                    setDeleted(true)
                    deleteInitiativeMutation({variables: { UID:initiative.properties.uid }})
                    setNext(prev=>({type: "FeatureCollection", features: prev.features.filter(m=>m.properties.uid!==initiative.properties.uid)}))
                    history.push('/')
                  }
                })}
              >
                {i18n('delete')}
              </Button>:
              <Button 
                size="small" 
                variant="outlined"  
                color="secondary"
                onClick={()=>{
                  updateMember({variables: { UID:initiative.properties.uid, member:{uid: user.uid} }})
                  refetch()
                  const newMarkers = next.features.map(marker=>{
                    if(marker.properties.uid===initiative.properties.uid){
                      const nProps = {...marker.properties, ...{ members: marker.properties.members.filter(mem=>mem.uid!==user.uid)}}
                      const nMarker = { ...marker, properties: nProps}
                      return nMarker
                    }
                    return marker
                  })
                  setNext({type: "FeatureCollection", features: newMarkers })
                  //console.log(updatedData)

                }}
              >
                {i18n('leave')}
              </Button>}
            </>)
          }
          </Box> 
        { !user.isAnonymous && initiative.properties.members.find(m=>m.uid===user.uid) && (<>
            <InitiativeForMembers initiative={initiative}/>
        </>)}
      </Box>
    }
  </> 
}