// depend on jsts for now https://github.com/bjornharrtell/jsts/blob/master/examples/overlay.html
var jsts = require('jsts');
var featurecollection = require('turf-featurecollection');

/**
 * Takes two {@link Polygon} features and finds their intersection.
 *
 * @module turf/intersect
 * @category transformation
 * @param {Polygon} poly1 the first Polygon
 * @param {Polygon} poly2 the second Polygon
 * @return {Polygon} a Polygon feature representing the area where `poly1` and `poly2` overlap
 * @example
 * var poly1 = turf.polygon([[
 *  [-122.801742, 45.48565],
 *  [-122.801742, 45.60491],
 *  [-122.584762, 45.60491],
 *  [-122.584762, 45.48565],
 *  [-122.801742, 45.48565]
 * ]]);
 * poly1.properties.fill = '#0f0';
 * var poly2 = turf.polygon([[
 *  [-122.520217, 45.535693],
 *  [-122.64038, 45.553967],
 *  [-122.720031, 45.526554],
 *  [-122.669906, 45.507309],
 *  [-122.723464, 45.446643],
 *  [-122.532577, 45.408574],
 *  [-122.487258, 45.477466],
 *  [-122.520217, 45.535693]
 * ]]);
 * poly2.properties.fill = '#00f';
 * var polygons = turf.featurecollection([poly1, poly2]);
 *
 * var intersection = turf.intersect(poly1, poly2);
 *
 * //=polygons
 *
 * //=intersection
 */
module.exports = function(poly1, poly2){
  var geom1;
  if(poly1.type === 'Feature') geom1 = poly1.geometry;
  else geom1 = poly1;
  if(poly2.type === 'Feature') geom2 = poly2.geometry;
  else geom2 = poly2;
  var reader = new jsts.io.GeoJSONReader();
  var a = reader.read(JSON.stringify(geom1));
  var b = reader.read(JSON.stringify(geom2));
  var intersection = a.intersection(b);
  var parser = new jsts.io.GeoJSONParser();

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
