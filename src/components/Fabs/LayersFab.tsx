import { makeStyles } from '@material-ui/core/styles'
import { Fab } from '@material-ui/core'
import { Layers, Terrain } from '@material-ui/icons'
import { useRecoilState } from 'recoil'
import { atoms } from 'misc'

const useStyles = makeStyles(theme => ({
  layersFab: {
    position: 'absolute',
    top: '9rem',
    right: '1rem',
    zIndex: 5,
    background: '#ffffff'
  }
}))  

export default ()=>{
  const classes = useStyles()
  const [satellite,setSatellite] = useRecoilState(atoms.satellite)

  return ( 
    <Fab 
      onClick={()=>{
        setSatellite(!satellite)
      }}
      className={classes.layersFab} 
      aria-label="satellite layer"
      size='small'
      style={{zIndex:1, position: 'absolute'}}
    >
      {satellite?<Layers fontSize='small' />:<Terrain  fontSize='small'/>}
    </Fab>
  )
}