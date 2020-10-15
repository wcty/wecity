import React, { useState, useEffect, useMemo, Suspense } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Collapse, Paper, Typography, IconButton, Box,Fab, List, ListItem, ListItemText, Button, TextField } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab';
import addImage from 'assets/images/addImage.png'
import { useRecoilState, useRecoilValue } from 'recoil'
import * as Atoms from 'global/Atoms'
import { useStorage, useFirestore, useUser, useFirestoreDocData } from 'reactfire'
import { People, LocationOn, ExpandLess, Close, ArrowBack, ArrowForward } from '@material-ui/icons'
import distance from '@turf/distance'
import translate from '@turf/transform-translate'
import ImageViewer from 'react-simple-image-viewer'
import { useI18n } from 'global/Hooks'
import { DeleteObject } from 'global/Misc'
import moment from 'moment'
import { useParams, Route, useHistory } from 'react-router-dom'
import {Helmet} from "react-helmet"
import { Share } from '@material-ui/icons'
import SelectRole from './SelectRole'
import InitiativeGroup from './InitiativeGroup'
import InitiativeTopic from './InitiativeTopic'
import { useQuery, useMutation } from '@apollo/client'
import { getInitiative, updateInitiativeMember, deleteInitiative } from 'global/Queries'


const useStyles = makeStyles((theme) => ({
  paper:{
    // height: "100%",
    minHeight: "250px",
    // width: "100%",
    overflowX: "hidden",
    // flexGrow: 1,
    zIndex: 10,
    position: 'fixed',
    transitionDuration: '0.3s',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
		},
  },
  img: {
    height: '160px',
    maxWidth: 400,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
    margin: "auto",
    verticalAlign: 'middle',
    objectFit: 'cover'
  },
  info: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  alert: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    zIndex: 999,
    maxWidth: 'calc( 100% - 4rem )'
  }
}));


export default ()=>{
  const classes = useStyles();
  const initiatives = useRecoilValue(Atoms.markersAtom)?.features
  let { initiativeID, postID } = useParams();
  const vars = {variables: {UID: initiativeID}}
  const { loading, error, data, refetch } = useQuery(getInitiative, vars);
  const initiative = useMemo(()=>data?.initiative, [data])
  if (loading) console.log('loading');
  if (error) console.log('error', error);
  const [location] = useRecoilState(Atoms.locationAtom)
  const [expanded, setExpanded] = useRecoilState(Atoms.expanded)
  const mapDimensions = useRecoilValue(Atoms.mapAtom)
  const bar = useRecoilValue(Atoms.barAtom)
  const user = useUser()
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [markers, setMarkers] = useRecoilState(Atoms.markersAtom)
  const [joining, setJoining] = useRecoilState(Atoms.joiningAtom)
  const images = useStorage().ref().child('initiatives')
  const i18n = useI18n()
  const [alert, setAlert] = useState(null)
  const [sp, setSP] = useRecoilState(Atoms.swipePosition)
  const history = useHistory()
  const [updateMember, memberData] = useMutation(updateInitiativeMember)
  const [deleteInitiativeMutation, removeData] = useMutation(deleteInitiative)
  const [deleted, setDeleted] = useState()

  return expanded && <> 
    { joining ? 
    
      <Box style={{padding: '2rem', paddingTop:0}}>
        <SelectRole refetch={refetch} />
      </Box>:

      <Box style={{padding: '2rem', paddingTop: 0, paddingBottom: 0 }}>
        <List key='elements' disablePadding>
          {initiative.properties.problem&& (<ListItem className={classes.item} disableGutters>
            <ListItemText
              primary={i18n('initiativeProblem')}
              secondary={initiative.properties.problem}
            />
          </ListItem>)}
          {initiative.properties.outcome&& (<ListItem className={classes.item} disableGutters>
            <ListItemText
              primary={i18n('initiativeExpectedResult')}
              secondary={initiative.properties.outcome}
            />
          </ListItem>)}
          {initiative.properties.context && (<ListItem className={classes.item} disableGutters>
            <ListItemText
              primary={i18n('initiativeCurrentState')}
              secondary={initiative.properties.context}
            />
          </ListItem>)}
          {initiative.properties.timestamp && (<ListItem className={classes.item} disableGutters>
          <ListItemText
            primary={i18n('initiativeDateAdded')}
            secondary={moment(initiative.properties.timestamp.toDate()).format('DD.MM.YYYY')}
          />
        </ListItem>)}
        </List>
        <Box style={{display: "flex", justifyContent: "space-between"}}>
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
                    setMarkers(prev=>({type: "FeatureCollection", features: prev.features.filter(m=>m.properties.uid!==initiative.properties.uid)}))
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
                  const newMarkers = markers.features.map(marker=>{
                    if(marker.properties.uid===initiative.properties.uid){
                      const nProps = {...marker.properties, ...{ members: marker.properties.members.filter(mem=>mem.uid!==user.uid)}}
                      const nMarker = { ...marker, properties: nProps}
                      return nMarker
                    }
                    return marker
                  })
                  setMarkers({type: "FeatureCollection", features: newMarkers })
                }}
              >
                {i18n('leave')}
              </Button>}
            </>)
          }
          </Box> 
        { !user.isAnonymous && initiative.properties.members.find(m=>m.uid===user.uid) && (<>
            <InitiativeGroup initiative={initiative}/>
        </>)}
      </Box>
    }
    { !user.isAnonymous && initiative.properties.members.find(m=>m.uid===user.uid) && (<>
      <Route path={'/initiative/:initiativeID/post/:postID'} >
        <InitiativeTopic initiative={initiative} />
      </Route>
    </>)}
  </> 
}