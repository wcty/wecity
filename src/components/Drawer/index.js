import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { SwipeableDrawer, List, Divider, Box, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { MapOutlined, LibraryBooksOutlined, PeopleOutline, SettingsApplicationsOutlined, FeedbackOutlined, BuildOutlined, InfoOutlined } from '@material-ui/icons';
import { useUser } from 'reactfire';
import { useHistory } from 'react-router-dom';
import LangSelect from './LangSelect'
import { useI18n } from 'global/Hooks'
import Header from './Header'

const useStyles = makeStyles({
  list: {
    width: 250,
    marginTop: '1rem'
  },
  fullList: {
    width: 'auto',
  },
});

export default ({ state, setState })=>{
  const classes = useStyles();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const history = useHistory()
  const user = useUser()
  
  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
  };

  const i18n = useI18n()
  const menuTop = 
    [
      {
        id:'map',
        text: i18n('initiativeMap')
      }, 
      {
        id:'initiatives',
        text: i18n('myInitiatives')
      },
      {
        id: 'settings',
        text:i18n('settings')
      }, 
      {
        id: 'about',
        text:i18n('about')
      },
      {
        id: 'feedback',
        text:i18n('feedback')
      }
    ]


  const list = (anchor) => {
    return <>
      <Header />
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
      >
        <List  
          disablePadding       
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          { user && !user.isAnonymous && menuTop.map((val, index) => (
            <ListItem button key={val.id} onClick={()=>{
              if(val.id==='map'){
                history.push('/initiative/explore')
              }else if(val.id==='initiatives'){
                history.push('/initiatives')
              }else if(val.id==='settings'){
                history.push('/settings')
              }else if(val.id==='about'){
                history.push('/intro')
              }else if(val.id==='feedback'){
                history.push('/feedback')
                console.log('feedback')
              }
            }}>
              <ListItemIcon>
                {val.id==='map' && <MapOutlined /> }
                {val.id==='initiatives' && <PeopleOutline /> }
                {val.id==='settings' && <SettingsApplicationsOutlined /> }
                {val.id==='about' && <InfoOutlined/> }
                {val.id==='feedback' && <FeedbackOutlined /> }

              </ListItemIcon>
              <ListItemText primary={val.text} />
            </ListItem>
          ))}
        </List>
        <List 
          disablePadding
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
        <Box style={{padding:'0.5rem 1rem'}}><Divider /></Box>
        </List>
        
        <LangSelect variant="standard" toggleDrawer={()=>{setState(false)}} style={{ padding:'1rem', widht:'100%' }} />
      </div>
    </>
  };

  return (
    <>          
        <SwipeableDrawer
          open={state}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          disableBackdropTransition={true}//!iOS} 
          disableDiscovery={iOS}
          //backdropelement="test"
        >
          {list('left')}
        </SwipeableDrawer>
    </>
  );
}