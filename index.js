// depend on jsts for now https://github.com/bjornharrtell/jsts/blob/master/examples/overlay.html
var jsts = require('jsts');
var featurecollection = require('turf-featurecollection');

module.exports = function(poly1, poly2){
  if(poly1.type !== 'Feature') {
  	poly1 = {
  		type: 'Feature',
  		geometry: poly1
  	};
  }
  if(poly2.type !== 'Feature') {
  	poly2 = {
  		type: 'Feature',
  		geometry: poly2
  	};
  }

  var reader = new jsts.io.GeoJSONReader(),
    a = reader.read(JSON.stringify(poly1.geometry)),
    b = reader.read(JSON.stringify(poly2.geometry)),
    intersection = a.intersection(b),
    parser = new jsts.io.GeoJSONParser();

  intersection = parser.write(intersection);
  if(intersection.type === 'GeometryCollection' && intersection.geometries.length === 0) {
    return;
  } else {
    return {
      type: 'Feature',
      properties: {},
      geometry: intersection
    };
  }
}