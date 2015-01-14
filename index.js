// depend on jsts for now https://github.com/bjornharrtell/jsts/blob/master/examples/overlay.html
var jsts = require('jsts');
var featurecollection = require('turf-featurecollection');

/**
 * Takes two {@link Polygon} features and finds their intersection.
 *
 * @module turf/intersect
 * @param {Polygon} a
 * @param {Polygon} b
 * @return {Polygon}
 * @example
 * var a = turf.polygon([[[10,0],[20,10],[20,0],[10,0]]]);
 * a.properties.fill = '#0f0';
 * var b = turf.polygon([[[10+5,0+5],[20+5,10+5],[20+5,0+5],[10+5,0+5]]]);
 * b.properties.fill = '#00f';
 * var erased = turf.erase(JSON.parse(JSON.stringify(a)), b);
 * var a = turf.polygon([[[10,0],[20,10],[20,0],[10,0]]]);
 * a.properties.fill = '#0f0';
 * var b = turf.polygon([[[10+5,0+5],[20+5,10+5],[20+5,0+5],[10+5,0+5]]]);
 * b.properties.fill = '#00f';
 * var intersection = turf.intersect(a, b);
 * //=a
 * //=b
 * //=intersection
 */
module.exports = function(poly1, poly2){
  var reader = new jsts.io.GeoJSONReader(),
    a = reader.read(JSON.stringify(poly1)),
    b = reader.read(JSON.stringify(poly2)),
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
};
