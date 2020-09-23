import React, { useState, useEffect } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Paper, List, Typography, InputLabel, FormControl, Select, MenuItem, Grid } from '@material-ui/core';
import addImage from 'assets/images/addImage.png'
import { useRecoilValue } from 'recoil';
import { barAtom } from 'global/Atoms'
import { useFirestoreCollectionData, useFirestore, useUser } from 'reactfire';
import ResourceFab from './ResourceFab'
import CreateResource from './CreateResource'
import Resource from './Resource'

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
  },
  info:{
    padding: theme.spacing(2),
    //height:'100%',
    width: '100%'
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
  paper:{
    height: "100%",
    minHeight: "250px",
    width: "100%",
    overflowX: "hidden",
    transitionDuration: '0.3s'
  },
}));

export default ()=> {
  const classes = useStyles();
  const user = useUser()
  const bar = useRecoilValue(barAtom)
  const [isCreating, setIsCreating] = useState(false)
  const [currentFilter, setCurrentFilter] = useState(null)
  const [selectedresource, setSelectedresource] = useState(null)
  const resourcesRef = currentFilter?
    useFirestore()
    .collection('resources')
    .where("category", "==", currentFilter):
    useFirestore()
    .collection('resources')

  const resources = useFirestoreCollectionData(resourcesRef)
  const categories = [
    "Всі категорії",
    "Одяг",
    "Будівельні матеріали",
    "Прикраси",
    "Фурнітура",
    "Транспорт",
    "Інше"
  ]
  useEffect(()=>{
    console.log(resources)
  },[resources])
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
      {user&&<ResourceFab isCreating={isCreating} setIsCreating={setIsCreating} active />}
      <CreateResource isCreating={isCreating} setIsCreating={setIsCreating} />
      {selectedresource&& <Resource resource={selectedresource} setResource={setSelectedresource} />}
      {!isCreating && <div id="wrapper">
        <Typography variant="h6" style={{
          margin:'2rem',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>Наявні локальні ресурси</Typography>

        <FormControl variant="outlined"
          style={{width: 'calc(100% - 2rem)', marginLeft:'1rem'}}>
          <InputLabel id='category' >Оберіть категорію</InputLabel>
          <Select
            labelId='category'
            id='categorySelect'
            value={currentFilter||"Всі категорії"}
            onChange={(e)=>{
              setCurrentFilter(e.target.value==="Всі категорії"?null:e.target.value)
            }}
            label='category'
          >
            {categories.map(opt=><MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
          </Select>
        </FormControl>
        <List>
          {resources[0] ? 
          (<><Grid container spacing={1} style={{padding:'1rem'}}>
          {resources.map((resource, i)=>{
            console.log(resource)
              // (distance([location.longitude, location.latitude], Object.values(resource.coordinates)))<1 ? 
              return (
                <Grid key={i} item xs={6} s={4}>
                  <Paper className={classes.paper} style={{cursor:'pointer'}}>
                    <div id="wrapper">
                      <section 
                        className={classes.img} 
                        alt="Cover of the resource"
                        onClick={()=>{
                          if(selectedresource&&(selectedresource.id===resource.id)){
                            setSelectedresource(null)
                          }else{
                            setSelectedresource(resource)
                          }
                        }}
                        style={{
                          backgroundImage: `url(${resource.imageURL?resource.imageURL.m : addImage})`,
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                          borderTopLeftRadius: "5px",
                          borderTopRightRadius: "5px"         
                      }}>
                      </section>
                      <div className={classes.info}             
                        onClick={()=>{                          
                          if(selectedresource&&(selectedresource.id===resource.id)){
                            setSelectedresource(null)
                          }else{
                            setSelectedresource(resource)
                          }
                      }}>

                        <Typography variant="h6">
                          {resource.shortDescription? resource.shortDescription: "Description is not set"}
                        </Typography>
                        <Typography variant="body2">
                          {resource.location? resource.location: "Location is not set"}
                        </Typography>
                      </div>
                  </div>
                  </Paper>
                </Grid>
              )
          })}
          </Grid>
          </>):
          <Typography style={{
            margin: '2rem',
            textAlign: 'center'
          }}>
            В бібліотеці поки що немає ресурсів за даною категорією. 
            Будьте першими хто їх запропонує.
          </Typography>
          }
        </List>
      </div>}
    </Paper>
  </>)
}