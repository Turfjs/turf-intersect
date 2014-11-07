// depend on jsts for now https://github.com/bjornharrtell/jsts/blob/master/examples/overlay.html
var jsts = require('jsts');
var featurecollection = require('turf-featurecollection');

module.exports = function(polys1, polys2){
  if(polys1.type === 'FeatureCollection') {
  	polys1 = polys1.features[0];
  } else if(polys1.type !== 'Feature') {
  	polys1 = {
  		type: 'Feature',
  		geometry: polys1
  	};
  }
  if(polys2.type === 'FeatureCollection') {
  	polys2 = polys2.features[0];
  } else if(polys2.type !== 'Feature') {
  	polys2 = {
  		type: 'Feature',
  		geometry: polys2
  	};
  }

  var reader = new jsts.io.GeoJSONReader(),
    a = reader.read(JSON.stringify(polys1.geometry)),
    b = reader.read(JSON.stringify(polys2.geometry)),
    intersection = a.intersection(b),
    parser = new jsts.io.GeoJSONParser();

  intersection = parser.write(intersection);
  if(intersection.type === 'GeometryCollection' && intersection.geometries.length === 0) {
    intersection = [];
  } else {
    intersection = {
      type: "Feature",
      geometry: intersection,
      properties: {}
    };
  }

  return intersection;
}