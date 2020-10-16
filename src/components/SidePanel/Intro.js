import React, { Suspense, useEffect, useState, useRef } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { ArrowBack, ArrowForward, ArrowRightAlt } from '@material-ui/icons'
import { Box, Toolbar, MobileStepper, IconButton, Typography } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views';
import { useUser, useAuth } from 'reactfire'
import { useHistory } from 'react-router-dom'
import { ReactComponent as Logo } from 'assets/images/wecityLogoBlack.svg'
import WecityGroups from 'assets/images/wecity_groups.png'
import WecityInterfaces from 'assets/images/wecity_interfaces.png'
import WecityInterfacesZoomed from 'assets/images/wecity_interfaces_zoomed.png'
import WecityChat from 'assets/images/wecity_chat.png'
import TAB from 'assets/images/logos/tab.png'
import CreativeEurope from 'assets/images/logos/creativeeurope.png'
import UCF from 'assets/images/logos/ucf.png'
import { signInWithGoogle } from 'global/Misc'
import { useI18n } from 'global/Hooks'

const useStyles = makeStyles((theme)=>({
  intro: {
    width: '100%',
    height: '100%',
    top:0,
    bottom: 0,
    left:0,
    right:0,
    position: "absolute",
    backgroundColor: theme.palette.primary.light,
    zIndex: 5
  },
  wrapper:{
    padding: '0 2rem'
  }
}))

export default ()=>{
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = 4
  const theme = useTheme()
  const i18n = useI18n()
  const auth = useAuth()
  const user = useUser()
  const history = useHistory()

  return <>
      <Box className={classes.intro}>
        <Toolbar >
          <Logo style={{ height:"20px"}}></Logo>
        </Toolbar>
        <div className={classes.wrapper} style={{textAlign:"center"}}>
          {activeStep==0 && <>
            <img src={WecityGroups} style={{width:'50%', position:'absolute', marginLeft:'auto', marginRight:'auto', left:"0", right:"0", bottom:"6rem"}} alt="Networking" />
            <Typography style={{position:"relative"}} variant="h6">{i18n('introGreetings')}</Typography>
            <Typography style={{position:"relative"}} variant="body1">{i18n('introGreetingsDescription')}</Typography>
          </>}
          {activeStep==1 && <>
            <svg width="250px" height="250px" style={{position:'absolute', marginLeft:'auto', marginRight:'auto', left:"0", right:"0", bottom:"5rem"}} alt="Partners">
              <circle cx="125" cy="125" r="125" fill="#93CBA0" />
            </svg>
            <img src={TAB} style={{width:'40%', position:'absolute', marginLeft:'auto', marginRight:'auto', left:"0", right:"0", bottom:"7rem"}} alt="TAB" />
            <img src={UCF} style={{width:'30%', position:'absolute', left:"2rem", bottom:"13rem"}} alt="UCF" />
            <img src={CreativeEurope} style={{width:'40%', position:'absolute', right:"2rem", bottom:"13rem"}} alt="CreativeEurope" />

            <Typography style={{position:"relative"}} variant="h6">{i18n('introPartners')}</Typography>
            <Typography style={{position:"relative"}} variant="body1">{i18n('introPartnersDescription')}</Typography>
          </>}
          {activeStep==2 && <>
            <img src={WecityInterfacesZoomed} style={{width:'80%', position:'absolute', marginLeft:'auto', marginRight:'auto', left:"0", right:"0", bottom:"6rem"}} alt="Interfaces" />
            <Typography style={{position:"relative"}} variant="h6">{i18n('introFunctions')}</Typography>
            <Typography style={{position:"relative"}} variant="body1">{i18n('introFunctionsDescription')}</Typography>
          </>}
          {activeStep==3 && <>
            <img src={WecityChat} style={{width:'80%', position:'absolute', marginLeft:'auto', marginRight:'auto', left:"0", right:"0", bottom:"6rem"}} alt="Interfaces" />

            <Typography style={{position:"relative"}} variant="h6">{i18n('introLogin')}</Typography>
            <Typography style={{position:"relative"}} variant="body1">{i18n('introLoginDescription')}</Typography>
          </>}
        </div>

        <MobileStepper
          steps={maxSteps}
          style={{position:'absolute',zIndex:10, background:"none", marginLeft:"1rem", marginBottom:"1rem"}}
          position="bottom"
          variant='dots'
          activeStep={activeStep}
          className={classes.MobileStepper}
          nextButton={ 
            <IconButton 
              onClick={()=>{
                if(activeStep===maxSteps-1) {
                  if( !user || user.isAnonymous ) {
                    console.log(user)
                    signInWithGoogle(auth)
                  }
                  history.push('/')
                }
                setActiveStep(step=>step<maxSteps-1?step+1:0)
              }}
              style={{
                backgroundColor:theme.palette.primary.dark,
                color: theme.palette.primary.light,
                marginRight: '1rem'
            }}>
              <ArrowRightAlt />
            </IconButton> 
          }
        />
        <IconButton size="medium" onClick={()=>setActiveStep(step=>step>0?step-1:0)}
          style={{position:"absolute", zIndex:15, bottom: '1.625rem', left: '1.5rem'}}
        >
          <svg width="24px" height="24px"></svg>
        </IconButton>
      </Box>
    </>
}