import React, { useState, useEffect, useRef } from 'react'
import registerServiceWorker from '../registerServiceWorker'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Snackbar, Button } from '@material-ui/core'
import AppBar from './AppBar'
import Map from './Map'
import { barAtom, mapAtom } from 'global/Atoms'
import { RecoilRoot, useRecoilState } from 'recoil'
import useMeasure from "use-measure";
import { theme } from 'global/Theme'
import { firebaseConfig } from 'config'
import { ThemeProvider } from '@material-ui/core/styles'
import { FirebaseAppProvider } from 'reactfire'

const useStyles = makeStyles(theme => ({

  root:{
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  map: {
    top: 70,
    width: '100%',
    height: `100%`,
    position: 'fixed',
	},
	sidebar: {
		marginTop: `100%`,
		width: '100%',
		
		[theme.breakpoints.up('sm')]: {
			marginTop: 0,
			width: '50%',
			maxWidth: 400,
			justify: "flex-end",
			float: "right",
    }
  }  
}))

const Layout = ()=>{
  const classes = useStyles()
  const [barDimensions, setBarDimensions] = useRecoilState(barAtom)
  const mapRef = useRef()
  const mapMeasure = useMeasure(mapRef)
  const [mapDimensions, setMapDimensions] = useRecoilState(mapAtom)
  
  const [showReload, setShowReload] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState(null);
  
  const onSWUpdate = (registration) => {
    setShowReload(true);
    setWaitingWorker(registration.waiting);
    console.log('SWUpdate')
  };

  const reloadPage = () => {
    if(waitingWorker) waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    setShowReload(false);
    window.location.reload(true);
    console.log('reloadPage')
  };
  
  useEffect(() => {
    registerServiceWorker({ onUpdate: onSWUpdate });
  }, []);

  useEffect(()=>{
    setMapDimensions(mapMeasure)
  }, [mapMeasure])

  return (
    <Box className={classes.root}>
      <Snackbar
        open={showReload}
        message="A new version is available!"
        onClick={reloadPage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        action={
          <Button
            color="inherit"
            size="small"
            onClick={reloadPage}
          >
            Reload
          </Button>
        }
      />
      <AppBar />
      <Box className={classes.map} style={{top: barDimensions.height}} ref={mapRef}>
        <Map />
      </Box>
    </Box>
  )
}

export default () => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <Layout />
        </RecoilRoot>
      </ThemeProvider>
  </FirebaseAppProvider>
  )
}
