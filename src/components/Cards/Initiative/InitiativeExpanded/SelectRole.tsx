import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {  Typography, Card, CardActionArea, CardMedia, CardContent, CardActions,  Box, Button, Radio, RadioGroup, FormControlLabel, FormControl, TextField, InputAdornment, Checkbox } from '@material-ui/core'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { toJSON, useI18n, atoms } from 'misc'
import { useParams, useHistory } from 'react-router-dom'
import { useAddInitiativeMemberMutation, useInitiativeQuery, InitiativeFieldsFragment, useInitiativePostsQuery } from 'generated'

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

function MediaCard({ directory }:{ directory: string }) {
  // const objects = useFirestore().collection(directory)
  // const images = useStorage().ref().child(directory)
  const [ selectType, setSelectType ] = useRecoilState(atoms.selectType)
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

export default ({ initiativeID='' })=>{
  const user = useRecoilValue(atoms.user)
  const classes = useStyles()
  const history = useHistory()
  const i18n = useI18n()

  const { data, refetch } = useInitiativeQuery({variables:{initiative_id: initiativeID}})
  const { data:messages } = useInitiativePostsQuery({variables:{initiative_id: initiativeID}})

  const [ joining, setJoining ] = useRecoilState(atoms.joiningAtom)
  const [ feed, setFeed ] = useRecoilState(atoms.initiativeFeed)
  const [ selectType, setSelectType ] = useRecoilState(atoms.selectType)

  const [ selectedRole, setSelectedRole ] = useState({type: 'donate'});
  const [ periodic, setPeriodic ] = useState(false);
  const [ sum, setSum ] = useState(200);
  const [ job, setJob ] = useState<string>()
  const [ clicked, setClicked ] = useState(false)

  // const initiativeRef = useFirestore().collection("initiatives").doc( initiativeID )

  const [ addMember ] = useAddInitiativeMemberMutation({
    onCompleted(data){
      const { insert_initiative_members_one } = data
      setFeed(f=>{
        const index = f.map(v=>v.id).indexOf(insert_initiative_members_one?.initiative_id)
        const newArray = [...f]
        const affected = newArray[index] as InitiativeFieldsFragment
        const newMembers = [...affected.initiative_members, { user_id:insert_initiative_members_one?.user_id } ]
        affected.initiative_members = newMembers
        return newArray
      })
      setTimeout(()=>setClicked(false),10000)},
    update(cache, data){ console.log('joined')}
  });

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole({type: event.target.value});
  };

  return (<>
    <FormControl component="fieldset" style={{display: (!selectType) ? 'block': 'none', marginBottom: '1rem'}}>
      <Typography variant="subtitle2">Приєднатися до ініціативи</Typography>
      <RadioGroup aria-label="role" name="role" value={selectedRole.type} onChange={handleChange}>


        <Box id='donate' className={classes.selectGroup}>
          <FormControlLabel value="donate" control={<Radio />} label={i18n('joinDonateLabel')} />
          {selectedRole.type==="donate" && <><TextField 
            key='donate'
            id='donate'
            label={i18n('joinDonateSum')}
            InputProps={{
              endAdornment:<InputAdornment position="end">{i18n('UAH')}</InputAdornment>
            }}
            className={classes.text}
            variant="outlined"
            onChange={(e)=>{ setSum(Number(e.target.value)) }}
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
          {selectedRole.type==="volunteer" && <TextField 
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
          {selectedRole.type==="project" && <div style={{paddingLeft: '1rem', justifyContent: 'space-between'}}>
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
        disabled={
          selectedRole.type==="project"||
          (selectedRole.type==="donate" && sum < 50)||
          (selectedRole.type==="volunteer" && (!job || job.length < 5) ) }
        size="small" 
        variant="contained"  
        color="secondary"
        style={{marginTop: '1rem', float: 'right'}}
        onClick={()=>{  
          if(!clicked){  
            setClicked(true)
            addMember({variables:{initiative_id:initiativeID, user_id: user?.id, [selectedRole.type]:true }})
            refetch()
            const sendMessage = ()=>{
                const message = {
                  text:
                    selectedRole.type==='volunteer'? job: sum, 
                    ...(selectedRole.type==='donate' ? {
                      parameters: {
                        periodic,
                        currency: 'UAH'
                      }}:{}),
                  type: selectedRole.type, 
                  user: {
                    avatar: user?.avatar_url,
                    id: user?.id,
                    name: user?.display_name,
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
