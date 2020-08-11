/* eslint-disable */
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useAuth, useUser } from 'reactfire';
import ErrorBoundary from 'global/ErrorBoundary'

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

  const user = useUser();
  const menuTop = user?
    ['New initiatives', 'My initiatives', 'Bookmarked', 'Project library', 'My projects']:
    ['City initiatives', 'Project library']

  const menuBottom = user?
    ['Settings', 'Contact us']:
    ['Contact us']

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="Menu of the map"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {menuTop.map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {menuBottom.map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
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