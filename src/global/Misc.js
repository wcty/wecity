
export const getFeatures = (value) => {
  const features = value.docs.map(v=>{
    const {coordinates, g, ...properties} = v.data()
    const feature = {
      type:"Feature",
      geometry:{
        type:"Point",
        coordinates: Object.values(coordinates)
      },
      properties: {
        id: v.id,
        coordinates,
        ...properties
      }
    }
    return feature
  })
  return features
}

export const DeleteObject = async (object, objects, images, directory, close)=>{
  // console.log(object, objects, images, directory, close)
  if(object.id){
    objects.doc(object.id).delete().then(function() {
      Object.values(object.imageURL).forEach((url)=>{
        const fileName = url.split('?')[0].split((directory==="markers"?"initiatives":directory) + '%2F').reverse()[0]
        images.child(fileName).delete().then(function() {
        }).catch(function(error) {
          console.log('Errored at image deletion', error)
        });
      })
      close()
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    console.log('deleted')
  }else{console.log(object)}
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

