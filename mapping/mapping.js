// make OL compute scale according to WMS spec
//OpenLayers.DOTS_PER_INCH = 25.4 / 0.28;

// THis is a useful site: http://itouchmap.com/latlong.html
// also http://earthexplorer.usgs.gov/


function on_map_zoom(map) {
    console.log("[map-zoom] Current level: [" + map.zoom + "]");
}

function lonLatPoint(lon, lat) {
    return {lon: lon, lat: lat};
}

/* 
 left and right are longitute, top and bottom is lattitude
 left, bottom, right, top --> bottomLeftPoint(Lon, Lat), topRightPoint(Lon, Lat)
*/
var ESPG_4326_PROJECTION = new OpenLayers.Projection("EPSG:4326"); // This is the standard lon lat projection
var ESPG_900913_PROJECTION = new OpenLayers.Projection("EPSG:900913"); // This is google v3, or mercator projection

function lonLatBounds(bottomLeft, topRight) {
   
   return {bottomLeft: bottomLeft, 
           topRight: topRight, 
           espg900913:  new OpenLayers.Bounds(bottomLeft.lon, bottomLeft.lat, topRight.lon, topRight.lat)
                               .transform(ESPG_4326_PROJECTION, ESPG_900913_PROJECTION),

           lonLatString: "bottomLeft: (" + bottomLeft.lon + ", " + bottomLeft.lat + ") " 
                       + "topRight: (" + topRight.lon + ", " +  topRight.lat + ")"
                       + " [" + ESPG_4326_PROJECTION + "]"
          };
}

function createMapContainer(divId) {
    var map_options = {
        controls: [],
        projection: ESPG_900913_PROJECTION // need this or the overlays don't work
    }

    var map = new OpenLayers.Map(divId, map_options);
  
    map.addControl(new OpenLayers.Control.LayerSwitcher());
    map.addControl(new OpenLayers.Control.PanZoomBar({
          position: new OpenLayers.Pixel(10, 15)
    }));

    map.events.on({"zoomend": function () {on_map_zoom(map)}});

    return map;
}

function createGoogleBaseLayer() {
    var google_road_map_options = {
        type: google.maps.MapTypeId.ROADMAP,
        numZoomLevels: 10          
    }
    return new OpenLayers.Layer.Google("Google road map", google_road_map_options);
}

function createPollLayer(o) {
    var params = {
        layers: o.layerWmsName,
        styles: '',
        transparent: "true",
        format: 'image/png',
        viewparams: "poll:" + o.pollId + ";app:" + o.appId        
    }

    var options = {
        opacity: 1.0,
        singleTile: false,
        isBaseLayer: false
    }

    console.log("Creating a poll data layer with options [" + o + "]");
    return new OpenLayers.Layer.WMS(o.layerDisplayName, o.wmsUrl, params, options);
}


// Note that the zoom level is automatically calculated by the size of the div and that of the bounding box
// So if you need it zoomed in more, you may need to make the div bigger
function load_map(divId, initialBounds, dataLayer) {
    console.log("Loading a map into div [" + divId + "] with data layer ["+ dataLayer.name +"], url ["+ dataLayer.url +"], keys [" + Object.keys(dataLayer) + "]");

    var map = createMapContainer(divId);

    map.addLayers([createGoogleBaseLayer(), dataLayer]);
  
    map.zoomToExtent(initialBounds.espg900913);

    console.log("Set the extent to [" + initialBounds.lonLatString +"]");
    
} 


