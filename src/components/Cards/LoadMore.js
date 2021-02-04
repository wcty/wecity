import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress, Box, Fab, useMediaQuery } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper:{
    minHeight: "250px",
    minWidth: "100%",
    zIndex: 10,
    //position: 'fixed',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
		},
  },
  swipeArea:{
    minWidth: "100%",
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
      minWidth: "50%",
		},
  },
  img: {
    height: '160px',
    maxWidth: 400,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
    margin: "auto",
    verticalAlign: 'middle',
    objectFit: 'cover'
  },
  info: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  }
}));

export default ()=>{
  const classes = useStyles();
  const desktop = useMediaQuery('(min-width:600px)');

  return <div style={{ position:"absolute", padding: '1rem', overflow: 'visible', bottom: 0, width: 'calc( 100% - 2rem )' }}>
  {!desktop&&<Box
    className={classes.paper} 
    style={{
      background: 'none', 
      borderRadius: "5px",
      overflowY: 'visible',
      minHeight: '250px',
      maxHeight: '400px',
      width: '100%',
      bottom: "1rem",
      right: "1rem",
      minWidth: "calc( 100% - 2rem )"
    }}
    >   
    <Box         
      top={"50%"}
      left={"50%"}
      style={{transform: "translate(-50%, -50%)"}}
      position="absolute"
      alignItems="center"
      justifyContent="center" 
    >
      <Fab style={{background:'#ffffff'}}>
        <CircularProgress />
      </Fab>
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
      </Box>
    </Box>
  </Box>}
  </div>
}
