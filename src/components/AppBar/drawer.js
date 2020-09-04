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

const useStyles = makeStyles({
  list: {
    width: 250,
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

  const user = useUser();
  const menuTop = user?
    [
      {
        id:'map',
        text:'Мапа ініціатив'
      }, 
      {
        id:'initiatives',
        text: 'Мої ініціативи'
      },
      {
        id: 'projects',
        text: 'Проектні пропозиції'
      },
      {
        id: 'resources',
        text: 'Локальні ресурси'
      }
    ]:
    [      
      {
        id:'map',
        text:'Мапа ініціатив'
      }, 
      {
        id: 'projects',
        text: 'Проектні пропозиції'
      },
      {
        id: 'resources',
        text: 'Локальні ресурси'
      }
    ]

  const menuBottom = user?
    [
      {
        id: 'settings',
        text:'Налаштування'
      }, 
      {
        id: 'feedback',
        text:'Зворотній зв\'язок'
      }
    ]:
    [
      {
        id: 'feedback',
        text:'Зворотній зв\'язок'
      }
    ]

  const list = (anchor) => {
    return (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="Menu of the map"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
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
        <List>
          {menuBottom.map((val, index) => (
            <ListItem button key={val.id} onClick={()=>{
              if(val.id==='settings'){

              }else if(val.id==='feedback'){
                setRedirect('/feedback')
                console.log('feedback')
              }
            }}>
              <ListItemIcon>
                {val.id==='settings' && <SettingsApplicationsOutlined /> }
                {val.id==='feedback' && <FeedbackOutlined /> }
              </ListItemIcon>
              <ListItemText primary={val.text} />
            </ListItem>
          ))}
        </List>
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