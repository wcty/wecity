import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Button, Divider, InputAdornment, Avatar, Typography, Box, TextField, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { useI18n } from 'global/Hooks'
import { useDatabase, useUser, useDatabaseListData, useFirestore, useFirestoreDocData } from 'reactfire'
import { useParams, useHistory, Route } from 'react-router-dom'
import { Send, ThumbUpOutlined, ThumbUp, ThumbDownOutlined, ThumbDown, ModeCommentOutlined } from '@material-ui/icons'
import Post from './InitiativePost'
import {toJSON} from 'global/Misc'


const useStyles = makeStyles((theme)=>({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: '0.65rem',
    textAlign: 'center',
    marginBottom:"0.5rem",
    marginRight: "0.5rem"
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

export default ({initiative})=>{
  const { initiativeID } = useParams()
  // const chatDatabase = useDatabase().ref(`chats/${initiativeID}/`)
  const messages = useDatabase().ref(`chats/${initiativeID}/messages/`)
  const messagesData = useDatabaseListData(messages, {startWithValue:[]})
  const i18n = useI18n()
  const classes = useStyles()
  const [text, setText] = useState()
  const user = useUser()
  const initiativeRef = useFirestore().collection('initiatives').doc(initiativeID)

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
        },
        likes: {},
        dislikes: {}
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
      {reverseArray(messagesData).map((m,n)=><Post m={m} n={n} initiative={initiative}/>)}
    </div>

  </>

}