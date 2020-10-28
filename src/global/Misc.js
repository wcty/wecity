import firebase from 'firebase'
import { isNoSubstitutionTemplateLiteral } from 'typescript';

const provider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = (auth) => {
  auth.signInWithRedirect(provider)
};

export const DeleteObject = async (object, objects, images, directory, close)=>{

    const deleteImages = ()=>{
      Object.values(object.imageURL?object.imageURL:object.properties.imageURL).forEach((url)=>{
        const fileName = url.split('?')[0].split((directory==="markers"?"initiatives":directory) + '%2F').reverse()[0]
        images.child(fileName).delete().then(function() {
        }).catch(function(error) {
          console.log('Errored at image deletion', error)
        });
      })
      close()
    }
    if(objects&&object.id){
      objects.doc(object.id).delete().then(function() {
        deleteImages()
      }).catch(function(error) {
          //console.error("Error removing document: ", error);
      });
    }else{deleteImages()}
    console.log('deleted')
}

export const toJSON = (date)=>{
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

export function reverseArray(arr) {
  var newArray = [];
  for (var i = arr.length - 1; i >= 0; i--) {
    newArray.push(arr[i]);
  }
  return newArray;
}

export const addVisitPrevious = ({addVisit, user, index, markers, last, initUID})=>{
  addVisit({
    "variables": {
      "visit": {
        "initUID": initUID,
        "user": user.uid
      }
    }
  })
}

export const deleteVisitPrevious = ({deleteVisit, user, index, markers, last})=>{
  if (user && !user.isAnonymous && index!==0 && /*markers.features.length>0 &&*/ index!==last.features.length ) {
    const initUID = last.features.length>0?
      (index<last.features.length?
        last.features[index].properties.uid:
        markers.features[index-last.features.length-1].properties.uid):
        markers.features[index-1].properties.uid
    console.log('delete',initUID)
    deleteVisit({
      "variables": { 
        "visit": {
          "initUID": initUID,
          "user": user.uid
        }
      }
    })
  }

  if(index===0){
    console.log('delete 0')
    deleteVisit({
      "variables": { 
        "visit": {
          "initUID": last.features[0].properties.uid,
          "user": user.uid
        }
      }
    })
  }
}

export const explore = {properties:{uid:'explore'}}
export const loadMore = {properties:{uid:'loadMore'}}

export const getFeed = ({ next, last })=>{

  if(next.features.length>0 && last.features.length>0){
    return [ ...last.features, explore,...next.features]
  }else{
    if(last.features.length>0){
      return [...last.features, explore]
    }else{
      return [ explore, ...next.features]
    }
  }
}

export const rearrangeCards = ({uid, setNext, setLast})=>{
  setNext(next=>{
    const id = next.features.map(f=>f.properties.uid).indexOf(uid)
    const behind = [...next.features].slice(0, id+1).reverse()
    const other = [...next.features].slice(id+1, next.features.length)
    setLast(last=>({type:"FeatureCollection", features:[...last.features, ...behind]}))

    // const [first, ...other] = next.features
    // setLast(last=>({type:"FeatureCollection", features:[...last.features, first]}))
    return {type:"FeatureCollection", features: other}
  })
}
