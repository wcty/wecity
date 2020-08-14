import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Divider, List, Typography, ListItem, ListItemText, Button } from '@material-ui/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import { initiativeBarAtom, barAtom, selectedAtom, creatingAtom } from 'global/Atoms'
import {  useFirestoreCollectionData, useFirestore, useUser } from 'reactfire';

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

const useAddress = (coords)=>{
  const [address, setAddress] = useState(null)
  useEffect(()=>{
    if(!address){
      const request = async ()=>{
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coords[0]},${coords[1]}.json?access_token=pk.eyJ1Ijoic3dpdGNoOSIsImEiOiJjamozeGV2bnkxajV2M3FvNnpod3h4ODlpIn0.CTt2IXV8II6finbTlxEddg`)
        const address = await response.json()
        setAddress(address.features[0].properties.address+', '+(address.features[1]?address.features[1].text:'')+', '+(address.features[3]?address.features[3].text:''))
      }
      request()
    }
  }, [address])
  return address
}

export default ()=> {
  const classes = useStyles();
  const user = useUser()
  const bar = useRecoilValue(barAtom)
  const [initiativeBar, setInitiativeBar] = useRecoilState(initiativeBarAtom)
  const [selected, setSelected] = useRecoilState(selectedAtom)
  const [isCreating, setIsCreating] = useRecoilState(creatingAtom)

  const initiativesRef = useFirestore()
    .collection('markers')
    .where('members', 'array-contains', user.uid)
  const initiatives = useFirestoreCollectionData(initiativesRef)

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
          Ініціативи до яких ви долучилися:
        </Typography>
          <div id="wrapper">
          <List>
            
          {initiatives[0] ? initiatives.map((initiative, i)=>{
                        // (distance([location.longitude, location.latitude], Object.values(initiative.coordinates)))<1 ? 
            return (
              <div key={i}>
              <ListItem button onClick={()=>{
                console.log(initiative)
                setSelected(initiative.id)
                setIsCreating(null)  
                setInitiativeBar(false)
              }}>
                <img src={initiative.imageURL.xs} key={i+'img'} width="120px" height="120px" style={{paddingLeft: '2rem', padding: '1rem', objectFit:'cover'}}/>
                <ListItemText key={i+'lit'}
                  primary={initiative.name}
                  secondary={useAddress(Object.values(initiative.coordinates)||'')
                  }
                />
              </ListItem>
              <Divider light style={{width:'100%', display:"block"}}/>
            </div>
            )
          }):
          <Typography style={{
            margin: '2rem',
            textAlign: 'center'
          }}>
            Ви поки що не долучилися до жодної ініціативи! 
            Перейдіть на мапу і долучіться до тої, що здається вам важливою,
            або запропонуйте власну
          </Typography>
          }
          </List>

          </div>
        </Paper>
      </>)
}