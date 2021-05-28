import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, InputAdornment, Box, TextField } from '@material-ui/core';
import { useDatabase, useUser, useDatabaseListData, useFirestore, useFirestoreDocData } from 'reactfire'
import { useParams } from 'react-router-dom'
import { Send } from '@material-ui/icons'
import { toJSON, reverseArray, useI18n, atoms } from 'misc'
import Post from './InitiativePost'
import { InitiativeFieldsFragment, useAddInitiativeMessageMutation, useInitiativePostsQuery } from 'generated';
import { useRecoilValue } from 'recoil';

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

export default ({initiative}:{initiative:InitiativeFieldsFragment})=>{
  const i18n = useI18n()
  const classes = useStyles()

  const { initiativeID } = useParams<{initiativeID:string}>()
  const user = useRecoilValue(atoms.user)

  const [text, setText] = useState('')
  const { data: messages } = useInitiativePostsQuery({variables:{initiative_id:initiativeID}})
  const [ addPost ] = useAddInitiativePostsMutation({variables:{user_id: user?.id,initiative_id:initiativeID }})


  const sendMessage = ()=>{
    if(text && user){
      setText('')

      const message = {
        text, 
        user: {
          avatar: user?.avatar_url,
          id: user.id,
          name: user?.display_name,
        },
        likes: {},
        dislikes: {}
      }
    }
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
      {messages?.initiative_thread_messages.map((m,n)=><Post m={m} n={n} initiative={initiative}/>)}
    </div>

  </>

}