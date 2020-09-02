import { useEffect } from "react"
import { useFirestore, useStorage } from "reactfire"

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
  console.log(object, objects, images, directory, close)
  if(object.id){
    objects.doc(object.id).delete().then(function() {
      Object.values(object.imageURL).forEach((url)=>{
        const fileName = url.split('?')[0].split((directory=="markers"?"initiatives":directory) + '%2F').reverse()[0]
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

