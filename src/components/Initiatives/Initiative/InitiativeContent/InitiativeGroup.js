import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import { Divider, Tabs, Tab, Typography, Box} from '@material-ui/core';
import { useI18n } from 'global/Hooks'
import InitiativeChat from './InitiativeChat'

function TabPanel({ children, value, index, ...other }) {

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      style={{paddingTop: '0.25rem'}}
      {...other}
      key={index}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "calc( 100% + 4rem )",
    marginLeft: '-2rem',
    marginTop: '1rem'
  },
  tab: {
    backgroundColor: '#eeeeee',
    boxSizing: "border-box"
  }
}));

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 36,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(0),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))((props) => <Tab {...props} />);

export default function FullWidthTabs({initiative}) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const i18n = useI18n()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <Divider/>
      <Box>
        <AntTabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <AntTab label={i18n('initiativeGroupChat')} {...a11yProps(0)} />
          <AntTab label={i18n('initiativeGroupMembers')} {...a11yProps(1)} />
          <AntTab label={i18n('initiativeGroupProjects')} {...a11yProps(2)} />
          <AntTab label={i18n('initiativeGroupResources')} {...a11yProps(3)} />

        </AntTabs>
      </Box>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        style={{paddingTop:0}}
      >
        <TabPanel key={0} value={value} index={0} dir={theme.direction} className={classes.tab}>
            <InitiativeChat initiative={initiative}/>
        </TabPanel>
        <TabPanel key={1} value={value} index={1} dir={theme.direction} className={classes.tab}>
            <Typography variant="h6"> 
              {i18n('initiativeGroupMembers')}
            </Typography>
            <Typography variant="caption"> 
              In active development
            </Typography>
        </TabPanel>
        <TabPanel key={2} value={value} index={2} dir={theme.direction} className={classes.tab}>
          <Typography variant="h6"> 
            {i18n('initiativeGroupProjects')}
          </Typography>
          <Typography variant="caption"> 
            In active development
          </Typography>
        </TabPanel>
        <TabPanel key={3} value={value} index={3} dir={theme.direction} className={classes.tab}>
          <Typography variant="h6"> 
            {i18n('initiativeGroupResources')}
          </Typography>
          <Typography variant="caption"> 
            In active development
          </Typography>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
