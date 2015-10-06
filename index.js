// depend on jsts for now https://github.com/bjornharrtell/jsts/blob/master/examples/overlay.html
var gh = require('gh-clipping-algorithm');
var featurecollection = require('turf-featurecollection');

/**
 * Takes two {@link Polygon|polygons} and finds their intersection. If they share a border, returns the border; if they don't intersect, returns undefined.
 *
 * @module turf/intersect
 * @category transformation
 * @param {Feature<Polygon>} poly1 the first polygon
 * @param {Feature<Polygon>} poly2 the second polygon
 * @return {(Feature<Polygon>|undefined|Feature<MultiLineString>)} if `poly1` and `poly2` overlap, returns a Polygon feature representing the area they overlap; if `poly1` and `poly2` do not overlap, returns `undefined`; if `poly1` and `poly2` share a border, a MultiLineString of the locations where their borders are shared
 * @example
 * var poly1 = {
 *   "type": "Feature",
 *   "properties": {
 *     "fill": "#0f0"
 *   },
 *   "geometry": {
 *     "type": "Polygon",
 *     "coordinates": [[
 *       [-122.801742, 45.48565],
 *       [-122.801742, 45.60491],
 *       [-122.584762, 45.60491],
 *       [-122.584762, 45.48565],
 *       [-122.801742, 45.48565]
 *     ]]
 *   }
 * }
 * var poly2 = {
 *   "type": "Feature",
 *   "properties": {
 *     "fill": "#00f"
 *   },
 *   "geometry": {
 *     "type": "Polygon",
 *     "coordinates": [[
 *       [-122.520217, 45.535693],
 *       [-122.64038, 45.553967],
 *       [-122.720031, 45.526554],
 *       [-122.669906, 45.507309],
 *       [-122.723464, 45.446643],
 *       [-122.532577, 45.408574],
 *       [-122.487258, 45.477466],
 *       [-122.520217, 45.535693]
 *     ]]
 *   }
 * }
 *
 * var polygons = {
 *   "type": "FeatureCollection",
 *   "features": [poly1, poly2]
 * };
 *
 * var intersection = turf.intersect(poly1, poly2);
 *
 * //=polygons
 *
 * //=intersection
 */
module.exports = function(poly1, poly2) {
  var a = poly1.coordinates ? poly1.coordinates : poly1.geometry.coordinates;
  var b = poly2.coordinates ? poly2.coordinates : poly2.geometry.coordinates;
  var u = gh.intersect(a, b);

  var feature = {
    "type": "Feature",
    "properties": {},
    "geometry": {}
  };

  if (!u || u.length == 0) {
    return undefined;
  }

  if (gh.utils.isMultiPolygon(u)) {
    if (u.length > 1) {
      feature.geometry.type = "MultiPolygon";
      feature.geometry.coordinates = u;
    } else {
      feature.geometry.type = "Polygon";
      feature.geometry.coordinates = u[0];
    }
  } else if (gh.utils.isPolygon(u)) {
    feature.geometry.type = "Polygon";
    feature.geometry.coordinates = u;
  }

  return feature;
};
