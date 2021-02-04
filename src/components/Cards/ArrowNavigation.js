import React from 'react'
import { Fab } from '@material-ui/core'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useUser } from 'reactfire'
import { ArrowBack, ArrowForward } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { addVisitMutation } from 'global/Queries'
import * as Atoms from 'global/Atoms'
import { addVisitPrevious, getFeed, rearrangeCards } from 'global/Misc'


export default ({ style })=>{
  const [slideIndex, setSlideIndex] = useRecoilState(Atoms.indexAtom)
  const [feed,setFeed] = useRecoilState(Atoms.initiativeFeed)
  const [next, setNext] = useRecoilState(Atoms.nextAtom)
  const [last, setLast] = useRecoilState(Atoms.lastAtom)

  return <>
    <Fab size='small' 
      onClick={()=>{
        setSlideIndex(i=>i-1)
        if(feed.length===1){
          console.log('reload')
          setFeed(getFeed({last,next}))
        }
      }} 
      style={{...style, background: '#ffffff', position: "absolute", transform: "translate( calc( 50% - 1rem ), -50% )", zIndex: 15}}
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
      style={{ ...style, background: '#ffffff', position: "absolute", right:0, transform: "translate( -50%, -50% )", zIndex: 15}}
    >
      <ArrowForward/>
    </Fab>
  </>
}
