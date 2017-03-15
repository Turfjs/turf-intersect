var intersect = require('../'),
  test = require('tape'),
  glob = require('glob'),
  fs = require('fs');

var REGEN = true;

test('intersect -- features', function(t){
  glob.sync(__dirname + '/fixtures/in/*.json').forEach(function(input) {
      var features = JSON.parse(fs.readFileSync(input));
      var output = intersect(features[0], features[1]);
      if (REGEN) fs.writeFileSync(input.replace('/in/', '/out/'), JSON.stringify(output));
      t.deepEqual(output, JSON.parse(fs.readFileSync(input.replace('/in/', '/out/'))), input);
  });
  t.end();
});

test('intersect -- no overlap', function(t){
  var noOverlap = JSON.parse(fs.readFileSync(__dirname+'/fixtures/no-overlap.geojson'));
  var output = intersect(noOverlap[0].geometry, noOverlap[1].geometry);
  t.deepEqual(output, undefined);
  t.end();
});

test('intersect -- no overlap', function(t){
  var noOverlap = JSON.parse(fs.readFileSync(__dirname+'/fixtures/no-overlap.geojson'));
  var output = intersect(noOverlap[0].geometry, noOverlap[1].geometry);
  t.deepEqual(output, undefined);
  t.end();
});

test('intersect -- featurecollection and featurecollection', function(t){
  var fc1 = JSON.parse(fs.readFileSync(__dirname+'/fixtures/in/fc1.geojson'));
  var fcfc2 = JSON.parse(fs.readFileSync(__dirname+'/fixtures/in/fc2.geojson'));  
  var output = intersect(fc1, fcfc2);
  if (REGEN) fs.writeFileSync(__dirname+'/fixtures/out/fc-intersect.geojson', JSON.stringify(output));
  t.deepEqual(output, JSON.parse(fs.readFileSync(__dirname+'/fixtures/out/fc-intersect.geojson')));
  t.end();
});

test('intersect -- featurecollection and feature', function(t){
  var f = JSON.parse(fs.readFileSync(__dirname+'/fixtures/in/f1.geojson'));
  var fcfc2 = JSON.parse(fs.readFileSync(__dirname+'/fixtures/in/fc2.geojson'));  
  var output = intersect(fcfc2, f);
  if (REGEN) fs.writeFileSync(__dirname+'/fixtures/out/fc-f-intersect.geojson', JSON.stringify(output));
  t.deepEqual(output, JSON.parse(fs.readFileSync(__dirname+'/fixtures/out/fc-f-intersect.geojson')));
  t.end();
});

test('intersect -- feature and feature', function(t){
  var f = JSON.parse(fs.readFileSync(__dirname+'/fixtures/in/f1.geojson'));
  var f2 = JSON.parse(fs.readFileSync(__dirname+'/fixtures/in/f2.geojson'));  
  var output = intersect(f,f2);
  if (REGEN) fs.writeFileSync(__dirname+'/fixtures/out/f-f-intersect.geojson', JSON.stringify(output));
  t.deepEqual(output, JSON.parse(fs.readFileSync(__dirname+'/fixtures/out/f-f-intersect.geojson')));
  t.end();
});

test('intersect -- feature and featurecollection', function(t){
  var f = JSON.parse(fs.readFileSync(__dirname+'/fixtures/in/f1.geojson'));
  var fcfc2 = JSON.parse(fs.readFileSync(__dirname+'/fixtures/in/fc2.geojson'));  
  var output = intersect(f,fcfc2);
  if (REGEN) fs.writeFileSync(__dirname+'/fixtures/out/f-fc-intersect.geojson', JSON.stringify(output));
  t.deepEqual(output, JSON.parse(fs.readFileSync(__dirname+'/fixtures/out/f-fc-intersect.geojson')));
  t.end();
});
