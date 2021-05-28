import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, List, ListItem, ListItemText, Button, Collapse, TextField, IconButton } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil'
import { getFeed, atoms, useI18n } from 'misc'
import { useParams, Route, useHistory } from 'react-router-dom'
import { Share, Close } from '@material-ui/icons'
import moment from 'moment'

import SelectRole from './SelectRole'
import InitiativeForMembers from './InitiativeForMembers'
import ImageViewer from 'react-simple-image-viewer'
import { InitiativeFieldsFragment, useInitiativeQuery, useDeleteInitiativeMutation, useDeleteInitiativeMemberMutation } from 'generated'

const useStyles = makeStyles(()=>({
  alert: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    zIndex: 999,
    maxWidth: 'calc( 100% - 4rem )'
  }
}))

export default ({ isViewerOpen, setIsViewerOpen, initiative }: { 
  isViewerOpen:boolean, 
  setIsViewerOpen:SetterOrUpdater<boolean>, 
  initiative: InitiativeFieldsFragment 
})=>{

  const classes = useStyles()
  const history = useHistory()
  const user = useRecoilValue(atoms.user)
  const i18n = useI18n()

  const { initiativeID, postID } = useParams<{ initiativeID:string, postID:string }>()
  const [ joining, setJoining ] = useRecoilState(atoms.joiningAtom)
  const [ alert, setAlert ] = useState<string>()
  const [ feed, setFeed ] = useRecoilState(atoms.initiativeFeed)
  const [ next, setNext ] = useRecoilState(atoms.nextAtom)
  const [ last, setLast ] = useRecoilState(atoms.lastAtom)
  const [ deleted, setDeleted ] = useState(false)

  const [ deleteMember ] = useDeleteInitiativeMemberMutation({
    onCompleted(data) {
      const { delete_initiative_members } = data
      setFeed(f=>{
        const index = f.map(v=>v.id).indexOf(delete_initiative_members?.returning?.[0].initiative_id)
        const newArray = [...f]
        const affected = newArray[index] as InitiativeFieldsFragment
        const newMembers = affected.initiative_members.filter(v=>v.user_id!==user?.id)
        affected.initiative_members = newMembers
        return newArray
      })
    }
  })
  
  const [ deleteInitiative ] = useDeleteInitiativeMutation({
    onCompleted(data) {
      const id = data.delete_initiatives_by_pk?.id

      if(last.find(l=>l.initiative.id===id)){
        setLast(l=>last.filter(f=>f.initiative.id!==id))
      }
      if(next.find(l=>l.id===id)){
        setNext(l=>next.filter(f=>f.id!==id)) //or setLast?
      }
      setFeed(getFeed({last, next}))
    }
  })

  return <> 
    { alert && (<Collapse in={Boolean(alert)}>
      <Alert severity="info" className={classes.alert} onClose={()=>setAlert(undefined)}>
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
      {typeof initiative.image==='string' && <ImageViewer
        src={ [initiative.image] }
        currentIndex={ 0 }
        onClose={ ()=>{ setIsViewerOpen(false) } }
        backgroundStyle={{zIndex:30, backgroundColor:'white', position: 'absolute', width:'100%', height: '100%'}}
      />}
    </>)}
    { joining ? 
      <Box style={{padding: '2rem', paddingTop:0}}><SelectRole {...{initiativeID}} /></Box>
      :
      <Box style={{padding: '2rem', paddingTop: 0, paddingBottom: 0 }}>
        <List key='elements' disablePadding>
          {initiative.description && (<ListItem disableGutters>
            <ListItemText
              primary={i18n('initiativeProblem')}
              secondary={initiative.description}
            />
          </ListItem>)}
          {/* {initiative.properties.outcome&& (<ListItem disableGutters>
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
          </ListItem>)} */}
          <ListItem disableGutters>
            <ListItemText
              primary={i18n('initiativeDateAdded')}
              secondary={moment(initiative.created_at).format('DD.MM.YYYY')}
            />
          </ListItem>
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
                      "link": `https://weee.city/initiative/${initiative.id}`,
                      "socialMetaTagInfo": {
                        "socialTitle": initiative.name,
                        "socialDescription": initiative.description,
                        "socialImageLink": initiative.image,
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
          { user && initiative && !(initiative.initiative_members.find(u=>u.user_id===user.id)) && <Button 
            size="small" 
            variant="contained"  
            color="secondary"
            onClick={async ()=>{    
              console.log('Приєднатися')
              setJoining(true)
          }}>
            {i18n('join')}
          </Button>}
          { user && initiative && initiative.initiative_members.find(u=>u.user_id===user.id) && (<>
              {initiative.initiative_members.length < 2 ?
              <Button 
                size="small" 
                variant="outlined"  
                color="secondary"
                onClick={()=>{
                  if(!deleted){
                    setDeleted(true)
                    deleteInitiative({variables: {initiative_id: initiative.id}})
                    setNext(prev=>prev.filter(m=>m.id!==initiative.id))
                    history.push('/')
                  }
                }}
              >
                {i18n('delete')}
              </Button>:
              <Button 
                size="small" 
                variant="outlined"  
                color="secondary"
                onClick={()=>{
                  deleteMember({variables: { initiative_id: initiative.id, user_id: user.id }})
                  // refetch()
                  setNext(prev=>prev.map(v=>{
                    if(v.id===initiative.id){
                      return {...v, ...{ initiative_members: v.initiative_members.filter(m=>m.user_id!==user.id) }}
                    }
                    return v
                  }))
                }}
              >
                {i18n('leave')}
              </Button>}
            </>)
          }
          </Box> 
        { user && initiative.initiative_members.find(m=>m.user_id===user.id) && (<>
            <InitiativeForMembers initiative={initiative}/>
        </>)}
      </Box>
    }
  </> 
}