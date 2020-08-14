import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { SwipeableDrawer, Button, List, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { MapOutlined, LibraryBooksOutlined, ChatBubbleOutline, PeopleOutline, SettingsApplicationsOutlined, FeedbackOutlined, BuildOutlined } from '@material-ui/icons';
import { useAuth, useUser } from 'reactfire';
import ErrorBoundary from 'global/ErrorBoundary'
import { initiativeBarAtom, selectedAtom, creatingAtom, projectBarAtom, resourceBarAtom } from 'global/Atoms'
import { useRecoilState } from 'recoil'

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


  const user = useUser();
  const menuTop = user?
    [
      {
        id:'map',
        text:'Мапа'
      }, 
      {
        id:'initiatives',
        text: 'Ініціативи'
      },
      {
        id: 'projects',
        text: 'Проекти'
      },
      {
        id: 'resources',
        text: 'Ресурси'
      }
    ]:
    [      
      {
        id:'map',
        text:'Мапа'
      }, 
      {
        id: 'projects',
        text: 'Проекти'
      },
      {
        id: 'resources',
        text: 'Ресурси'
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

  const list = (anchor) => (
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
              setSelected(null)
              setIsCreating(null)  
              setInitiativeBar(false)
              setProjectBar(false)
              setResourceBar(false)

            }else if(val.id==='initiatives'){
              setSelected(null)
              setIsCreating(null)  
              setInitiativeBar(true)
              setProjectBar(false)
              setResourceBar(false)

            }else if(val.id==='projects'){
              setSelected(null)
              setIsCreating(null)  
              setInitiativeBar(false)
              setProjectBar(true)
              setResourceBar(false)

            }else if(val.id==='resources'){
              setSelected(null)
              setIsCreating(null)  
              setInitiativeBar(false)
              setProjectBar(false)
              setResourceBar(true)
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
  );

  return (
    <div>
      <>
        <ErrorBoundary>
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
        </ErrorBoundary>
      </>
    </div>
  );
}