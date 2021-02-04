import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {  Typography, Card, CardActionArea, CardMedia, CardContent, CardActions,  Box, Button, Radio, RadioGroup, FormControlLabel, FormControl, TextField, InputAdornment, Checkbox } from '@material-ui/core'
import { useRecoilState, useSetRecoilState } from 'recoil'
import * as Atoms from 'global/Atoms'
import { useStorage, useFirestore, useUser, useDatabase } from 'reactfire'
import { DeleteObject, toJSON } from 'global/Misc'
import { useParams, Redirect, useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { addInitiativeMember } from 'global/Queries'
import { useI18n } from 'global/Hooks'

const useStyles = makeStyles((theme) => ({
  text:{
    width: "calc( 100% - 2rem )",
    margin: "1rem",
    marginBottom: 0,
    position: "relative"
  },
  selectButton: {
    width: 'calc( 50% - 0.75rem )',
    height: '4rem',
    color: 'black',
    marginRight: '0.5rem',
    marginTop: '0.5rem'
  },
  selectGroup:{
    marginTop: '1rem',
    transitionDuration: '0.3s',
  }
}));

function MediaCard({ directory }) {
  const objects = useFirestore().collection(directory)
  const images = useStorage().ref().child(directory)
  const [selectType, setSelectType] = useRecoilState(Atoms.selectType)
  const i18n = useI18n()

  return (
    <Card style={{marginTop: '1rem'}}>
      <CardActionArea>
        <CardMedia
          style={{height: 140}}
          image={selectType.object.imageURL.s}
          title={selectType.object.rendername}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {selectType.object.rendername}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {i18n('joinInitiativeGoal', selectType.object.volunteers, selectType.object.price) }
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" variant="outlined" color="primary" style={{color: "black"}} 
          onClick={()=>{
            if(selectType.type==='newProject'){
              DeleteObject(selectType.object, objects, images, 'projects', ()=>setSelectType(null))
            }else if(selectType.type==='selectProject'){
              setSelectType(null)
            }
          }}
        >
          {selectType.type==='newProject'?i18n('delete'):i18n('clear')}
        </Button>
      </CardActions>
    </Card>
  );
}

const roleLookup = {
  donate: "Donator",
  volunteer: "Volunteer",
  project: "Contractor",
  resource: "Provider"
}

export default ({refetch})=>{
  const [value, setValue] = useState({type:'donate'});
  const [periodic, setPeriodic] = useState(false);
  const [sum, setSum] = useState(200);
  const [job, setJob] = useState()
  // const [joining, setJoining] = useRecoilState(Atoms.joiningAtom)
  const [selectType, setSelectType] = useRecoilState(Atoms.selectType)
  const setJoining = useSetRecoilState(Atoms.joiningAtom)
  const { initiativeID } = useParams()
  const initiativeRef = useFirestore().collection("initiatives").doc( initiativeID )
  const user = useUser()
  const classes = useStyles()
  const history = useHistory()
  const [clicked, setClicked] = useState(false)
  const [feed, setFeed] = useRecoilState(Atoms.initiativeFeed)
  const i18n = useI18n()

  const [addMember] = useMutation(addInitiativeMember, {
    onCompleted(data){
      const { addInitiativeMember } = data
      setFeed(f=>{
        const index = f.map(v=>v._id).indexOf(addInitiativeMember._id)
        const newArray = [...f]
        newArray[index]=addInitiativeMember
        console.log(addInitiativeMember)
        return newArray
      })
      setTimeout(()=>setClicked(false),10000)},
    update(cache, data){ console.log('joined')}
  });

///
// const chatDatabase = useDatabase().ref(`chats/${initiativeID}/`)
const messages = useDatabase().ref(`chats/${initiativeID}/messages/`)

  const handleChange = (event) => {
    setValue({type: event.target.value});
  };
  useEffect(()=>console.log(selectType),[selectType])

  return (<>
    <FormControl component="fieldset" style={{display: (!selectType || selectType.object ) ? 'block': 'none', marginBottom: '1rem'}}>
      <Typography variant="subtitle2">Приєднатися до ініціативи</Typography>
      <RadioGroup aria-label="role" name="role" value={value.type} onChange={handleChange}>
        <Box id='donate' className={classes.selectGroup}>
          <FormControlLabel value="donate" control={<Radio />} label={i18n('joinDonateLabel')} />
          {value.type==="donate" && <><TextField 
            key='donate'
            id='donate'
            label={i18n('joinDonateSum')}
            InputProps={{
              endAdornment:<InputAdornment position="end">{i18n('UAH')}</InputAdornment>
            }}
            className={classes.text}
            variant="outlined"
            onChange={(e)=>{
              setSum(e.target.value)
              console.log(e.target.value)
            }}
            defaultValue={sum}
          />
          <FormControlLabel
            control={<Checkbox checked={periodic} onChange={(e)=>setPeriodic(!periodic)} name="periodic" />}
            label={i18n('joinMonthlyPayment')}
            style={{marginLeft: '0.5rem'}}
          /></>}
        </Box>
        <Box id='volunteer'className={classes.selectGroup} >
          <FormControlLabel value="volunteer" control={<Radio />} label={i18n('joinVolunteerLabel')} />
          {value.type==="volunteer" && <TextField 
            key='volunteer'
            id='volunteer'
            label={i18n('joinVolunteerJob')}
            className={classes.text}
            variant="outlined"
            onChange={(e)=>{
              setJob(e.target.value)
            }}
            multiline={true}
            rows={2}
            inputProps={{
              maxLength: 200
            }}
          />}
        </Box>
        <Box id='project' className={classes.selectGroup}>
          <FormControlLabel value="project" control={<Radio />} label={i18n('joinContractLabel')} />
          {value.type==="project" && <div style={{paddingLeft: '1rem', justifyContent: 'space-between'}}>
            {!selectType && <>
              <Button 
                disabled
                size="small" 
                variant="outlined"  
                className={classes.selectButton}
                onClick={async ()=>{    
                  console.log('selectProject')
                  setSelectType({type: 'selectProject'})
              }}>
                {i18n('joinChooseFromLibrary')}
              </Button>
              <Button 
                disabled
                size="small" 
                variant="outlined" 
                className={classes.selectButton}
                onClick={async ()=>{    
                  console.log('newProject')
                  setSelectType({type: 'newProject'})
              }}>
                {i18n('joinCreateNew')}
              </Button>
            </>}
            {selectType && selectType.object && <>
              <MediaCard directory={"projects"} />
            </>}
          </div>}
        </Box>
      </RadioGroup>
      <Button 
        size="small" 
        variant="outlined"  
        color="primary"
        style={{marginTop: '1rem', color: 'black'}}
        onClick={async ()=>{    
          setJoining(false)
      }}>
        {i18n('back')}
      </Button>
      <Button 
        disabled={value.type==="project"||value.type==="resource"||(value.type==="donate"&&sum<50)||(value.type==="volunteer" && (!job || job.length<5) )}
        size="small" 
        variant="contained"  
        color="secondary"
        style={{marginTop: '1rem', float: 'right'}}
        onClick={()=>{  
          if(!clicked){  
            setClicked(true)
            const vars = {
              variables: {
                UID: initiativeID,
                member: {uid:user.uid, roles: {[roleLookup[value.type]]:true} } 
              }
            }
            addMember(vars)
            refetch()
            const sendMessage = ()=>{
                const messageId = messages.push().getKey()          
                const message = {
                  text:value.type==='volunteer'?job:sum, 
                  ...(value.type==='donate' ? {parameters: {
                    periodic,
                    currency: 'UAH'
                  }}:{}),
                  type: value.type, 
                  timestamp: toJSON(new Date()),
                  id: messageId,
                  user: {
                    avatar: user.photoURL,
                    id: user.uid,
                    name: user.displayName,
                  },
                  likes: {},
                  dislikes: {}
                }
                messages.child(messageId).set(message).catch(function(error) {
                  console.error("Error saving message to Database:", error);
                });
                console.log(message)
            }
            sendMessage()
            history.push(`/initiative/${ initiativeID }`)
            setJoining(false)
          }
      }}>
        {i18n('join')}
      </Button>
    </FormControl>

  </>);
}
