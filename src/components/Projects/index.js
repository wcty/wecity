import React, { useState, useEffect, Suspense } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Divider, List, Typography, ListItem, ListItemText, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import addImage from 'assets/images/addImage.png'
import { useRecoilState, useRecoilValue } from 'recoil';
import { initiativeBarAtom, barAtom, selectedAtom, creatingAtom } from 'global/Atoms'
import { useStorage, useFirestoreCollectionData, useFirestore, useUser } from 'reactfire';
import { People, LocationOn, ExpandLess, Star, StarBorder } from '@material-ui/icons'
import distance from '@turf/distance'
import ProjectFab from './ProjectFab'
import CreateProject from './CreateProject'

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

export default ()=> {
  const classes = useStyles();
  const theme = useTheme();
  const user = useUser()
  const bar = useRecoilValue(barAtom)
  const [initiativeBar, setInitiativeBar] = useRecoilState(initiativeBarAtom)
  const [selected, setSelected] = useRecoilState(selectedAtom)
  const [isCreating, setIsCreating] = useState(false)
  const [currentFilter, setCurrentFilter] = useState(null)
  const initiativesRef = currentFilter?
    useFirestore()
    .collection('projects')
    .where("category", "==", currentFilter):
    useFirestore()
    .collection('projects')

  const initiatives = useFirestoreCollectionData(initiativesRef)
  const categories = [
    "Всі категорії",
    "Озеленення",
    "Громадські простори",
    "Побутові",
    "Відпочинок",
    "Допомога",
    "Мистецтво",
    "Бізнес",
    "Інше"
  ]
  useEffect(()=>{
    console.log(initiatives)
  },[initiatives])
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
      <ProjectFab isCreating={isCreating} setIsCreating={setIsCreating} active />
      <CreateProject isCreating={isCreating} setIsCreating={setIsCreating} />
      {!isCreating && <div id="wrapper">
        <Typography variant="h6" style={{
          margin:'2rem',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>Бібліотека проектних рішень</Typography>

        <FormControl variant="outlined"
          style={{width: 'calc(100% - 2rem)', marginLeft:'1rem'}}>
          <InputLabel id='category' >Оберіть категорію</InputLabel>
          <Select
            labelId='category'
            id='categorySelect'
            value={currentFilter||"Всі категорії"}
            onChange={(e)=>{
              setCurrentFilter(e.target.value=="Всі категорії"?null:e.target.value)
            }}
            label='category'
          >
            {categories.map(opt=><MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
          </Select>
        </FormControl>
        <List>
          {initiatives[0] ? 
          (<>
          {initiatives.map((initiative, i)=>{
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
                      secondary={initiative.contractor}
                    />
                  </ListItem>
                  <Divider light style={{width:'100%', display:"block"}}/>
                </div>
              )
            }) 
          }</>):
          <Typography style={{
            margin: '2rem',
            textAlign: 'center'
          }}>
            В бібліотеці поки що немає проектів за даною категорією. 
            Будьте першими хто їх додасть.
          </Typography>
          }
        </List>
      </div>}
    </Paper>
  </>)
}