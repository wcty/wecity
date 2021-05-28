import { useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client'
import SwipeableViews from 'react-swipeable-views'
import { virtualize } from 'react-swipeable-views-utils'
import { atoms, reverseArray, getFeed, rearrangeCards, explore, querySize, useGeolocation } from 'misc'
import { useAddInitiativeVisitMutation, useInitiativesNearbyQuery, useInitiativesLastVisitedQuery, useInitiativeLazyQuery, InitiativeFieldsFragment } from 'generated'
import Initiative from './Initiative'
import Explore from './Explore'
import LoadMore from  './LoadMore'

const EnhancedSwipeableViews = virtualize(SwipeableViews)

const useStyles = makeStyles((theme) => ({
  slide: {
    overflow:'visible', 
    minWidth: "100%",
    zIndex: 10,
    paddingTop: '-40px'
  },
  wrapper: {
    position: 'absolute',
    right: 0,
    width: '100%',
    height: '100%',
    overflow: 'visible',
    [theme.breakpoints.up("sm")]: {
      maxWidth: '400px',
      width: "50%",
      overflowX:'hidden'
    }
  },
  sidebar: {
    overflow: 'visible',
    marginTop: `100%`,
    width: "100%",
    maxHeight: `100%`,
    bottom: "0",
    right: "0",
    minHeight: "250px",
    zIndex: 16,
    position: "absolute",
    [theme.breakpoints.up("sm")]: {
      marginTop: 0,
      maxWidth: 400,
      justify: "flex-end",
      float: "right",
    }
  }
}))

export default () => {
  const classes = useStyles()
  const history = useHistory()
  const location = useGeolocation()

  const { initiativeID } = useParams<{initiativeID:string}>()
  const [ addVisit ] = useAddInitiativeVisitMutation()

  const [ user ] = useRecoilState(atoms.user)
  const [ slideIndex, setSlideIndex ] = useRecoilState(atoms.indexAtom)
  const [ viewport, setViewport ] = useRecoilState(atoms.viewport)
  const [ next, setNext ] = useRecoilState(atoms.nextAtom)
  const [ last, setLast ] = useRecoilState(atoms.lastAtom)
  const [ own, setOwn ] = useRecoilState(atoms.ownAtom)
  const [ offset, setOffset ] = useRecoilState(atoms.offsetAtom)
  const [ loadMoreLast, setLoadMoreLast ] = useRecoilState(atoms.loadMoreLast)
  const [ loadMoreNext, setLoadMoreNext ] = useRecoilState(atoms.loadMoreNext)
  const [ feed, setFeed ] = useRecoilState(atoms.initiativeFeed)
  const [ lockKeys, setLock ] = useRecoilState(atoms.lockKeys)
  
  useEffect(()=>{
    function Keys (event:KeyboardEvent) {
      if(!lockKeys && event.key){
        ({
          "ArrowLeft"  : ()=>setSlideIndex(i=>i-1),
          "ArrowRight" : ()=>setSlideIndex(i=>i+1),
          "Left"  : ()=>setSlideIndex(i=>i-1),
          "Right" : ()=>setSlideIndex(i=>i+1)
        } as {[key:string]:Function})?.[event.key]?.()
      }
    }
    window.addEventListener('keydown', Keys);
    return ()=>{
      window.removeEventListener('keydown', Keys);
    }
  },[lockKeys])

  const { loading:nextLoading, data:nextData, refetch:refetchNext } = useInitiativesNearbyQuery({ 
    variables: {
      location: location? 
        { type:"Point", coordinates: [location.longitude, location.latitude] }:
        { type:"Point", coordinates: [viewport.longitude, viewport.latitude] }, 
      limit: querySize,
      ...(user? { user_id: user.id }: {}) 
    }, fetchPolicy: "no-cache"
  })
    
  const { loading:lastLoading, data:lastData, fetchMore:fetchMoreLast } = useInitiativesLastVisitedQuery({
    variables: {
      user_id: user?.id,
      limit: querySize
    }
  })
  
  const [loadInitiative, { called, loading, error, data:initiative }] = useInitiativeLazyQuery()
  
  useEffect(()=>{
    //Load next values
    if( !nextLoading && loadMoreNext ){
      setLoadMoreNext(false)
      refetchNext({ 
        location: location? 
          { type:"Point", coordinates: [location.longitude, location.latitude] }:
          { type:"Point", coordinates: [viewport.longitude, viewport.latitude] }, 
        limit: querySize,
          ...( user? { user_id: user.id }: {}) 
      })
    }
  },[ nextLoading, loadMoreNext]) 
  
  useEffect(()=>{
    //load last initiatives
    if(last.length>0 && loadMoreLast ){
      setLoadMoreLast(false)
      fetchMoreLast({
        variables: {
          user_id: user?.id,
          limit: querySize,
          ...(last?.[0]? {max_date: last[0].visited_at}: {})
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult || fetchMoreResult.initiative_visits.length === 0) {
            return prev;
          }
          return Object.assign({}, prev, {
            lastInitiatives: [...prev.initiative_visits, ...fetchMoreResult.initiative_visits]
          });
        }
      })
    }
  },[next, last, loadMoreLast])

  //Update global states
  useEffect(()=>{
    if(nextData && !nextLoading && lastData && !lastLoading ) {
      setLast(reverseArray(lastData.initiative_visits))
      setNext(
        nextData.initiatives_nearby.filter(
          (o) => lastData.initiative_visits.map(f=>f.initiative.id).indexOf(o.id) === -1
        )
      )
    }
  },[nextData, nextLoading, lastData, lastLoading])
  
  useEffect(()=>{
    const index = feed.map(f=>f.id).indexOf(initiativeID)
    if(initiativeID && index===-1 && initiativeID!=='explore'){
      console.log('forward somewhere')
      loadInitiative({variables:{initiative_id:initiativeID}})
    }
  }, [])

  //Set feed when one initiative selected
  useEffect(()=>{
    if(initiative?.initiatives_by_pk){
      setFeed([initiative.initiatives_by_pk])
      setSlideIndex(1)
      const coords:[number, number] = initiative.initiatives_by_pk.geom.coordinates
      setViewport({ ...viewport, zoom: 16, latitude: coords[0], longitude: coords[1] })
    }else if(error){
      //setSlideIndex(baseIndex)
      console.log('error special selected', error)
    }
  },[initiative?.initiatives_by_pk, error])

  //Fly to selected
  useEffect(()=>{
    if( initiativeID === 'explore' && feed.length!==1 ){
      if(location){
        setViewport({ ...viewport, zoom: 16, ...location })
      }
    }else{
      const coords = feed.filter((v):v is InitiativeFieldsFragment=>v.id!=='explore').find(f=>f.id === initiativeID)?.geom?.coordinates
      if(coords) setViewport({ ...viewport, zoom: 16, latitude: coords[0], longitude: coords[1] })
    }
  }, [ initiativeID, feed])

  //Update feed
  useEffect(()=>{
    //Here we update feed after new data is loaded
    setFeed(prev=>{
      if(prev.length===1 && prev[0]?.id!=='explore'){
        //leave the same feed
        return prev
      }else{
        const newFeed = getFeed({ next, last })
        return newFeed.length>1 && !loading ? newFeed : prev
      }
    })
  },[ next, last, loading ])

  useEffect(()=>{
    //Load more last or next features on the end of the  list
    const baseIndex = offset + feed.map(f=>f.id).indexOf('explore') || 0
    const entry = feed[baseIndex+slideIndex]
    if(entry){
      //Regular swipes
      if(feed.length!==1){
        //console.log('explore', feed)
        history.push(`/initiative/${entry.id}`)
      }
      if(baseIndex!==0 && baseIndex - offset + slideIndex<=3){
        //Swipe near the back edge of previous initiatives
        setLoadMoreLast(true)
      }
      if( next.length==2){
        //Swipe near the front edge of previous initiatives
        setLoadMoreNext(true)
        console.log('load  next')
      }
    }else if(feed.length!==1){
      //Swipes on the edge cases
      if(slideIndex>0){
        setLoadMoreNext(true)
        const lastFeature = feed[baseIndex+slideIndex-1]
        if(lastFeature && lastFeature.id!=='explore'){
          //This is to clear the feed, when everything new is watched
          addVisit({
            "variables": {
              initiative_id: lastFeature.id,
              user_id: user?.id
            }
          })
          setLoadMoreLast(true)
          setLoadMoreNext(true)
          setOffset(o=>o-1)
          console.log('finished', offset)
        }
        setSlideIndex(i=>i-1)
      }else{
        setLoadMoreLast(true)
        setSlideIndex(i=>i+1)
      }
    }else{
      if(slideIndex!==0 && feed.length!==1){
        console.log('setFeed')
        setFeed(getFeed({last, next}))
      }
    }

  }, [feed, slideIndex])

  const onTransitionEnd = ()=>{
    //Mark initiatives, that were already seen, and rearrange last cards
    const baseIndex = offset + feed.map(f=>f.id).indexOf('explore') || 0
    if(user){
      if( slideIndex+offset >1){
        const previous = feed[baseIndex + slideIndex - 1]
        if(previous && previous.id!=='explore'){
          addVisit({
            variables: {
              initiative_id: previous.id,
              user_id: user?.id
            }
          })
          rearrangeCards({ initiative_id: previous.id, setNext, setLast })
          setOffset(o=>o-1)
        }
      }
    } 
  }

  const slideRenderer = ({key, index}:{key:number|string, index: number})=>{
    const baseIndex = offset + feed.map(f=>f.id).indexOf('explore') || 0
    //if(feed.map(f=>f.properties.uid).indexOf('explore')){
      const entry = feed[baseIndex+index]
      if( entry && entry.id==='explore' ){
        return <Explore key={key} />
      }else if( entry ){
        return <Initiative initiative={entry as InitiativeFieldsFragment} key={key}/>   
      }else{
        return <LoadMore key={key} />
      }
  }
  return <Box className={classes.wrapper}>
  <Box className={classes.sidebar}> 
    <EnhancedSwipeableViews
      overscanSlideBefore={2}
      overscanSlideAfter={1}
      index={slideIndex}
      onTransitionEnd={onTransitionEnd}
      onChangeIndex={(i)=>{
        setSlideIndex(i)
        if(feed.length===1){
          console.log('reload')
          setFeed(getFeed({last,next}))
        }
      }}
      slideRenderer={slideRenderer}
      // style={{ overflow: 'visible', bottom: 0, height:'100%' }}
      slideClassName={classes.slide}
      enableMouseEvents
      resistance
    />
  </Box>
  </Box>
}
