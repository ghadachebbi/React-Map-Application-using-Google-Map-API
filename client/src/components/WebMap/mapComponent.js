import  CSVLayer from "esri/layers/CSVLayer";
import WebMap from "esri/WebMap";
import MapView from "esri/views/MapView";
import Search from "esri/widgets/Search";
import Sketch from "esri/widgets/Sketch";
import  GraphicsLayer from "esri/layers/GraphicsLayer";
import PropTypes from "prop-types";

const noop = () => {};

// csv file
var url = "Bathy_Ghada_Pnt.csv";

var csvLayer = new CSVLayer({
  url: url,
  copyright: "Test",
});

csvLayer.renderer = {
  type: "simple",  // autocasts as new SimpleRenderer()
  symbol: {
    type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
    size: 10,
    color: "red",
    outline: {  // autocasts as new SimpleLineSymbol()
      width: 0.5,
      color: "white"
    }
  }
};

const webmap =  new WebMap({
  basemap: "streets",
});


const view = new MapView({
  container: "viewDiv",
  map: webmap,
  zoom: 5,
  center: [10, 30],
});


const search = new Search({ view });
view.ui.add(search, "top-right");

// sketch widget 
const layer = new GraphicsLayer();
const sketch = new Sketch({
  layer: layer,
  view: view
});



export const initialize = (container, user) => {
  view.container = container;
  view
  .when(function() {
    const role = user.role;
     if(role === "admin"){
        view.ui.remove(sketch, "top-right");
        webmap.layers.add(csvLayer);
      }
      if(user.role === "user"){
        webmap.layers.remove(csvLayer);
        view.ui.add(sketch, "top-right");
      }
  })
    .then(_ => {
      console.log("Map and View are ready");
    })
    .catch(noop);
  return () => {
    view.container = null;
  };
};

