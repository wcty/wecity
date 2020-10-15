import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Divider, List, Typography, ListItem, ListItemText } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import { barAtom, mapAtom, viewAtom } from 'global/Atoms'
import {  useFirestoreCollectionData, useFirestore, useUser } from 'reactfire';
import { useI18n } from 'global/Hooks'
import { useHistory } from 'react-router-dom'
import { mapboxConfig } from 'config/index'
import { useQuery, gql } from '@apollo/client';
import { nearbyInitiatives } from 'global/Queries'
import InitiativeFab from 'components/Map/Interfaces/InitiativeFab'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 999,
    position: 'fixed',
    height: "100%",
    width: "100%",
    overflowX: "hidden",
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
		},
  }
}));

const InitiativeRow = ({initiative})=>{
  const history = useHistory()
  const [addressString, setAddress] = useState()
  const coords = initiative.geometry.coordinates

  useEffect(()=>{
    if(!addressString&&coords){
      const request = async ()=>{
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coords[0]},${coords[1]}.json?access_token=${mapboxConfig.accessToken}`)
        const address = await response.json()
        setAddress(address.features[0]?.properties.address?(address.features[0]?.properties.address+', '):''+(address.features[1]?address.features[1].text:'')+', '+(address.features[3]?address.features[3].text:''))
      }
      request()
    }
  }, [addressString, coords])

  return <div>
    <ListItem button onClick={()=>{
      console.log(initiative)
      history.push(`/initiative/${initiative.properties.uid}`)
    }}>
      <img src={initiative.properties.imageURL.xs} alt="Cover" width="120px" height="120px" style={{paddingLeft: '2rem', padding: '1rem', objectFit:'cover'}}/>
      <ListItemText
        primary={ initiative.properties.name }
        secondary={ addressString }
      />
    </ListItem>
    <Divider light style={{width:'100%', display:"block"}}/>
  </div>
}

export default ({ mapRef })=> {
  const classes = useStyles();
  const user = useUser()
  const bar = useRecoilValue(barAtom)
  const mapDimensions = useRecoilValue(mapAtom)
  const i18n = useI18n()
  const history = useHistory()
  const view = useRecoilValue(viewAtom)
  const vars = useRef({variables: {nearInitiativesInput:{ point: Object.values(view), member: user.uid }}})
  const { loading, error, data, refetch } = useQuery(nearbyInitiatives, vars.current);
  const initiatives = data?.nearInitiatives
  const getMarker = ()=>{
    const w = mapDimensions.width/2
    const h = (mapDimensions.height - 350)/2
    return mapRef.current.getMap().unproject ([w,h])
  }

  return (<>
    <Paper elevation={1} className={classes.root} 
      style={{
        height: `calc(100% - ${bar.height}px)`, 
        width:'100%',
        bottom: '0',
        right: '0',
        borderRadius: '0',
        overflowY: 'scroll'
      }}
    >         
    <Typography variant="h6" style={{
      margin:'2rem',
      marginBottom: '1rem',
      textAlign: 'center'
    }}>
      {i18n('intiativeLibraryTitle')}
    </Typography>
      <div id="wrapper">
        <List>
        {initiatives? initiatives.map((initiative, i)=><InitiativeRow key={i} initiative={initiative} />):
        <Typography style={{
          margin: '2rem',
          textAlign: 'center'
        }}>
          {i18n('initiativeLibraryEmpty')}
        </Typography>
        }
        </List>
        <InitiativeFab active={true} getMarker={getMarker}/>
      </div>
    </Paper>
  </>)
}