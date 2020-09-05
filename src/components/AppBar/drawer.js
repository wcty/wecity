import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { SwipeableDrawer, Button, Box, List, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { MapOutlined, LibraryBooksOutlined, ChatBubbleOutline, PeopleOutline, SettingsApplicationsOutlined, FeedbackOutlined, BuildOutlined } from '@material-ui/icons';
import { useAuth, useUser } from 'reactfire';
import ErrorBoundary from 'global/ErrorBoundary'
import { initiativeBarAtom, selectedAtom, creatingAtom, projectBarAtom, resourceBarAtom } from 'global/Atoms'
import { useRecoilState } from 'recoil'
import FeedbackForm from './FeedbackForm'
import { Redirect, Route } from 'react-router-dom';
import LangSelect from './LangSelect'
import { useI18n } from 'global/Hooks'

const useStyles = makeStyles({
  list: {
    width: 250,
    padding: '1rem'
  },
  fullList: {
    width: 'auto',
  },
});

export default ({ state, setState })=>{
  const classes = useStyles();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const toggleDrawer = (open) => (event) => {
    const anchor = 'left'
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
  };
  const [resourceBar, setResourceBar] = useRecoilState(resourceBarAtom)
  const [projectBar, setProjectBar] = useRecoilState(projectBarAtom)
  const [initiativeBar, setInitiativeBar] = useRecoilState(initiativeBarAtom)
  const [selected, setSelected] = useRecoilState(selectedAtom)
  const [isCreating, setIsCreating] = useRecoilState(creatingAtom)
  const [redirect, setRedirect] = useState(null)
  const i18n = useI18n()

  const user = useUser();
  const menuTop = user?
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
        id: 'projects',
        text: i18n('projectLibrary')
      },
      // {
      //   id: 'resources',
      //   text: i18n('resourceLibrary')
      // }
    ]:
    [      
      {
        id:'map',
        text:i18n('initiativeMap')
      }, 
      {
        id: 'projects',
        text: i18n('projectLibrary')
      },
      // {
      //   id: 'resources',
      //   text: i18n('resourceLibrary')
      // }
    ]

  const menuBottom = user?
    [
      {
        id: 'settings',
        text:i18n('settings')
      }, 
      {
        id: 'feedback',
        text:i18n('feedback')
      }
    ]:
    [
      {
        id: 'feedback',
        text:i18n('feedback')
      }
    ]

  const list = (anchor) => {
    return (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="Menu of the map"
      >
        <List  
          disablePadding       
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {menuTop.map((val, index) => (
            <ListItem button key={val.id} onClick={()=>{
              if(val.id==='map'){
                setRedirect('/')
              }else if(val.id==='initiatives'){
                setRedirect('/initiatives')
              }else if(val.id==='projects'){
                setRedirect('/projects')
              }else if(val.id==='resources'){
                setRedirect('/resources')
              }
            }}>
              <ListItemIcon>
                {val.id==='map' && <MapOutlined /> }
                {val.id==='initiatives' && <PeopleOutline /> }
                {val.id==='projects' && <LibraryBooksOutlined /> }
                {val.id==='resources' && <BuildOutlined /> }
              </ListItemIcon>
              <ListItemText primary={val.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List 
          disablePadding
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {menuBottom.map((val, index) => (
            <ListItem button key={val.id} onClick={()=>{
              if(val.id==='settings'){

              }else if(val.id==='feedback'){
                setRedirect('/feedback')
                console.log('feedback')
              }
            }}
            >
              <ListItemIcon>
                {val.id==='settings' && <SettingsApplicationsOutlined /> }
                {val.id==='feedback' && <FeedbackOutlined /> }
              </ListItemIcon>
              <ListItemText primary={val.text} />
            </ListItem>
          ))}
        </List>
        <LangSelect variant="outlined" toggleDrawer={()=>{setState(false)}} style={{marginLeft: 'auto', marginTop: '1rem', float: 'right', minWidth: '2rem'}} />

      </div>
    )
  };

  return (
    //<div>
    <>          
        {redirect && <Redirect to={redirect} />}
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
    //</div>
  );
}