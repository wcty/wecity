
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
        ...properties
      }
    }
    return feature
  })
  return features
}