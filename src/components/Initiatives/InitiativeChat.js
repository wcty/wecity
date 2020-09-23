import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Button, Divider, InputAdornment, Avatar, Typography, Box, TextField, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { useI18n } from 'global/Hooks'
import { useDatabase, useUser, useDatabaseListData, useFirestore, useFirestoreDocData } from 'reactfire'
import { useParams } from 'react-router-dom'
import { Send, ThumbUpOutlined, ThumbDownOutlined, ModeCommentOutlined } from '@material-ui/icons'

function toJSON (date) {
  var timezoneOffsetInHours = -(date.getTimezoneOffset() / 60); //UTC minus local time
  var sign = timezoneOffsetInHours >= 0 ? '+' : '-';
  var leadingZero = (Math.abs(timezoneOffsetInHours) < 10) ? '0' : '';

  //It's a bit unfortunate that we need to construct a new Date instance 
  //(we don't want _date_ Date instance to be modified)
  var correctedDate = new Date(date.getFullYear(), date.getMonth(), 
      date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 
      date.getMilliseconds());
  correctedDate.setHours(date.getHours() + timezoneOffsetInHours);
  var iso = correctedDate.toISOString().replace('Z', '');

  return iso + sign + leadingZero + Math.abs(timezoneOffsetInHours).toString() + ':00';
}

const useStyles = makeStyles((theme)=>({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: '0.65rem',
    textAlign: 'center',
    marginBottom:"0.5rem",
    marginRight: "0.5rem"
  },
  blob: {
    backgroundColor:"white", 
    borderColor:"rgba(0,0,0,0.1)", 
    borderWidth:"1px",
    borderStyle: "solid",
    padding:"1rem",
    marginBottom:'0.2rem',
  },
  textField: {
    [`& fieldset`]: {
      borderRadius: "3rem",
      height: "3rem",
      backgroundColor: "white",
      zIndex: 1
    },
    [`& label`]: {
      transform: 'translate(14px, 1rem) scale(1);',
      zIndex: 2
    },
    [`& div`]: {
      marginBottom: '0.5rem',
      [`& button`]: {
        zIndex: 3
      },
    },
    [`& input`]: {
      paddingTop: '0.75rem',
      zIndex: 2
    },
    height: "3rem",
  }
}))

const DateComponent = (props)=>{
  return <Typography style={{textAlign:"center", margin: "0.5rem", marginTop:"1rem"}} variant="body2">{props.children}</Typography>
}

const Type = (props)=>{
  return <Typography style={{textAlign:"center", margin: "0.5rem", marginBottom: "1rem"}} variant="body2">{props.children}</Typography>
}

export default ()=>{
  const { initiativeID } = useParams()
  // const chatDatabase = useDatabase().ref(`chats/${initiativeID}/`)
  const messages = useDatabase().ref(`chats/${initiativeID}/messages/`)
  const messagesData = useDatabaseListData(messages, {startWithValue:[]})
  const i18n = useI18n()
  const classes = useStyles()
  const [text, setText] = useState()
  const user = useUser()
  const initiativeRef = useFirestore().collection('initiatives').doc(initiativeID)
  const initiative = useFirestoreDocData(initiativeRef)

  const sendMessage = ()=>{
    if(text){
      setText('')
      const messageId = messages.push().getKey()
      console.log(text, user, messageId)

      const message = {
        text, 
        type: "message", 
        timestamp: toJSON(new Date()),
        id: messageId,
        user: {
          avatar: user.photoURL,
          id: user.uid,
          name: user.displayName,
        }
      }
      messages.child(messageId).set(message).catch(function(error) {
          console.error("Error saving message to Database:", error);
        });
    }
  }
  function reverseArray(arr) {
    var newArray = [];
    for (var i = arr.length - 1; i >= 0; i--) {
      newArray.push(arr[i]);
    }
    return newArray;
  }

  return <>
    
    <Box style={{width:"100%", marginTop: '0.5rem', padding: '0.5rem', position: 'relative', boxSizing: 'border-box'}}>
      <TextField 
        variant="outlined"
        className={classes.textField}
        style={{width:"100%", borderRadius: "100px"}}
        label={i18n('chatWriteYourMessage')}
        onChange={(e)=>{
          setText(e.target.value)
        }}
        onKeyDown={(e)=>{
          if(e.keyCode === 13){
            sendMessage()
          }
        }}
        value={text}
        InputProps={{
          endAdornment:<InputAdornment position="end">
            <IconButton onClick={sendMessage}>
              <Send fontSize="small"/>
            </IconButton>
          </InputAdornment>
        }}
      />
    </Box>
    <div>
      {reverseArray(messagesData).map((m,n)=><Box key={n}>
          {(m.type!=='message'||n===0) && <>
            <DateComponent>{m.timestamp.replace("T"," at ").split(":").slice(0,2).join(":")}</DateComponent>
            <Type>{i18n('chatCreatedInitiative', m.user.name)}</Type>
          </>}

          <Box className={classes.blob} >
            <div style={{verticalAlign:"middle", marginTop:m.showAvatar?"1.5rem":"0.2rem", display:"flex", justifyContent: "start" }}>
              {/* <Avatar alt={m.user.name} src={m.user.avatar} >{m.user.name.split(' ').map(l=>l.slice(0,1).toUpperCase()).join('')}</Avatar>
              <Typography variant="subtitle2" style={{marginRight:"0.5rem"}}>{m.user.name}</Typography>
              <Typography variant="body2" style={{marginRight:"0.5rem"}}>{initiative.members[m.user.id].role}</Typography> */}
            <ListItem disableGutters style={{padding:0}}>
              <ListItemAvatar>
                <Avatar alt={m.user.name} src={m.user.avatar} >{m.user.name.split(' ').map(l=>l.slice(0,1).toUpperCase()).join('')}</Avatar>
              </ListItemAvatar>
              <ListItemText 
                primary={m.user.name}
                secondary={
                  initiative.members[m.user.id].role + ' | ' + 
                  m.timestamp.replace("T"," at ").split(":").slice(0,2).join(":")
                }
              />
            </ListItem>
            </div>
            
            <Typography variant="body1">
              {m.text}
            </Typography> 
            <Divider style={{margin:"0.5rem 0"}}/>
            <Button>
              <ThumbUpOutlined />
              <span style={{marginLeft:'0.5rem'}}>0</span>
            </Button>
            <Button>
              <ThumbDownOutlined />
              <span style={{marginLeft:'0.5rem'}}>0</span>
            </Button>
            <Button>
              <ModeCommentOutlined/>
              <span style={{marginLeft:'0.5rem'}}>{0} Comments</span>
            </Button>
          </Box>
        </Box>)}
      </div>
  </>

}