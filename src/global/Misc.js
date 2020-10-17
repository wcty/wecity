import firebase from 'firebase'

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

