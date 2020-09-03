import React, { useEffect, useRef, Suspense } from 'react'
// import * as serviceWorker from '../serviceWorker';
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import AppBar from './AppBar'
import Projects from './Projects'
import Resources from './Resources'
import Map from './Map'
import { barAtom, mapAtom } from 'global/Atoms'
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil'
import useMeasure from "use-measure";
import { theme } from 'global/Theme'
import { firebaseConfig } from 'config'
import { ThemeProvider } from '@material-ui/core/styles'
import { FirebaseAppProvider } from 'reactfire'
import { useRecoilValue } from 'recoil'
import { projectBarAtom, resourceBarAtom } from 'global/Atoms'
import moment from 'moment'
// import(`moment/locale/${navigator.language.toLocaleLowerCase().split('-')[0]}`).then(()=>{
//   console.log('loaded local ', navigator.language.toLocaleLowerCase())
//   moment().locale(navigator.language.toLocaleLowerCase().split('-')[0])
// })

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
    zIndex:0,
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
  const [barDimensions] = useRecoilState(barAtom)
  const mapRef = useRef()
  const mapMeasure = useMeasure(mapRef)
  const setMapDimensions = useSetRecoilState(mapAtom)
  const projectBar = useRecoilValue(projectBarAtom)
  const resourceBar = useRecoilValue(resourceBarAtom)

  useEffect(()=>{
    setMapDimensions(mapMeasure)
  }, [mapMeasure])

  return (
    <Box className={classes.root}>
      <AppBar />
      <Suspense fallback={null}>
       {projectBar && <Projects />}
       {resourceBar && <Resources />}
      </Suspense>
      <Box className={classes.map} style={{zIndex: -10, top: barDimensions.height}} ref={mapRef}>
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
