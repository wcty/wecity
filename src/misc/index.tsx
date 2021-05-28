import { InitiativesLastVisitedQuery, InitiativesNearbyQuery } from 'generated';
import { SetterOrUpdater } from 'recoil';
import Cookies from 'universal-cookie';

export * from './i18n'
export * from './recoil'
export * from './style'
export * from './hooks'
export * from './config'
export * from './nhost'

export const cookies = new Cookies();

export const toJSON = (date:Date)=>{
  var timezoneOffsetInHours = -(date.getTimezoneOffset() / 60); //UTC minus local time
  var sign = timezoneOffsetInHours >= 0 ? '+' : '-';
  var leadingZero = (Math.abs(timezoneOffsetInHours) < 10) ? '0' : '';

  //It's a bit unfortunate that we need to construct a new Date instance 
  //(we don't want _date_ Date instance to be modified)
  var correctedDate = new Date(date.getFullYear(), date.getMonth(), 
      date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 
      date.getMilliseconds());
  correctedDate.setHours(date.getHours() + timezoneOffsetInHours);
  var iso = correctedDate.toISOString().replace('Z', '');

  return iso + sign + leadingZero + Math.abs(timezoneOffsetInHours).toString() + ':00';
}

export function reverseArray(arr:any[]) {
  var newArray = [];
  for (var i = arr.length - 1; i >= 0; i--) {
    newArray.push(arr[i]);
  }
  return newArray;
}

export const addVisitPrevious = ({addVisit, user, index, markers, last, initUID}:any)=>{
  addVisit({
    "variables": {
      "visit": {
        "initUID": initUID,
        "user": user.uid
      }
    }
  })
}

type Explore = { id:'explore' }
export const explore = { id:'explore' } as Explore

type LoadMore = { id:'loadMore' }
export const loadMore = { id:'loadMore' } as LoadMore

export type FeedEntry = (InitiativesNearbyQuery['initiatives_nearby'][number]|typeof explore)

export const getFeed = ({ next, last }:{
  next: InitiativesNearbyQuery['initiatives_nearby'], 
  last: InitiativesLastVisitedQuery['initiative_visits']
}):FeedEntry[]=>{

  if(next.length>0 && last.length>0){
    return [ ...last.map(v=>v.initiative), explore, ...next ]
  }else{
    if(last.length>0){
      return [...last.map(v=>v.initiative), explore ]
    }else{
      return [ explore, ...next ]
    }
  }
}

export const rearrangeCards = ({ initiative_id, setNext, setLast}:{
  initiative_id:string, setNext:SetterOrUpdater<InitiativesNearbyQuery['initiatives_nearby']>, setLast: SetterOrUpdater<InitiativesLastVisitedQuery['initiative_visits']>
})=>{
  setNext((next)=>{
    const id = next.map((f:any)=>f.properties.id).indexOf(initiative_id)
    const behind = [...next].slice(0, id + 1).reverse()
    const other = [...next].slice(id+1, next.length)
    setLast((last)=>[...last, ...behind.map((v)=>({visited_at: new Date(), initiative: v}))])
    return other
  })
}
