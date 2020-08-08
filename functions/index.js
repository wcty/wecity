const functions = require('firebase-functions');
const {logger} = require('firebase-functions');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const mongoose = require('mongoose');
const app = new Koa();
const router = new KoaRouter();
const Markers = require("./models/Markers");

app.use(router.routes()).use(router.allowedMethods());

router.get('nearest/:location', nearestMarkers);
router.get('add/:location', addMarker);

async function nearestMarkers(ctx){
  console.log("here")
  const { location } = ctx.params.split(",");
  await Connect()
  let markers = await Markers.find({coordinates: {
    $geoNear: {
          near: { type: "Point", coordinates: [Number(location[0]), Number(location[1])]},
          distanceField: "dist.calculated",
          maxDistance: 200,
          //query: { category: "Parks" },
          includeLocs: "dist.location",
          spherical: true
      }
    }
  });

  if (location&&markers){
    ctx.body = JSON.stringify(location);
  }else{
    ctx.throw(401, 'No location specified'); 
  }
}

async function addMarker(ctx){
  const coordinates = ctx.params.coordinates.split(",").map(c=>Number(c));
  const { Name, Description, Cover } = ctx.request.query
  console.log("here")
  await Connect()
//http://localhost:5001/wecity-223ab/us-central1/markers/add/50.43336,30.52096?Name=%22Test%20marker%22&Description=%22Test%20description%20of%20the%20test%20marker!%22&Cover=%22https://www.uapost.us/content/blogpreview/image/14ybb2g7/fullsize.jpg%22
  try{
    Markers.create({
      type: "Point",
      coordinates,
      properties: {Name, Description, Cover}
    })
    logger.log(log)
    console.log(log)
    ctx.body = "Worked";
  }catch(error){
    logger.log(error)
    console.log(error)
    ctx.throw(401, error); 
  }
}

async function Connect(){
  await mongoose.connect("mongodb+srv://wecity:nearestPoints@wecity.ue4i9.mongodb.net/markers?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex:true,
    useUnifiedTopology: true
  })
}

// exports.markers = functions.https.onRequest(app.callback());