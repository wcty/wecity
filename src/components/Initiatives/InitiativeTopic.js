import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Button, Divider, InputAdornment, Avatar, Typography, Box, TextField, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { useI18n } from 'global/Hooks'
import { useDatabase, useUser, useDatabaseListData, useFirestore, useFirestoreDocData, useDatabaseObjectData } from 'reactfire'
import { useParams, useHistory, Route } from 'react-router-dom'
import { ArrowBack, Send, ThumbUpOutlined, ThumbUp, ThumbDownOutlined, ThumbDown, ModeCommentOutlined, RefreshRounded } from '@material-ui/icons'
import Post from './InitiativePost'
import * as Atoms from 'global/Atoms'
import { useRecoilState } from 'recoil'
import {toJSON} from 'global/Misc'

const useStyles = makeStyles((theme)=>({
  post:{
    zIndex: 11,
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    overflowY: 'auto'
  },
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


const sendComment = (text, commentsRef, user, setText, type, commentsCount)=>{
  if(text){
    setText('')
    const commentId = commentsRef.push().getKey()
    //console.log(text, user, messageId)

    const comment = {
      text, 
      type: type, 
      timestamp: toJSON(new Date()),
      id: commentId,
      user: {
        avatar: user.photoURL,
        id: user.uid,
        name: user.displayName,
      },
      likes: {},
      dislikes: {},
    }
    commentsRef.child(commentId).set(comment).catch(function(error) {
        console.error("Error saving comment to Database:", error);
      });
    commentsCount.child(commentId).set(true)

  }
}


const Comment = ({initiative, m, n, key})=>{

  n = n || 0
  const classes = useStyles()
  const [text, setText] = useState()
  const { initiativeID, postID } = useParams()
  const user = useUser()
  const i18n = useI18n()
  const history = useHistory()
  const commentsCount = useDatabase().ref(`chats/${initiativeID}/messages/${postID}/commentsCount`)
  const [reply, setReply]= useState(null)
  const commentsRef = useDatabase().ref(`chats/${initiativeID}/comments/${postID}`)
  // const repliesData = useDatabaseListData(commentsRef.child('replies'), {startWithValue:[]})


  const AddReply = ({reply, m})=>{
    const [state, setState] = useState()
    const [replyText, setReplyText] = useState()
    useEffect(()=>{
      if(m.reply){
        setReply(m.id)
      }
    },[m])
    useEffect(()=>{if(reply&&reply==m.id){ setState(true) }},[reply])

    return <Box key={n} style={{display: 'block', width:"100%", marginTop: '0.5rem', padding: '0.5rem', position: 'relative', boxSizing: 'border-box'}}>
        <TextField 
          variant="outlined"
          className={classes.textField}
          style={{width:"100%", borderRadius: "100px"}}
          label={i18n('chatWriteReply')}
          onChange={(e)=>{
            setReplyText(e.target.value)
          }}
          onKeyDown={(e)=>{
            if(e.keyCode === 13){
              sendComment(replyText, commentsRef.child(`${m.id}/replies`), user, setReplyText, 'reply', commentsCount)
            }
          }}
          value={replyText}
          InputProps={{
            endAdornment:<InputAdornment position="end">
              <IconButton onClick={()=>{
                sendComment(replyText, commentsRef.child(`${m.id}/replies`), user, setReplyText, 'reply', commentsCount)
              }}>
                <Send fontSize="small"/>
              </IconButton>
            </InputAdornment>
          }}
        />
      </Box>
  }

  const CommentBody = ({m, refDir})=>{
    const ref = useDatabase().ref(refDir)
    return <>
      <div style={{verticalAlign:"middle", marginTop:m.showAvatar?"1.5rem":"0.2rem", display:"flex", justifyContent: "start" }}>
      <ListItem disableGutters style={{padding:0}}>
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
      <Button onClick={()=>{
        if(m.likes&&m.likes[user.id]){
          var updates = {};
          updates['/likes/' + user.id] = null;
          ref.child(m.id).update(updates)
        }else{
          var updates = {};
          if(m.dislikes&&m.dislikes[user.id]){
            updates['/dislikes/' + user.id] = null;
          }
          updates['/likes/' + user.id] = true;
          ref.child(m.id).update(updates)
        }
      }}>
        {(m.likes&&m.likes[user.id])?<ThumbUp />:<ThumbUpOutlined />}
        <span style={{marginLeft:'0.5rem'}}>{m.likes?Object.keys(m.likes).length:0}</span>
      </Button>
      <Button onClick={()=>{
        if(m.dislikes&&m.dislikes[user.id]){
          var updates = {};
          updates['/dislikes/' + user.id] = null;
          ref.child(m.id).update(updates)
        }else{
          var updates = {};
          if(m.likes&&m.likes[user.id]){
            updates['/likes/' + user.id] = null; 
          }
          updates['/dislikes/' + user.id] = true;
          ref.child(m.id).update(updates)
        }
      }}>
        {(m.dislikes&&m.dislikes[user.id])?<ThumbDown />:<ThumbDownOutlined />}
          <span style={{marginLeft:'0.5rem'}}>{m.dislikes?Object.keys(m.dislikes).length:0}</span>
      </Button>
      <Button onClick={()=>{setReply(m.id)}}>
        <span style={{marginLeft:'0.5rem'}}>Reply</span>
      </Button>
    </>
  }

  // useEffect(()=>{
  //   setReply(m.id)
  // },[m.replies, m.id, setReply])

  return (
    <Box key={n} style={{display: 'flex'}}>
      <Avatar style={{marginLeft: '1rem', marginTop: '1.75rem' }} alt={m.user.name} src={m.user.avatar}> {m.user.name.split(' ').map(l=>l.slice(0,1).toUpperCase()).join('')} </Avatar>
      <Box style={{
        paddingTop:"0.2rem",
        paddingLeft: "1rem",
        marginBottom:'0.2rem',
      }} >
        <CommentBody m={m} n={n} refDir={`chats/${initiativeID}/comments/${postID}`}/>
        {m.replies && Object.values(m.replies).map((r,i)=>(<Box key={i} style={{display: 'flex'}}>
            <Avatar style={{marginLeft: '1rem', marginTop: '1.75rem' }} alt={r.user.name} src={r.user.avatar} >{r.user.name.split(' ').map(l=>l.slice(0,1).toUpperCase()).join('')}</Avatar>
            <Box style={{
              paddingTop:"0.2rem",
              paddingLeft: "1rem",
              marginBottom:'0.2rem',
            }} >
              <CommentBody m={r} n={i} refDir={`chats/${initiativeID}/comments/${postID}/${m.id}/replies`}/>
            </Box>
          </Box>
        ))}
        {(m.replies || reply==m.id)&&<AddReply m={m} n={n}/>}

      </Box>
    </Box>
  )
}


export default ()=>{
  const { initiativeID, postID } = useParams()
  const classes = useStyles()
  const [bar] = useRecoilState(Atoms.barAtom)
  const [showBar, setShowBar] = useRecoilState(Atoms.showBarAtom)
  const history = useHistory()
  const messageRef = useDatabase().ref(`chats/${initiativeID}/messages/${postID}`)
  const messageData = useDatabaseObjectData(messageRef, {startWithValue:null})
  const commentsRef = useDatabase().ref(`chats/${initiativeID}/comments/${postID}`)
  const commentsData = useDatabaseListData(commentsRef, {startWithValue:[]})
  const initiativeRef = useFirestore().collection('initiatives').doc(initiativeID)
  const initiative = useFirestoreDocData(initiativeRef)
  const i18n = useI18n()
  const [text, setText] = useState()
  const user = useUser()
  const [expanded, setExpanded] = useRecoilState(Atoms.expanded)
  const commentsCount = useDatabase().ref(`chats/${initiativeID}/messages/${postID}/commentsCount`)

  useEffect(()=>{
    setExpanded(true)
    setShowBar(false)
    console.log('initiative post')
    return ()=>{
      setShowBar(true)
      setExpanded(true)
    }
  },[])

  return postID && (
  <Box className={classes.post} >
    <AppBar elevation={1} color="default" position="static" className={classes.appbar} >
      <Toolbar style={{textAlign:"center"}}>
        <IconButton onClick={()=>{
          history.push(`/initiative/${initiativeID}`)
        }} style={{float: "left"}}>
          <ArrowBack />
        </IconButton>
        
        <Typography variant="h6">{initiative.name}</Typography>
      </Toolbar>
    </AppBar>
    <Post initiative={initiative} m={messageData}/>
    <div>
    {commentsData.map((m,n)=><Comment m={m} n={n} key={n} initiative={initiative} />)}
    </div>
    <Box style={{width:"100%", marginTop: '0.5rem', padding: '0.5rem', position: 'relative', boxSizing: 'border-box'}}>
      <TextField 
        variant="outlined"
        className={classes.textField}
        style={{width:"100%", borderRadius: "100px"}}
        label={i18n('chatWriteYourComment')}
        onChange={(e)=>{
          setText(e.target.value)
        }}
        onKeyDown={(e)=>{
          if(e.keyCode === 13){
            sendComment(text, commentsRef, user, setText, 'comment', commentsCount)
          }
        }}
        value={text}
        InputProps={{
          endAdornment:<InputAdornment position="end">
            <IconButton onClick={()=>{sendComment(text, commentsRef, user, setText, 'comment', commentsCount)}} >
              <Send fontSize="small"/>
            </IconButton>
          </InputAdornment>
        }}
      />
    </Box>
  </Box>)
}