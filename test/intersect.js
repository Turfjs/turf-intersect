var intersect = require('../'),
  test = require('tape'),
  glob = require('glob'),
  fs = require('fs')

var REGEN = false;

test('intersect', function(t){
  glob.sync(__dirname + '/fixtures/in/*.json').forEach(function(input) {
      var fcs = JSON.parse(fs.readFileSync(input));
      var output = intersect(fcs[0], fcs[1]);
      if (REGEN) fs.writeFileSync(input.replace('/in/', '/out/'), JSON.stringify(output));
      t.deepEqual(output, JSON.parse(fs.readFileSync(input.replace('/in/', '/out/'))), input);
  });
  t.end();
})
