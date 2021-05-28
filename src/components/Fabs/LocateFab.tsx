import { makeStyles } from '@material-ui/core/styles'
import { Fab } from '@material-ui/core'
import { useRecoilState } from 'recoil'
import { atoms, useGeolocation } from 'misc'
import { MyLocation } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  locateFab: {
    position: 'absolute',
    top: '5.5rem',
    right: '1rem',
    zIndex: 5,
    background: '#ffffff'
  }
}))  

export default ()=>{
  const classes = useStyles()
  const location = useGeolocation()
  const [viewport, setViewport] = useRecoilState(atoms.viewport)

  return <>
    <Fab 
      onClick={()=>{
        if(location){
          setViewport({viewportChangeMethod: 'easeTo', ...location, zoom: 16});
        }
      }}
      className={classes.locateFab} 
      size="small"
      aria-label="add"
      disabled={!location}
      style={{zIndex:1, position: 'absolute'}}
    >
      <MyLocation />
    </Fab>
  </>
}