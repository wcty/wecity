import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Divider, List, Typography, ListItem, ListItemText } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import { useHistory } from 'react-router-dom'
import { mapboxConfig, atoms, useI18n } from 'misc'
import { useMyInitiativesQuery, Initiatives } from 'generated'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 10,
    position: 'fixed',
    height: "100%",
    width: "100%",
    // overflowX: "hidden",
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
		},
  }
}));

const InitiativeRow = ({initiative}:{initiative:Pick<Initiatives, "id" | "name" | "description" | "image" | "geom">})=>{
  const history = useHistory()
  const [addressString, setAddress] = useState<string|undefined>()
  const coords = initiative.geom.coordinates

  useEffect(()=>{
    const controller = new AbortController();
    const { signal } = controller;
    if(!addressString&&coords){
      const request = async ()=>{
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords[0]},${coords[1]}.json`+
          `?access_token=${mapboxConfig.accessToken}`, { signal })
        if(signal.aborted) return;
        const address:any = await response.json()
        if(signal.aborted) return;
        setAddress(
          address.features[0]?.properties.address?
            (address.features[0]?.properties.address+', '):
            ''+(address.features[1]?address.features[1].text:'')+
            ', '+(address.features[3]?address.features[3].text:'')
          )
        return;
      }
      request()
    }
    return ()=>{
      controller.abort()
    }
  }, [addressString, coords])

  return <div>
    <ListItem button onClick={()=>{
      console.log(initiative); history.push(`/initiative/${initiative.id}`)
    }}>
      {initiative.image && <img src={initiative.image+'?w=200&q=90'} alt="Cover" width="120px" height="120px" style={{paddingLeft: '2rem', padding: '1rem', objectFit:'cover'}}/>}
      <ListItemText
        primary={ initiative.name }
        secondary={ addressString }
      />
    </ListItem>
    <Divider light style={{width:'100%', display:"block"}}/>
  </div>
}

export default ()=> {
  const classes = useStyles();
  const user = useRecoilValue(atoms.user);
  const i18n = useI18n()
  const { data } = useMyInitiativesQuery({variables:{user:user?.id}});
  const initiatives = data?.initiatives

  return (<>
    <Paper elevation={1} className={classes.root} 
      style={{
        height: `100%`, 
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
        {initiatives? initiatives.map((initiative, i)=>
          <InitiativeRow key={i} initiative={initiative} />):
          <Typography style={{
            margin: '2rem',
            textAlign: 'center'
          }}>
            {i18n('initiativeLibraryEmpty')}
          </Typography>
        }
        </List>
      </div>
    </Paper>
  </>)
}