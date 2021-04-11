import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Menu, MenuItem, ListItemSecondaryAction, Toolbar, IconButton, Button, Divider, InputAdornment, Avatar, Typography, Box, TextField, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { useI18n } from 'misc/hooks'
import { useDatabase, useUser, useDatabaseListData, useFirestore, useFirestoreDocData, useDatabaseObjectData } from 'reactfire'
import { useParams, useHistory, Route } from 'react-router-dom'
import { ArrowBack, Send, MoreVert, ThumbUpOutlined, ThumbUp, ThumbDownOutlined, ThumbDown, ModeCommentOutlined, RefreshRounded } from '@material-ui/icons'
import Post from './InitiativePost'
import * as atoms from 'misc/atoms'
import { useRecoilState, atom } from 'recoil'
import {toJSON} from 'misc'

const useStyles = makeStyles((theme)=>({

  post:{
    zIndex: 11,
    position: 'absolute',
    width: '100%',
    height: '100%',
    maxWidth: 400,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    overflowY: 'auto',
    zIndex: 30
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


const sendComment = (text, commentsRef, user, type, commentsCount)=>{
  if(text){
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

const AddReply = ({ r, n })=>{
  const classes = useStyles()
  const { initiativeID, postID } = useParams()
  const user = useUser()
  const i18n = useI18n()
  const commentsCount = useDatabase().ref(`chats/${initiativeID}/messages/${postID}/commentsCount`)
  const [reply, setReply]= useRecoilState(atoms.replyFieldAtom)
  const commentsRef = useDatabase().ref(`chats/${initiativeID}/comments/${postID}`)

  const [replyText, setReplyText] = useRecoilState(atoms.replyAtom)
  useEffect(()=>{
    if(replyText[r.id]==undefined) {setReplyText(s=>({...s, [r.id]:''}))}
  },[]) 

  return <Box key={n} style={{display: 'block', width:"100%", marginTop: '0.5rem', padding: '0.5rem', position: 'relative', boxSizing: 'border-box'}}>
      <TextField 
        variant="outlined"
        className={classes.textField}
        style={{width:"100%", borderRadius: "100px"}}
        label={i18n('chatWriteReply')}
        onChange={(e)=>{
          setReplyText(s=>({...s, [r.id]: e.target.value}))
        }}
        onSubmit={()=>{console.log('submit')}}
        onKeyDown={(e)=>{
          if(e.keyCode === 13){
            sendComment(replyText[r.id], commentsRef.child(`${r.id}/replies`), user, 'reply', commentsCount)
            setReplyText(s=>({...s, [r.id]:''}))
          }
        }}
        value={replyText[r.id]||''}
        InputProps={{
          endAdornment:<InputAdornment position="end">
            <IconButton onClick={()=>{
              sendComment(replyText[r.id], commentsRef.child(`${r.id}/replies`), user, 'reply', commentsCount)
              setReplyText(s=>({...s, [r.id]:''}))
            }}>
              <Send fontSize="small"/>
            </IconButton>
          </InputAdornment>
        }}
      />
    </Box>
}

const CommentBody = ({c, refDir, initiative})=>{
  const ref = useDatabase().ref(refDir)
  const classes = useStyles()
  const { initiativeID, postID } = useParams()
  const user = useUser()
  const i18n = useI18n()
  const [reply, setReply]= useRecoilState(atoms.replyFieldAtom)
  const [anchorEl, setAnchorEl] = useState(null);
  const commentsCount = useDatabase().ref(`chats/${initiativeID}/messages/${postID}/commentsCount`)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.preventDefault();
    if(event.target.innerText=='Delete'){
      ref.child(c.id).remove()
      commentsCount.child(c.id).remove()
    }
    setAnchorEl(null);
  };
  return <>
    <div style={{verticalAlign:"middle", width:'100%', marginTop:c.showAvatar?"1.5rem":"0.2rem", display:"flex", justifyContent: "start" }}>
    <ListItem disableGutters style={{padding:0}} component='div' ContainerComponent='div' ContainerProps={{style:{width: '100%'}}} style={{width:'100%'}}>
      <ListItemText 
        primary={c.user.name}
        secondary={
          Object.entries(initiative.properties.members.find(mem=>mem.uid===c.user.id).roles).filter(r=>r[1]).map(r=>r[0]).join(', ') + ' | ' + 
          c.timestamp.replace("T"," at ").split(":").slice(0,2).join(":")
        }
      />
      {user.uid===c.user.id&& <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="more" style={{marginTop:'-1rem'}} aria-controls="more-menu" aria-haspopup="true" onClick={handleClick}>
          <MoreVert fontSize='small'/>
        </IconButton>
        <Menu
          id="more-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem component='button' onPointerDown={handleClose} /*onTouchEnd={handleClose}*/ /*onMouseDown={handleClose} onClick={handleClose}*/ >Delete</MenuItem>
        </Menu>
      </ListItemSecondaryAction>}
    </ListItem>
    </div>
    
    <Typography variant="body1">
      {c.text}
    </Typography> 
    <Button onClick={()=>{
      if(c.likes&&c.likes[user.uid]){
        var updates = {};
        updates['/likes/' + user.uid] = null;
        ref.child(c.id).update(updates)
      }else{
        var updates = {};
        if(c.dislikes&&c.dislikes[user.uid]){
          updates['/dislikes/' + user.uid] = null;
        }
        updates['/likes/' + user.uid] = true;
        ref.child(c.id).update(updates)
      }
    }}>
      {(c.likes&&c.likes[user.uid])?<ThumbUp />:<ThumbUpOutlined />}
      <span style={{marginLeft:'0.5rem'}}>{c.likes?Object.keys(c.likes).length:0}</span>
    </Button>
    <Button onClick={()=>{
      if(c.dislikes&&c.dislikes[user.uid]){
        var updates = {};
        updates['/dislikes/' + user.uid] = null;
        ref.child(c.id).update(updates)
      }else{
        var updates = {};
        if(c.likes&&c.likes[user.uid]){
          updates['/likes/' + user.uid] = null; 
        }
        updates['/dislikes/' + user.uid] = true;
        ref.child(c.id).update(updates)
      }
    }}>
      {(c.dislikes&&c.dislikes[user.uid])?<ThumbDown />:<ThumbDownOutlined />}
        <span style={{marginLeft:'0.5rem'}}>{c.dislikes?Object.keys(c.dislikes).length:0}</span>
    </Button>
    <Button onClick={()=>{setReply(c.id)}}>
      <span style={{marginLeft:'0.5rem'}}>Reply</span>
    </Button>
  </>
}

const Comment = ({initiative, m, n })=>{

  n = n || 0
  const classes = useStyles()
  const { initiativeID, postID } = useParams()
  const user = useUser()
  const i18n = useI18n()
  const [reply, setReply]= useRecoilState(atoms.replyFieldAtom)

  useEffect(()=>{
    if(m.reply && reply){
      setReply(m.id)
    }
  },[m])

  return (
    <Box key={n} style={{display: 'flex'}}>
      <Avatar style={{marginLeft: '1rem', marginTop: '1.75rem' }} alt={m.user.name} src={m.user.avatar}> {m.user.name.split(' ').map(l=>l.slice(0,1).toUpperCase()).join('')} </Avatar>
      <Box style={{
        paddingTop:"0.2rem",
        paddingLeft: "1rem",
        marginBottom:'0.2rem',
        width: '100%'
      }} >
        <CommentBody initiative={initiative} c={m} n={n} refDir={`chats/${initiativeID}/comments/${postID}`}/>
        {m.replies && Object.values(m.replies).map((r,i)=>(<Box key={i} style={{display: 'flex'}}>
            <Avatar style={{marginLeft: '1rem', marginTop: '1.75rem' }} alt={r.user.name} src={r.user.avatar} >{r.user.name.split(' ').map(l=>l.slice(0,1).toUpperCase()).join('')}</Avatar>
            <Box style={{
              paddingTop:"0.2rem",
              paddingLeft: "1rem",
              marginBottom:'0.2rem',
              width: '100%'
            }} >
              <CommentBody initiative={initiative} c={r} n={Number(String(n)+ "0" + String(i))} refDir={`chats/${initiativeID}/comments/${postID}/${m.id}/replies`}/>
            </Box>
          </Box>
        ))}
        {(m.replies || reply==m.id)&&<AddReply r={m} n={n}/>}

      </Box>
    </Box>
  )
}


export default ({initiative})=>{
  const { initiativeID, postID } = useParams()
  const classes = useStyles()
  const [showBar, setShowBar] = useRecoilState(atoms.showBarAtom)
  const history = useHistory()
  const messageRef = useDatabase().ref(`chats/${initiativeID}/messages/${postID}`)
  const messageData = useDatabaseObjectData(messageRef, {startWithValue:null})
  const commentsRef = useDatabase().ref(`chats/${initiativeID}/comments/${postID}`)
  const commentsData = useDatabaseListData(commentsRef, {startWithValue:[]})
  const i18n = useI18n()
  const [text, setText] = useState('')
  const user = useUser()
  const [expanded, setExpanded] = useRecoilState(atoms.expanded)
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
            sendComment(text, commentsRef, user, 'comment', commentsCount)
            setText('')
          }
        }}
        value={text}
        InputProps={{
          endAdornment:<InputAdornment position="end">
            <IconButton onClick={()=>{
              sendComment(text, commentsRef, user, 'comment', commentsCount)
              setText('')
            }} >
              <Send fontSize="small"/>
            </IconButton>
          </InputAdornment>
        }}
      />
    </Box>
  </Box>)
}