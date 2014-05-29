// depend on jsts for now https://github.com/bjornharrtell/jsts/blob/master/examples/overlay.html
var jsts = require('jsts')
var featurecollection = require('turf-featurecollection')

module.exports = function(polys1, polys2){
  var reader = new jsts.io.GeoJSONReader(),
    a = reader.read(JSON.stringify(polys1.features[0].geometry)),
    b = reader.read(JSON.stringify(polys2.features[0].geometry)),
    intersection = a.intersection(b),
    parser = new jsts.io.GeoJSONParser()

  intersection = parser.write(intersection)
  intersection = featurecollection([intersection])
  return intersection;
}
