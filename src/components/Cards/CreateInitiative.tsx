import { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Paper, Button } from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useHistory } from 'react-router-dom'
import { useI18n, atoms, useGeolocation } from 'misc'
import { useAddInitiativeMutation } from 'generated'
import { Form, createInitiativeForm } from 'components/Forms'

import MarkerActive from 'assets/images/markerActive.svg'
import { FormButton, FormButtonProps } from 'components/Forms/types'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'calc( 100% - 2rem )',
    flexGrow: 1,
    zIndex: 999,
    position: 'fixed',
    bottom: "1rem",
    right: "1rem",
    maxHeight: 350,
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
		},
  },
  paper:{
    borderRadius: "5px",
    padding: '1rem',
  },
  marker: {
    position: 'absolute',
    top: 'calc( ( 100% - 250px ) / 2  )',
    left: '50%',
    transform: 'translate(-21px, -42px)',
    zIndex: 15
  }
}));


export default ({ cancel }:{ cancel: Function })=> {
  const classes = useStyles();
  const theme = useTheme();
  const location = useGeolocation()
  const history = useHistory()

  const setMarker = useSetRecoilState(atoms.markerAtom)
  const [user] = useRecoilState(atoms.user)
  const [finished, setFinished] = useState(false)
  const [offset, setOffset] = useRecoilState(atoms.offsetAtom)
  const [slideIndex, setSlideIndex] = useRecoilState(atoms.indexAtom)
  const [feed, setFeed] = useRecoilState(atoms.initiativeFeed)
  const [viewport, setViewport] = useRecoilState(atoms.viewport)

  const i18n = useI18n()

  const [addInitiative] = useAddInitiativeMutation({
    onCompleted:(data)=>{
      setFinished(true)
      setMarker(null)
      setOffset(0)
      setSlideIndex(1)
      // setFeed([data.insert_initiatives_one])
      // console.log('redirect', data.createInitiative.properties.uid)
      history.push(`/initiative/${data.insert_initiatives_one?.id}`)
    }
  })

  useEffect(()=>{
    if( location ){
      setViewport(v=>({...v, ...location}))
    }
  }, [])

  return <>
  <img alt="Marker for new initiative" src={MarkerActive} className={classes.marker} width={42} height={42} />
  <div className={classes.root}>
    <Paper elevation={1} className={classes.paper}>  
      <Form
        directory="initiatives"
        formGetter={()=>createInitiativeForm()} 
        floating
        variant='text'
        finished={finished}
        setFinished={setFinished}
        backButton={({ activeStep, setActiveStep, maxSteps, valid, formData }:FormButtonProps)=>
          activeStep === 0 ? (
            <Button variant="contained" size="small" onClick={()=>{
              cancel()
            }} >
               {i18n('cancel')}
            </Button>
          ):(
            <Button size="small" onClick={()=>setActiveStep((prev:number) => prev - 1)} >
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              {i18n('back')}
            </Button>
          )
        }
        nextButton={({activeStep, setActiveStep, maxSteps, valid, formData})=>
          activeStep === (maxSteps - 1) ? (
            <Button color="secondary" disabled={!valid} variant="contained" size="small" onClick={async ()=>{     
              setFinished(true)
              addInitiative({ variables:{
                geom: {
                  type: "Point",
                  coordinates: [0,0]
                },
                name: formData.name,
                image: formData.image,
                user_id: user?.id,
                description:  formData.description,
              }})
            }}>
              {i18n('add')}
            </Button>
          ):(
            <Button disabled={!valid} size="small" onClick={()=>setActiveStep((prev:number) => prev + 1)}>
              {i18n('next')}
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          )
        }
      />
    </Paper>
  </div>
</>
}
