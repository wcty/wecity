import React, { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import { Divider, IconButton, InputAdornment, Avatar, Tabs, Tab, Typography, Box, TextField} from '@material-ui/core';
import { useI18n } from 'global/Hooks'
import { useDatabase, useUser, useDatabaseListData } from 'reactfire'
import { useParams } from 'react-router-dom'
import InitiativeChat from './InitiativeChat'
import { Face, PermMedia, Send } from '@material-ui/icons'
import ScrollToBottom, { useScrollToBottom, useScrollToTop, useObserveScrollPosition } from 'react-scroll-to-bottom';

Date.prototype.toJSON = function () {
  var timezoneOffsetInHours = -(this.getTimezoneOffset() / 60); //UTC minus local time
  var sign = timezoneOffsetInHours >= 0 ? '+' : '-';
  var leadingZero = (Math.abs(timezoneOffsetInHours) < 10) ? '0' : '';

  //It's a bit unfortunate that we need to construct a new Date instance 
  //(we don't want _this_ Date instance to be modified)
  var correctedDate = new Date(this.getFullYear(), this.getMonth(), 
      this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), 
      this.getMilliseconds());
  correctedDate.setHours(this.getHours() + timezoneOffsetInHours);
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
    borderRadius:"1rem", 
    backgroundColor:"white", 
    borderColor:"rgba(0,0,0,0.1)", 
    borderWidth:"1px",
    borderStyle: "solid",
    padding:"1rem",
    maxWidth:'100%',
    marginBottom:'0.2rem',
    width: 'fit-content'
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
  const chatDatabase = useDatabase().ref(`chats/${initiativeID}/`)
  const messages = useDatabase().ref(`chats/${initiativeID}/messages/`)
  const messagesData = useDatabaseListData(messages, {startWithValue:[]})
  const i18n = useI18n()
  const classes = useStyles()
  const [text, setText] = useState()
  const user = useUser()
  const scrollToBottom = useScrollToBottom()
  const scrollToTop = useScrollToTop({behavior:"smooth"})

  const sendMessage = ()=>{
    if(text){
      setText('')
      const messageId = messages.push().getKey()
      console.log(text, user, messageId)

      const message = {
        text, 
        type: "message", 
        timestamp: (new Date()).toJSON(),
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
    }else{
      scrollToTop({behavior:"smooth"})
      console.log('here')
    }
  }
  const orderAvatars = (array)=>{
    let newArray = array
    newArray.forEach((e,i)=>{
      newArray[i].showAvatar = i==0 || newArray[i-1].user.id!==newArray[i].user.id 
    })
    return newArray
  }

  return <>
      <div>{orderAvatars(messagesData).map((m,n)=><Box key={n}>
        
        {(m.type!=='message'||n==0) && <>
          <DateComponent>{m.timestamp.replace("T"," at ").split(":").slice(0,2).join(":")}</DateComponent>
          <Type>{i18n('chatCreatedInitiative', m.user.name)}</Type>
        </>}
        {m.showAvatar && <div style={{verticalAlign:"middle", marginTop:m.showAvatar?"1.5rem":"0.2rem", display:"flex", justifyContent: "start", flexDirection: m.user.id==user.uid?"row-reverse":"row"}}>

            <Avatar className={classes.small} alt={m.user.name} src={m.user.avatar} >{m.user.name.split(' ').map(l=>l.slice(0,1).toUpperCase()).join('')}</Avatar>
            <Typography variant="body2" style={{marginRight:"0.5rem"}}>{m.user.name}</Typography>

        </div>}
        <Box className={classes.blob} style={{marginLeft:m.user.id==user.uid?'auto':'unset'}}>
            <Typography variant="body1">
              {m.text}
            </Typography> 
        </Box>
      </Box>)}</div>
    <Box style={{position:"fixed", height:"2.5rem", bottom:0, width:"calc( 100% - 4rem )", backgroundColor: "white"}}>
      <TextField 
        variant="outlined"
        style={{marginTop:"1rem", width:"100%", borderRadius: "10px"}}
        label={i18n('chatWriteYourMessage')}
        onChange={(e)=>{
          setText(e.target.value)
        }}
        onKeyDown={(e)=>{
          if(e.keyCode == 13){
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
  </>

}