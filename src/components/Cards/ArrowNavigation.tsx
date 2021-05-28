import { Fab } from '@material-ui/core'
import { useRecoilState } from 'recoil'
import { ArrowBack, ArrowForward } from '@material-ui/icons'
import { atoms, getFeed } from 'misc'

export default ()=>{
  const [ slideIndex, setSlideIndex ] = useRecoilState(atoms.indexAtom)
  const [ feed, setFeed ] = useRecoilState(atoms.initiativeFeed)
  const [ next, setNext ] = useRecoilState(atoms.nextAtom)
  const [ last, setLast ] = useRecoilState(atoms.lastAtom)

  return <>
    <Fab size='small' 
      onClick={()=>{
        setSlideIndex(i=>i-1)
        if(feed.length===1){
          console.log('reload')
          setFeed(getFeed({last,next}))
        }
      }} 
      style={{ background: '#ffffff', position: "absolute", transform: "translate( calc( 50% - 1rem ), -50% )", zIndex: 15}}
    >
      <ArrowBack/>
    </Fab>
    <Fab size='small' 
      onClick={()=>{
        setSlideIndex(i=>i+1)
        if(feed.length===1){
          console.log('reload')
          setFeed(getFeed({last,next}))
        }
      }} 
      style={{ background: '#ffffff', position: "absolute", right:0, transform: "translate( -50%, -50% )", zIndex: 15}}
    >
      <ArrowForward/>
    </Fab>
  </>
}
